"""Builds and tears down Appium driver sessions from an `AppiumConfig`.

Kept separate from `conftest.py` so the session-creation/remote-install logic
is plain, testable Python rather than being embedded in a pytest fixture.
"""
import base64
import logging
import os
import re
import shutil
import subprocess
import time

from appium import webdriver
from appium.options.android import UiAutomator2Options

logger = logging.getLogger(__name__)

REMOTE_INSTALL_PATH = "/data/local/tmp/appium_upload.apk"
SESSION_CREATION_ATTEMPTS = 3
SESSION_RETRY_DELAY_SECONDS = 10

# A network device serial is `host:port` (USB/emulator serials never are).
_TCP_SERIAL_RE = re.compile(r"^[\w.\-]+:\d+$")
ADB_INSTALL_TIMEOUT_SECONDS = 120


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
    # `ensure_app_installed`) - setting them now would fail to resolve a launchable activity
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


def ensure_app_installed(driver, config):
    """Makes sure the app under test is on the device, then launches it.

    Runs once, right after the session starts — so `is_app_installed` (a
    standard, non-security-gated Appium call) is available. This is the single
    place app installation happens; there is no separate pre-session ADB step.

    The path taken depends on how the app got onto the device:

    1. Local server — Appium already installed/reset/launched the app from the
       `app` capability during session creation (see `build_capabilities`), so
       there is nothing to do here.
    2. Remote server, app ALREADY on the device (a device-farm image or a prior
       run) — skip install entirely and just launch it. This is the common case
       and needs no security-gated features.
    3. Remote server, app genuinely ABSENT — install the local APK with host-side
       `adb install` (the same path the generator's agent exploration uses; needs
       no security-gated Appium features), falling back to an upload + `mobile:
       shell` install only when local adb can't reach the device. See `_install_apk`.
    """
    # Local server installs and launches the app itself via the `app` capability;
    # nothing to install or verify post-session.
    if config.is_local_server:
        return

    package = config.app_package

    # Never re-install an app that is already present — just launch it.
    if package and _is_app_installed(driver, package):
        logger.info("App %s already exists on device — skipping install.", package)
        _reset_app_if_requested(driver, config, package)
        driver.activate_app(package)
        return

    # App is not on the (remote) device. We can only install it if we have the
    # APK locally to upload.
    if not config.has_local_apk:
        logger.warning(
            "App %s is not installed and no local APK is available to install it "
            "(set MOBILE_APP_PATH to the APK).",
            package or "(unknown package)",
        )
        return

    _install_apk(driver, config)
    if package:
        driver.activate_app(package)


def _is_app_installed(driver, package):
    """Best-effort install check; treats a failed probe as 'not installed'."""
    try:
        return driver.is_app_installed(package)
    except Exception as error:
        logger.warning("Could not check installed state of %s: %s", package, error)
        return False


def _reset_app_if_requested(driver, config, package):
    """Clear app data when MOBILE_RESET_APP is set.

    On the skip-install path Appium did not reset the app for us (that only
    happens when it installs from the `app` capability), so honor the flag here.
    `mobile: clearApp` is a standard, non-gated uiautomator2 command.
    """
    if not config.reset_app:
        return
    try:
        driver.execute_script("mobile: clearApp", {"appId": package})
        logger.info("Cleared app data for %s (MOBILE_RESET_APP=true)", package)
    except Exception as error:
        logger.warning("Could not clear app data for %s: %s", package, error)


def _install_apk(driver, config):
    """Install the app under test onto the (remote) device.

    Primary path is host-side `adb install` — exactly what the generator's agent
    exploration does, and the one install route that needs no security-gated
    Appium features. Falls back to uploading the APK and installing it via
    `mobile: shell` only when local adb can't reach the device (that fallback
    still requires the Appium server's `--relaxed-security` / `adb_shell`).
    """
    if _install_apk_via_local_adb(config):
        return
    logger.info(
        "Local adb install unavailable — falling back to server-side install via 'mobile: shell'."
    )
    _install_apk_via_mobile_shell(driver, config)


def _resolve_adb():
    """Locate an adb binary: system adb on PATH, else adbutils' bundled binary.

    Returns the adb path, or None when neither is available (the caller then
    falls back to the server-side install).
    """
    adb = shutil.which("adb")
    if adb:
        return adb
    try:
        from adbutils._utils import adb_path

        return adb_path()
    except Exception as error:
        logger.warning("No system adb on PATH and adbutils fallback unavailable: %s", error)
        return None


def _adb_base(config):
    """adb command prefix (`adb -s <serial>`) targeting the configured device.

    A TCP device (`host:port`) is invisible to the local adb server until
    something runs `adb connect host:port`, so register it first. USB/emulator
    serials self-register and need no connect. Returns None if adb isn't found.
    """
    adb = _resolve_adb()
    if not adb:
        return None
    serial = config.device_name or ""
    if serial and _TCP_SERIAL_RE.match(serial):
        _ensure_tcp_device_connected(adb, serial)
    return [adb, "-s", serial] if serial else [adb]


def _ensure_tcp_device_connected(adb, serial, timeout=20):
    """Run `adb connect host:port` unless the TCP device is already registered.

    Never raises — a genuine reachability problem surfaces as a clearer error
    from the install command itself.
    """
    try:
        listed = subprocess.run(
            [adb, "devices"], capture_output=True, text=True, timeout=10, check=False
        )
        for line in listed.stdout.strip().splitlines()[1:]:
            parts = line.split()
            if len(parts) >= 2 and parts[0] == serial and parts[1] == "device":
                return
    except Exception as error:
        logger.debug("adb devices check failed: %s", error)

    logger.info("Registering TCP ADB device with local adb server: adb connect %s", serial)
    try:
        result = subprocess.run(
            [adb, "connect", serial], capture_output=True, text=True, timeout=timeout, check=False
        )
        output = (result.stdout or "").strip() or (result.stderr or "").strip()
        if "connected" not in output.lower():  # "connected to X" / "already connected to X"
            logger.warning("adb connect %s did not confirm connection: %s", serial, output)
    except Exception as error:
        logger.warning("adb connect %s failed: %s", serial, error)


def _is_app_installed_via_adb(adb_base, package):
    """Quick host-side check that *package* is already on the device.

    `pm list packages <pkg>` matches by substring, so confirm an exact
    `package:<pkg>` line before treating it as installed.
    """
    if not package:
        return False
    try:
        result = subprocess.run(
            adb_base + ["shell", "pm", "list", "packages", package],
            capture_output=True, text=True, timeout=15, check=False,
        )
    except Exception as error:
        logger.debug("adb pm list packages failed: %s", error)
        return False
    return any(line.strip() == f"package:{package}" for line in result.stdout.splitlines())


def _install_apk_via_local_adb(config):
    """Install the APK with host-side `adb install -r -g`, mirroring exploration.

    Returns True when the app is ready (already installed, or installed now) and
    False when adb is unavailable or the install failed — so `_install_apk` can
    fall back to the server-side `mobile: shell` install.
    """
    adb_base = _adb_base(config)
    if not adb_base:
        return False

    package = config.app_package
    if _is_app_installed_via_adb(adb_base, package):
        logger.info("App %s already on device (adb check) — skipping install.", package)
        return True

    logger.info("Installing %s via local adb...", config.app_path)
    try:
        result = subprocess.run(
            adb_base + ["install", "-r", "-g", config.app_path],
            capture_output=True, text=True, timeout=ADB_INSTALL_TIMEOUT_SECONDS, check=False,
        )
    except Exception as error:
        logger.warning("Local adb install errored: %s", error)
        return False

    if result.returncode == 0:
        logger.info("App install successful (local adb): %s", result.stdout.strip())
        return True
    logger.warning(
        "Local adb install failed (rc=%s): %s",
        result.returncode, result.stderr.strip() or result.stdout.strip(),
    )
    return False


def _install_apk_via_mobile_shell(driver, config):
    """Upload the local APK to the remote device and install it via `mobile: shell`.

    Fallback for when the host running the tests has no adb reach to the device.
    Requires the Appium server to allow the `adb_shell` insecure feature.
    """
    logger.info("Uploading %s to remote device at %s...", config.app_path, REMOTE_INSTALL_PATH)
    driver.push_file(REMOTE_INSTALL_PATH, source_path=config.app_path)

    logger.info("Installing %s on remote device via adb shell...", REMOTE_INSTALL_PATH)
    try:
        driver.execute_script(
            "mobile: shell", {"command": "pm", "args": ["install", "-r", "-g", REMOTE_INSTALL_PATH]}
        )
    except Exception as error:
        raise RuntimeError(
            "Failed to install the app. Local adb could not reach the device and the "
            "server-side 'mobile: shell' fallback is disabled: the Appium server must be "
            "started with --relaxed-security or --allow-insecure=adb_shell to permit it. "
            "Alternatively, make the device reachable via `adb connect` on this host, or "
            f"pre-install the app. Original error: {error}"
        ) from error


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
