"""Builds and tears down Appium driver sessions from an `AppiumConfig`.

Kept separate from `conftest.py` so the session-creation/remote-install logic
is plain, testable Python rather than being embedded in a pytest fixture.
"""
import base64
import logging
import os
import time

from appium import webdriver
from appium.options.android import UiAutomator2Options

logger = logging.getLogger(__name__)

REMOTE_INSTALL_PATH = "/data/local/tmp/appium_upload.apk"
SESSION_CREATION_ATTEMPTS = 3
SESSION_RETRY_DELAY_SECONDS = 10


def _options_for_platform(config):
    """Returns the Appium client options container for the target platform.

    The `automationName` capability selects the driver on the server, but the
    client-side options class is platform-specific and must match. Add new
    platforms here (e.g. `XCUITestOptions` for iOS) when they are supported.
    """
    platform = (config.platform_name or "android").strip().lower()
    if platform == "android":
        return UiAutomator2Options()
    raise NotImplementedError(
        f"MOBILE_PLATFORM '{config.platform_name}' is not supported yet — only Android for now."
    )


def build_capabilities(config):
    """Translates an `AppiumConfig` into client options for the session."""
    options = _options_for_platform(config)
    options.platform_name = config.platform_name
    options.device_name = config.device_name
    options.automation_name = config.automation_name

    # Local server: it can read the file directly, so let it install/launch the app itself.
    # Remote server: the file only exists on this machine, so app_package/app_activity are
    # deferred until after the session starts and the app has been uploaded (see
    # `install_remote_app`) - setting them now would fail to resolve a launchable activity
    # for an app that isn't installed yet.
    if config.has_local_apk and config.is_local_server:
        options.app = config.app_path
    if not config.needs_remote_install:
        options.app_package = config.app_package
        if config.app_activity:
            options.app_activity = config.app_activity

    options.auto_grant_permissions = True
    options.app_wait_activity = "*"

    options.no_reset = not config.reset_app
    options.force_app_launch = True
    options.should_terminate_app = True
    options.set_capability("enableNotificationListener", False)

    if config.unlock_type and config.unlock_key:
        options.unlock_type = config.unlock_type
        options.unlock_key = config.unlock_key
        options.unlock_strategy = "uiautomator"

    return options


def create_driver(config):
    """Starts an Appium session, retrying a handful of times on failure."""
    options = build_capabilities(config)
    last_error = None
    for attempt in range(1, SESSION_CREATION_ATTEMPTS + 1):
        try:
            return webdriver.Remote(config.server_url, options=options)
        except Exception as error:
            last_error = error
            logger.warning(
                "Session attempt %d/%d failed: %s", attempt, SESSION_CREATION_ATTEMPTS, error
            )
            time.sleep(SESSION_RETRY_DELAY_SECONDS)
    raise last_error


def install_remote_app(driver, config):
    """Ensures the app is present on a remote-server device, then launches it.

    The `app` capability can't be used here (the APK is local, the server is
    remote), so:
    1. If the app is ALREADY INSTALLED on the device (the common case — the
       test-generation pipeline installs it via direct ADB), skip the
       upload/install entirely and just launch it. `is_app_installed` is a
       standard Appium call and needs no security-gated features.
    2. Only when the app is genuinely absent, upload the APK and install via
       `mobile: shell` — which requires the Appium server to be started with
       `--relaxed-security` or `--allow-insecure=adb_shell`.
    """
    if config.app_package:
        try:
            already_installed = driver.is_app_installed(config.app_package)
        except Exception as error:
            logger.warning("Could not check installed state of %s: %s", config.app_package, error)
            already_installed = False
        if already_installed:
            logger.info(
                "App %s is already installed on the device — skipping upload/install.",
                config.app_package,
            )
            if config.reset_app:
                # Honor MOBILE_RESET_APP on this path too (mobile: clearApp is
                # a standard, non-gated uiautomator2 command).
                try:
                    driver.execute_script("mobile: clearApp", {"appId": config.app_package})
                    logger.info("Cleared app data for %s (MOBILE_RESET_APP=true)", config.app_package)
                except Exception as error:
                    logger.warning("Could not clear app data for %s: %s", config.app_package, error)
            driver.activate_app(config.app_package)
            return

    logger.info("Uploading %s to remote device at %s...", config.app_path, REMOTE_INSTALL_PATH)
    driver.push_file(REMOTE_INSTALL_PATH, source_path=config.app_path)

    logger.info("Installing %s on remote device via adb shell...", REMOTE_INSTALL_PATH)
    try:
        driver.execute_script(
            "mobile: shell", {"command": "pm", "args": ["install", "-r", "-g", REMOTE_INSTALL_PATH]}
        )
    except Exception as error:
        raise RuntimeError(
            "Failed to install the app via 'mobile: shell'. The Appium server must be started "
            "with --relaxed-security or --allow-insecure=adb_shell to permit this. "
            f"Original error: {error}"
        ) from error

    driver.activate_app(config.app_package)


def teardown_driver(driver, config, recording_path):
    """Saves the screen recording, terminates the app, and quits the session."""
    try:
        video_data = driver.stop_recording_screen()
        recording_dir = os.path.dirname(recording_path)
        if recording_dir:
            os.makedirs(recording_dir, exist_ok=True)
        with open(recording_path, "wb") as f:
            f.write(base64.b64decode(video_data))
        logger.info("Screen recording saved: %s", recording_path)
    except Exception as error:
        logger.warning("Failed to save screen recording: %s", error)

    try:
        if config.app_package:
            driver.terminate_app(config.app_package)
        driver.press_keycode(3)  # Android HOME key
    except Exception:
        pass

    driver.quit()
