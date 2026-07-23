import logging
import pytest
from utils.config import Credentials
from utils.test_data import load_data

logger = logging.getLogger(__name__)


@pytest.mark.credit_limit_increase
def test_credit_card_limit_1_success(screens):
    logger.info("Step 1: Launch the application (handled by fixture).")

    data = load_data("credit_limit_increase_data.json")
    credentials = Credentials.from_env().require("username", "password", "otp")

    logger.info("Step 2: Tap 'NEXT TIME' on the version check screen.")
    assert screens.version_check.is_loaded(), "Version Check screen not loaded."
    screens.version_check.tap_next_time_button()

    logger.info("Step 3: Clear username input field.")
    assert screens.login.is_loaded(), "Login screen not loaded."
    screens.login.clear_username()

    logger.info(f"Step 4: Type username '{credentials.username}'.")
    screens.login.enter_username(credentials.username)

    logger.info("Step 5: Type password.")
    screens.login.enter_password(credentials.password)

    logger.info("Step 6: Tap 'LOG IN' button.")
    screens.login.tap_login_button()

    logger.info("Step 7-12: Input OTP code.")
    assert screens.otp.is_loaded(), "OTP screen not loaded."
    screens.otp.enter_otp(credentials.otp)

    logger.info("Step 13: Tap 'VERIFY' button.")
    screens.otp.tap_verify_button()

    logger.info("Step 14: Tap 'ACCEPT' on the Legal Terms popup.")
    assert screens.legal_popup.is_loaded(), "Legal popup not loaded."
    screens.legal_popup.tap_accept_button()

    logger.info("Step 15: Tap 'LATER' on the Reminder popup.")
    assert screens.reminder_popup.is_loaded(), "Reminder popup not loaded."
    screens.reminder_popup.tap_later_button()

    logger.info("Step 16: Tap 'NOT NOW' on the Enable Notifications popup.")
    assert screens.notifications_popup.is_loaded(), "Notifications popup not loaded."
    screens.notifications_popup.tap_not_now_button()

    logger.info("Step 16 Verification: Dashboard Home is displayed. Verify greeting and recent list.")
    assert screens.dashboard.is_loaded(), "Dashboard Home not loaded."
    greeting_text = screens.dashboard.get_greeting_text()
    assert data["expected_dashboard_greeting"] in greeting_text, \
        f"Unexpected greeting text: '{greeting_text}'"
    assert screens.dashboard.count_recent_list_items() == data["expected_dashboard_recent_list_rows"], \
        "Unexpected number of items in recent list."

    logger.info("Step 17: Tap the hamburger menu icon on the dashboard.")
    screens.dashboard.tap_menu_button()

    logger.info("Step 18: Tap the 'Increase Limit' option in the menu.")
    assert screens.menu.is_loaded(), "Menu screen not loaded."
    screens.menu.tap_increase_limit_button()

    logger.info("Step 19: Tap the first card item in the selector list.")
    assert screens.card_selector.is_loaded(), "Card Selector screen not loaded."
    assert screens.card_selector.count_card_items() == data["expected_card_selector_rows"], \
        "Unexpected number of card items."
    screens.card_selector.tap_first_card_item()

    logger.info("Step 19 Verification: Limit Value Entry screen is displayed. Verify card details.")
    assert screens.limit_entry.is_loaded(), "Limit Entry screen not loaded."
    selected_card_text = screens.limit_entry.get_selected_card_text()
    assert data["expected_limit_entry_selected_card_fragment"] in selected_card_text, \
        f"Unexpected selected card text: '{selected_card_text}'"
    current_limit_text = screens.limit_entry.get_current_limit_text()
    assert data["expected_limit_entry_current_limit_fragment"] in current_limit_text, \
        f"Unexpected current limit text: '{current_limit_text}'"
    available_limit_text = screens.limit_entry.get_available_limit_text()
    assert data["expected_limit_entry_available_limit_fragment"] in available_limit_text, \
        f"Unexpected available limit text: '{available_limit_text}'"

    logger.info(f"Step 20: Type '{data['requested_limit']}' into the requested limit input field.")
    screens.limit_entry.enter_requested_limit(data["requested_limit"])

    logger.info("Step 21: Tap 'CONTINUE' to proceed from the limit entry screen.")
    screens.limit_entry.tap_continue_button()

    logger.info("Step 22: Tap the 'I accept the demo agreement' checkbox.")
    assert screens.agreement.is_loaded(), "Agreement screen not loaded."
    screens.agreement.tap_agreement_checkbox()

    logger.info("Step 23: Tap 'CONTINUE' to proceed from the agreement screen.")
    screens.agreement.tap_continue_button()

    logger.info("Step 23 Verification: Review screen is displayed. Verify review details.")
    assert screens.review.is_loaded(), "Review screen not loaded."
    review_selected_card = screens.review.get_selected_card_value()
    assert data["expected_review_selected_card_fragment"] in review_selected_card, \
        f"Unexpected review selected card: '{review_selected_card}'"
    review_requested_limit = screens.review.get_requested_limit_value()
    assert review_requested_limit == data["expected_review_requested_limit"], \
        f"Unexpected review requested limit: '{review_requested_limit}'"
    review_agreement_status = screens.review.get_agreement_status()
    assert review_agreement_status == data["expected_review_agreement_status"], \
        f"Unexpected review agreement status: '{review_agreement_status}'"

    logger.info("Step 24: Tap 'SUBMIT' on the review screen.")
    screens.review.tap_submit_button()

    logger.info("Step 25: Tap 'SUBMIT' on the confirmation dialog.")
    assert screens.review_confirm_dialog.is_loaded(), "Review Confirm Dialog not loaded."
    screens.review_confirm_dialog.tap_confirm_submit_button()

    logger.info("Step 25 Verification: Result screen is displayed. Verify success details.")
    assert screens.result.is_loaded(), "Result screen not loaded."
    result_title = screens.result.get_result_title()
    assert data["expected_result_title_fragment"] in result_title, \
        f"Unexpected result title: '{result_title}'"
    result_message = screens.result.get_result_message()
    assert data["expected_result_message_fragment"] in result_message, \
        f"Unexpected result message: '{result_message}'"
    assert not screens.result.is_retry_button_visible(), "Retry button should not be visible on success."
    icon_content_desc = screens.result.get_icon_content_description()
    assert icon_content_desc == data["expected_result_icon_content_desc"], \
        f"Unexpected result icon content description: '{icon_content_desc}'"

    logger.info("Step 26: Tap 'BACK TO HOME' to return to the dashboard.")
    screens.result.tap_back_to_home_button()

    logger.info("Step 26 Verification: Dashboard Home is shown again.")
    assert screens.dashboard.is_loaded(), "Dashboard Home not loaded after returning from result screen."
    logger.info("Credit limit increase flow completed successfully.")
