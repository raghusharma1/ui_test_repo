import logging
import pytest
from utils.config import Credentials
from utils.test_data import load_data

logger = logging.getLogger(__name__)


@pytest.mark.credit_limit_increase
def test_partial_credit_limit_increase_flow(screens):
    logger.info("Step 1: Load test data and credentials.")
    data = load_data("credit_limit_increase_data.json")
    credentials = Credentials.from_env().require("username", "password", "otp")

    logger.info("Step 2: Dismiss version check if visible.")
    screens.version_check.tap_next_time_button()

    logger.info("Step 3: Enter username.")
    screens.login.enter_username(credentials.username)
    assert screens.login.is_loaded(), "Login screen not loaded after entering username."

    logger.info("Step 4: Enter password.")
    screens.login.enter_password(credentials.password)
    assert screens.login.is_loaded(), "Login screen not loaded after entering password."

    logger.info("Step 5: Tap login button.")
    screens.login.tap_login_button()
    assert screens.otp.is_loaded(), "Failed to navigate to OTP screen."

    logger.info("Step 6: Enter OTP.")
    screens.otp.enter_otp(credentials.otp)
    assert screens.otp.is_loaded(), "OTP screen not loaded after entering OTP."

    logger.info("Step 7: Tap verify OTP button.")
    screens.otp.tap_verify_button()
    # Verification for OTP submit is handled by checking for subsequent popups or dashboard

    logger.info("Step 8: Dismiss legal popup if visible.")
    screens.legal_popup.tap_accept_button_if_visible()

    logger.info("Step 9: Dismiss reminder popup if visible.")
    screens.reminder_popup.tap_later_button_if_visible()

    logger.info("Step 10: Verify dashboard is loaded.")
    assert screens.dashboard.is_loaded(), "Dashboard screen not loaded after dismissing popups."
    dashboard_greeting = screens.dashboard.get_text(screens.dashboard._GREETING_TEXT)
    assert data["expected_dashboard_greeting_fragment"] in dashboard_greeting, \
        f"Unexpected dashboard greeting: '{dashboard_greeting}'"

    logger.info("Step 11: Tap menu button.")
    screens.dashboard.tap_menu_button()
    assert screens.menu.is_loaded(), "Menu screen not loaded."

    logger.info("Step 12: Tap 'Increase Demo Limit' from menu.")
    screens.menu.tap_increase_limit_button()
    assert screens.agreement.is_loaded(), "Failed to navigate to Agreement screen."

    logger.info("Step 13: Tap agreement checkbox.")
    screens.agreement.tap_agreement_checkbox()
    # No explicit verification for checkbox state, assuming tap works

    logger.info("Step 14: Tap continue on agreement screen.")
    screens.agreement.tap_continue_button()
    assert screens.review.is_loaded(), "Failed to navigate to Review screen."

    logger.info("Step 15: Tap submit on review screen.")
    screens.review.tap_submit_button()
    # Trajectory ends here, no further screen verification is provided.
    # In a real scenario, we would verify a success/result screen.
