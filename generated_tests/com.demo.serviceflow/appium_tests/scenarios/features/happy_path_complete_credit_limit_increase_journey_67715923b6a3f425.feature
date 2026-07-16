Feature: Credit Limit Increase Workflow

  As a demo user of the ServiceFlow application,
  I want to increase my credit limit through the mobile app
  So that I have more purchasing power for my upcoming expenses.

  @critical @e2e_business_workflow
  Scenario: Happy Path - Complete Credit Limit Increase Journey
    # App Initialization and Splash
    Given I am on the homepage 'com.demo.serviceflow'
    And I wait for the splash screen to transition to the main activity
    
    # Version Check Bypass
    When I tap the 'NEXT TIME' button with ID 'com.demo.serviceflow:id/version_check_next_time_button'
    Then the Login screen should be displayed
    
    # Authentication - Login
    When I fill in the 'Username' field with 'demo.user' using ID 'com.demo.serviceflow:id/login_username_input'
    And I fill in the 'Password' field with 'Demo1234' using ID 'com.demo.serviceflow:id/login_password_input'
    And I tap the 'LOG IN' button with ID 'com.demo.serviceflow:id/login_submit_button'
    Then the OTP verification screen should be displayed
    
    # Authentication - Multi-Digit OTP (Security verification)
    When I fill in the 'OTP Digit 1' field with '1' using ID 'com.demo.serviceflow:id/otp_digit_1_input'
    And I fill in the 'OTP Digit 2' field with '2' using ID 'com.demo.serviceflow:id/otp_digit_2_input'
    And I fill in the 'OTP Digit 3' field with '3' using ID 'com.demo.serviceflow:id/otp_digit_3_input'
    And I fill in the 'OTP Digit 4' field with '4' using ID 'com.demo.serviceflow:id/otp_digit_4_input'
    And I fill in the 'OTP Digit 5' field with '5' using ID 'com.demo.serviceflow:id/otp_digit_5_input'
    And I fill in the 'OTP Digit 6' field with '6' using ID 'com.demo.serviceflow:id/otp_digit_6_input'
    And I tap the 'VERIFY' button with ID 'com.demo.serviceflow:id/otp_verify_button'
    Then the 'Legal Terms' popup should be displayed
    
    # Mandatory Popup Handling
    When I tap the 'ACCEPT' button on the legal terms popup using ID 'com.demo.serviceflow:id/popup_legal_accept_button'
    Then the 'Reminder' popup should be displayed
    When I tap the 'LATER' button on the reminder popup using ID 'com.demo.serviceflow:id/popup_reminder_later_button'
    Then the 'Notifications' popup should be displayed
    When I tap the 'NOT NOW' button on the notifications popup using ID 'com.demo.serviceflow:id/popup_notifications_not_now_button'
    Then the Dashboard should be visible
    
    # Navigation to Workflow
    When I tap the dashboard hamburger menu button with ID 'com.demo.serviceflow:id/dashboard_menu_button'
    And I tap the 'Increase Limit' option in the menu with ID 'com.demo.serviceflow:id/menu_action_increase_limit_button'
    Then the Card Selector screen should be displayed
    
    # Card Selection and Limit Entry
    When I tap the card entry displaying '**** 1234' with ID 'com.demo.serviceflow:id/card_selector_card_masked_number_text'
    Then the Limit Entry screen should be displayed
    When I fill in the 'Requested Limit' field with '7500' using ID 'com.demo.serviceflow:id/limit_entry_value_input'
    And I tap the 'CONTINUE' button with ID 'com.demo.serviceflow:id/limit_entry_continue_button'
    Then the Agreement screen should be displayed
    
    # Agreement and Review
    When I check the 'demo agreement' checkbox with ID 'com.demo.serviceflow:id/agreement_checkbox'
    And I tap the 'CONTINUE' button on the agreement screen with ID 'com.demo.serviceflow:id/agreement_continue_button'
    Then the Review screen should be displayed
    And the reviewed limit value should be '7500'
    
    # Final Submission
    When I tap the 'SUBMIT' button on the review screen with ID 'com.demo.serviceflow:id/review_submit_button'
    Then a confirmation dialog should be displayed
    When I tap the 'SUBMIT' button on the confirmation dialog with ID 'com.demo.serviceflow:id/review_confirm_submit_button'
    
    # Success Verification and Return
    Then the result screen should display the success message 'Demo Limit Request Submitted'
    When I tap the 'BACK TO HOME' button with ID 'com.demo.serviceflow:id/result_back_home_button'
    Then I should be returned to the Dashboard home screen
    And the dashboard should be successfully loaded and interactable