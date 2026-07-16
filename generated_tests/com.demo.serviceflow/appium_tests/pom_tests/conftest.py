"""Pytest wiring for the generated Appium test suite.

Static scaffold file — fixture plumbing only. App-specific behavior belongs
in page objects; session/capability logic in `utils/`.
"""
import logging
import os
from datetime import datetime

import pytest

from utils.config import AppiumConfig
from utils.device_setup import ensure_app_installed
from utils.driver_factory import create_driver, install_remote_app, teardown_driver
from pages import AppScreens

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

logger = logging.getLogger(__name__)

RECORDING_PATH = "recordings/test_recording.mp4"
# Diagnostic artifacts (failure screenshots, HTML report) all land in reports/
REPORTS_DIR = "reports"


@pytest.fixture(scope="session")
def driver():
    config = AppiumConfig.from_env()
    # Make sure the app is on the device before the session starts. On a freshly
    # booted emulator (or a fresh AWS/TCP device) the package may be absent; this
    # installs MOBILE_APP_PATH via direct ADB when missing, mirroring what the
    # generation pipeline does. Best-effort — the session still starts if it fails.
    ensure_app_installed(config)
    d = create_driver(config)

    if config.needs_remote_install:
        install_remote_app(d, config)

    d.start_recording_screen()
    yield d
    teardown_driver(d, config, RECORDING_PATH)


@pytest.fixture
def screens(driver):
    """Convenience aggregator exposing every page object for the current session."""
    return AppScreens(driver)


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Captures failure evidence from the LIVE Appium session when a test fails.

    This hook runs before teardown, so the screenshot and UI hierarchy show the
    actual failure moment — any capture attempted after the run would only see
    the post-teardown state (app terminated, launcher visible).
    """
    outcome = yield
    report = outcome.get_result()
    if report.when != "call" or not report.failed:
        return

    driver = item.funcargs.get("driver")
    if driver is None:
        return

    os.makedirs(REPORTS_DIR, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    try:
        path = os.path.join(REPORTS_DIR, f"{item.name}_{timestamp}.png")
        driver.save_screenshot(path)
        logger.info("Failure screenshot saved: %s", path)
    except Exception as error:
        logger.warning("Failed to capture failure screenshot: %s", error)

    try:
        path = os.path.join(REPORTS_DIR, f"{item.name}_{timestamp}_hierarchy.xml")
        with open(path, "w", encoding="utf-8") as f:
            f.write(driver.page_source)
        logger.info("Failure UI hierarchy saved: %s", path)
    except Exception as error:
        logger.warning("Failed to capture failure UI hierarchy: %s", error)
