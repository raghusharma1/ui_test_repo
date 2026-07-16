# language: en
@e2e @critical @credit_limit_increase @happy_path @android
Feature: Partial Credit Limit Increase Flow (Happy Path)
  As a demo user, I want to log in and submit a request to increase my credit limit
  so that I can see the process.

  This feature tests the user's ability to successfully log in, dismiss initial popups,
  navigate to the 'Increase Demo Limit' feature, accept the demo agreement,
  and submit the request. The scenario covers the core path up to the submission point.
  Note: The provided trajectory data does not include the card selection,
  limit value entry, or the final confirmation/result screens.

  Scenario: Successfully initiate a partial credit limit increase request
    # Step 1: Launch Application
    Given I am on the application homepage 'com.demo.serviceflow'
    Then the app should be in the 'com.demo.serviceflow/.MainActivity' activity
    And the splash screen with element 'splash_title_text' should be visible

    # Step 2: Bypass Version Check
    When I tap the 'NEXT TIME' button with ID 'version_check_next_time_button'
    Then I should be on the 'Login' screen with activity 'com.demo.serviceflow/.LoginActivity'

    # Step 3: Enter Username
    When I fill in the 'Username' input field with ID 'login_username_input' with 'demo.user'
    Then the 'Username' input field with ID 'login_username_input' should contain 'demo.user'

    # Step 4: Enter Password
    And I fill in the 'Password' input field with ID 'login_password_input' with 'Demo1234'
    Then the 'Password' input field with ID 'login_password_input' should contain 'Demo1234'

    # Step 5: Submit Login Credentials
    And I tap the 'LOG IN' button with ID 'login_submit_button'
    Then I should be on the 'OTP Verification' screen with activity 'com.demo.serviceflow/.OtpActivity'

    # Step 6: Enter OTP Digit 1
    When I input the 'first' digit of the OTP from environment variable 'MOBILE_OTP' into the input field with ID 'otp_digit_1_input'
    Then the 'first' OTP digit field with ID 'otp_digit_1_input' should be populated

    # Step 7: Enter OTP Digit 2
    And I input the 'second' digit of the OTP from environment variable 'MOBILE_OTP' into the input field with ID 'otp_digit_2_input'
    Then the 'second' OTP digit field with ID 'otp_digit_2_input' should be populated

    # Step 8: Enter OTP Digit 3
    And I input the 'third' digit of the OTP from environment variable 'MOBILE_OTP' into the input field with ID 'otp_digit_3_input'
    Then the 'third' OTP digit field with ID 'otp_digit_3_input' should be populated

    # Step 9: Enter OTP Digit 4
    And I input the 'fourth' digit of the OTP from environment variable 'MOBILE_OTP' into the input field with ID 'otp_digit_4_input'
    Then the 'fourth' OTP digit field with ID 'otp_digit_4_input' should be populated

    # Step 10: Enter OTP Digit 5
    And I input the 'fifth' digit of the OTP from environment variable 'MOBILE_OTP' into the input field with ID 'otp_digit_5_input'
    Then the 'fifth' OTP digit field with ID 'otp_digit_5_input' should be populated

    # Step 11: Enter OTP Digit 6
    And I input the 'sixth' digit of the OTP from environment variable 'MOBILE_OTP' into the input field with ID 'otp_digit_6_input'
    Then the 'sixth' OTP digit field with ID 'otp_digit_6_input' should be populated

    # Step 12: Verify OTP
    And I tap the 'VERIFY' button with ID 'otp_verify_button'
    Then I should be on the 'Dashboard' screen with activity 'com.demo.serviceflow/.DashboardActivity'

    # Step 13: Dismiss Legal Terms Popup
    When I tap the 'ACCEPT' button with ID 'popup_legal_accept_button' on the 'Legal Terms' popup
    Then the 'Legal Terms' popup should no longer be displayed

    # Step 14: Dismiss Reminder Popup
    And I tap the 'LATER' button with ID 'popup_reminder_later_button' on the 'Reminder' popup
    Then the 'Reminder' popup should no longer be displayed
    And the 'Dashboard Home' screen should be fully displayed with the 'dashboard_greeting_text' element visible

    # Step 15: Open Dashboard Menu
    When I tap the 'Dashboard Menu' button with ID 'dashboard_menu_button'
    Then the navigation menu should slide open
    And the 'Increase Demo Limit' menu option with ID 'menu_action_increase_limit_button' should be visible

    # Step 16: Navigate to Increase Limit Feature
    And I tap the 'Increase Demo Limit' menu option with ID 'menu_action_increase_limit_button'
    Then I should be on the 'Agreement' screen with activity 'com.demo.serviceflow/.AgreementActivity'
    And the 'I accept the demo agreement' checkbox with ID 'agreement_checkbox' should be visible

    # Step 17: Accept Agreement
    When I tap the 'I accept the demo agreement' checkbox with ID 'agreement_checkbox'
    Then the 'I accept the demo agreement' checkbox with ID 'agreement_checkbox' should be checked

    # Step 18: Continue from Agreement Screen
    And I tap the 'CONTINUE' button with ID 'agreement_continue_button'
    Then I should be on the 'Review' screen with activity 'com.demo.serviceflow/.ReviewActivity'
    And the 'SUBMIT' button with ID 'review_submit_button' should be visible

    # Step 19: Submit Credit Limit Increase Request
    When I tap the 'SUBMIT' button with ID 'review_submit_button'
    Then the credit limit increase request should be successfully submitted
    And I should be on the 'Result' screen with activity 'com.demo.serviceflow/.ResultActivity'