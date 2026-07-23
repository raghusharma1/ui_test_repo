import logging
import pytest

from utils.config import Credentials
from utils.test_data import load_data

logger = logging.getLogger(__name__)


@pytest.fixture(scope="module")
def card_details_data():
    return load_data("card_details_data.json")


def test_card_carousel_transaction_details(screens, card_details_data):
    credentials = Credentials.from_env().require("username", "password", "otp")

    logger.info("Step 1: Launch the application and wait for the splash screen (if visible).")
    # The splash screen might be very brief or skipped, so we don't assert its loading.
    # assert screens.splash_screen.is_loaded(), "Splash screen not loaded."

    logger.info("Step 2: Handle the version check popup.")
    assert screens.version_check.is_loaded(), "Version check screen not loaded."
    if not screens.version_check.tap_next_time_button_if_visible():
        screens.version_check.tap_update_now_button_if_visible()
    assert screens.login.is_loaded(), "Login screen not loaded after dismissing version check."

    logger.info(f"Step 3: Type '{card_details_data['username']}' into the username input field.")
    screens.login.enter_username(card_details_data["username"])

    logger.info(f"Step 4: Type password into the password input field.")
    screens.login.enter_password(credentials.password)

    logger.info("Step 5: Tap the 'LOG IN' button.")
    screens.login.tap_login_button()
    assert screens.otp.is_loaded(), "OTP screen not loaded after login."

    logger.info("Step 6-11: Enter the OTP digits.")
    otp_code = credentials.otp
    screens.otp.enter_otp(otp_code)

    logger.info("Step 12: Tap the 'VERIFY' button to submit the OTP.")
    screens.otp.tap_verify_button()
    # OTP verification might lead directly to dashboard or popups

    logger.info("Step 13: Tap 'ACCEPT' on the legal terms popup (if visible).")
    screens.legal_popup.tap_legal_accept_button_if_visible()

    logger.info("Step 14: Tap 'LATER' on the reminder popup (if visible).")
    screens.reminder_popup.tap_reminder_later_button_if_visible()

    logger.info("Step 15: Tap 'NOT NOW' on the enable notifications popup (if visible).")
    screens.notifications_popup.tap_notifications_not_now_button_if_visible()

    logger.info(f"Step 16: Verify the dashboard greeting text is '{card_details_data['expected_dashboard_greeting']}'.")
    assert screens.dashboard.is_loaded(), "Dashboard not loaded after dismissing popups."
    assert screens.dashboard.verify_dashboard_greeting(card_details_data["expected_dashboard_greeting"]), \
        f"Dashboard greeting text mismatch. Expected to contain '{card_details_data['expected_dashboard_greeting']}'."

    logger.info("Step 17: Tap the 'Cards' tab.")
    screens.dashboard.tap_cards_tab()
    assert screens.card_details.is_loaded(), "Card Details screen not loaded after tapping Cards tab."

    logger.info("Step 18: Verify the card carousel is visible.")
    assert screens.card_details.verify_card_carousel_visible(), "Card carousel not visible."

    logger.info(f"Step 19: Verify utilization values for the first card: '{card_details_data['first_card_used_text']}' used and '{card_details_data['first_card_available_text']}' available.")
    assert screens.card_details.verify_first_card_utilization(
        card_details_data["first_card_used_text"],
        card_details_data["first_card_available_text"]
    ), "First card utilization values mismatch."

    logger.info("Step 20: Horizontally swipe the card carousel left to reveal the second card.")
    screens.card_details.swipe_card_carousel_left()

    logger.info(f"Step 21: Verify utilization values for the second card: '{card_details_data['second_card_used_text']}' used and '{card_details_data['second_card_available_text']}' available.")
    assert screens.card_details.verify_second_card_utilization(
        card_details_data["second_card_used_text"],
        card_details_data["second_card_available_text"]
    ), "Second card utilization values mismatch."

    logger.info(f"Step 22: Tap the first transaction row, titled '{card_details_data['first_transaction_name']}'.")
    screens.card_details.tap_first_transaction(card_details_data["first_transaction_name"])
    assert screens.transaction_detail_bottom_sheet.is_loaded(), "Transaction detail bottom sheet not visible."

    logger.info("Step 23: Verify the transaction detail bottom sheet is visible with expected details.")
    assert screens.transaction_detail_bottom_sheet.verify_transaction_detail_bottom_sheet(
        card_details_data["first_transaction_merchant"],
        card_details_data["first_transaction_amount"],
        card_details_data["first_transaction_date"],
        card_details_data["first_transaction_reference"]
    ), "Transaction detail bottom sheet content mismatch."

    logger.info("Step 24: Tap the close button on the transaction detail bottom sheet.")
    screens.transaction_detail_bottom_sheet.close_transaction_detail_bottom_sheet()
    # Verify the bottom sheet is no longer visible (implicitly by checking card details is loaded again)
    assert screens.card_details.is_loaded(), "Card Details screen not visible after closing transaction sheet."

    logger.info("Step 25: Tap the expand chevron on the second transaction row to open its details.")
    # This assumes tapping the expand button will open the details for the *second* transaction.
    # The scenario implies this is the next logical transaction to interact with after the first.
    screens.card_details.tap_second_transaction_expand_button()
    assert screens.transaction_detail_bottom_sheet.is_loaded(), "Second transaction detail bottom sheet not visible."

    logger.info("Step 26: Close the second transaction's bottom sheet.")
    screens.transaction_detail_bottom_sheet.close_transaction_detail_bottom_sheet()
    assert screens.card_details.is_loaded(), "Card Details screen not visible after closing second transaction sheet."
