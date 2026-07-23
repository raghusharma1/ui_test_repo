@e2e @critical @android @H6 @CardCarousel @TransactionDetails
Feature: H6 — Card carousel and transaction bottom sheet (Card Details showcase)
  As a cardholder, I want to securely log in, view my card details, and inspect individual transactions
  So that I can manage my finances effectively.

  This feature verifies the user's ability to log in, navigate to the cards section, interact with the card carousel,
  and view transaction details via a bottom sheet, including opening and closing transaction details.

  Scenario: Successfully view card details and transaction history after login
    Given I am on the homepage 'com.demo.serviceflow'
    Then the splash screen with title 'splash_title_text' should be visible

    When I tap the 'NEXT TIME' button on the version check popup
    Then I should be on the Login screen 'com.demo.serviceflow/.LoginActivity'

    When I fill in the 'Username' input field with 'demo.user'
    And I fill in the 'Password' input field with 'Demo1234'
    And I tap the 'LOG IN' button
    Then I should be on the OTP screen 'com.demo.serviceflow/.OtpActivity'

    When I enter the first digit of the OTP from 'MOBILE_OTP' into the 'OTP digit 1' input field
    And I enter the second digit of the OTP from 'MOBILE_OTP' into the 'OTP digit 2' input field
    And I enter the third digit of the OTP from 'MOBILE_OTP' into the 'OTP digit 3' input field
    And I enter the fourth digit of the OTP from 'MOBILE_OTP' into the 'OTP digit 4' input field
    And I enter the fifth digit of the OTP from 'MOBILE_OTP' into the 'OTP digit 5' input field
    And I enter the sixth digit of the OTP from 'MOBILE_OTP' into the 'OTP digit 6' input field
    And I tap the 'VERIFY' button
    Then I should be on the Dashboard screen 'com.demo.serviceflow/.DashboardActivity'
    And the legal popup with title 'Demo Terms' should be displayed

    When I tap the 'ACCEPT' button on the legal popup
    Then the reminder popup with title 'Reminder' should be displayed

    When I tap the 'LATER' button on the reminder popup
    Then the notifications popup with title 'Enable Notifications' should be displayed

    When I tap the 'NOT NOW' button on the notifications popup
    Then I should be on the Dashboard screen 'com.demo.serviceflow/.DashboardActivity'
    And the dashboard greeting text should be 'Hello, Alex'

    When I tap the 'Cards' tab
    Then I should be on the Card Details section of the Dashboard
    And the card carousel should be visible

    And the currently displayed card's 'used' utilization should be '2500 demo'
    And the currently displayed card's 'available' utilization should be '2500 demo'

    When I swipe the card carousel left
    Then the currently displayed card's 'used' utilization should be '1800 demo'
    And the currently displayed card's 'available' utilization should be '6200 demo'

    When I tap the 'Coffee Shop Demo' transaction row
    Then the transaction detail bottom sheet should be visible
    And the transaction detail bottom sheet should show merchant 'Coffee Shop Demo'
    And the transaction detail bottom sheet should show amount '24.90'
    And the transaction detail bottom sheet should show date '2026-06-18'
    And the transaction detail bottom sheet should show reference 'TXN-DEMO-0001'

    When I tap the 'Close' button on the transaction detail bottom sheet
    Then the transaction detail bottom sheet should no longer be visible

    When I tap the expand button for the second transaction row
    Then the transaction detail bottom sheet should be visible

    When I tap the 'Close' button on the transaction detail bottom sheet
    Then the transaction detail bottom sheet should no longer be visible