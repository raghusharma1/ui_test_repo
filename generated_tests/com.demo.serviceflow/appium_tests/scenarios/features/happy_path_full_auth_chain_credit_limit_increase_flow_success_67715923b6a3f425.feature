@e2e_business_workflow @critical
Feature: Credit Limit Increase Workflow - Happy Path
  As an existing customer, I want to increase my credit limit for a specific card so that I can have more purchasing power.
  This feature tests the complete user journey from application launch, through login and OTP, handling initial popups,
  navigating to the credit limit increase feature, submitting a request, and verifying successful completion of the flow.

  Scenario: Happy Path - Full Auth Chain + Credit Limit Increase Flow + Success
    # Appium Implementation Guidance:
    # - Use WebDriverWait for element presence and visibility, especially after app launch and screen transitions.
    # - For OTP inputs, ensure the test framework can dynamically read the code from an environment variable (e.g., MOBILE_OTP).
    # - Implement explicit waits for loading states, such as the dashboard list loading.
    # - Verify text content and element visibility at key stages to confirm navigation and data accuracy.

    Given I am on the homepage 'com.demo.serviceflow'
    And the splash screen should be visible

    When I tap the 'NEXT TIME' button on the 'Version Check' screen
    Then I should be on the 'Login' screen

    When I clear the 'Username' input field
    Then the 'Username' input field should be empty
    When I fill in the 'Username' input field with 'demo.user'
    Then the 'Username' input field should contain 'demo.user'
    When I fill in the 'Password' input field with 'Demo1234'
    Then the 'Password' input field should contain masked input
    And I tap the 'LOG IN' button
    Then I should be on the 'OTP' screen

    When I fill in the 'OTP digit 1' input field with the first digit of the OTP
    And I fill in the 'OTP digit 2' input field with the second digit of the OTP
    And I fill in the 'OTP digit 3' input field with the third digit of the OTP
    And I fill in the 'OTP digit 4' input field with the fourth digit of the OTP
    And I fill in the 'OTP digit 5' input field with the fifth digit of the OTP
    And I fill in the 'OTP digit 6' input field with the sixth digit of the OTP
    And I tap the 'VERIFY' button
    Then the 'Legal Terms' popup should be displayed

    When I tap the 'ACCEPT' button on the 'Legal Terms' popup
    Then the 'Reminder' popup should be displayed
    When I tap the 'LATER' button on the 'Reminder' popup
    Then the 'Notifications' popup should be displayed
    When I tap the 'NOT NOW' button on the 'Notifications' popup
    Then I should be on the 'Dashboard Home' screen
    And the 'dashboard greeting' text should be 'Hello, Alex'
    And the 'dashboard recent list' should be visible
    And the 'dashboard recent list' should contain 3 rows

    When I tap the 'Dashboard Menu' button (hamburger icon)
    Then I should be on the 'Menu' screen
    And the 'Increase Limit' menu option should be visible

    When I tap the 'Increase Limit' button
    Then I should be on the 'Card Selector' screen
    And the 'Card Selector' list should be visible with 3 rows

    When I tap the 'Demo Credit Card **** 1234' card item
    Then I should be on the 'Limit Value Entry' screen
    And the 'Selected Card' field should contain '**** 1234'
    And the 'Current Limit' field should show '5000 demo'
    And the 'Available Limit' field should show '2500 demo'

    When I fill in the 'Requested Demo Limit' input field with '7500'
    Then the 'Requested Demo Limit' input field should contain '7500'
    And I tap the 'CONTINUE' button on the 'Limit Entry' screen
    Then I should be on the 'Agreement' screen
    And the 'I accept the demo agreement' checkbox should be visible and unchecked

    When I tap the 'I accept the demo agreement' checkbox
    Then the 'I accept the demo agreement' checkbox should be checked
    And I tap the 'CONTINUE' button on the 'Agreement' screen
    Then I should be on the 'Review' screen
    And the 'Selected Card' value should contain '**** 1234'
    And the 'Requested Limit' value should be '7500'
    And the 'Agreement Status' should be 'Accepted'

    When I tap the 'SUBMIT' button on the 'Review' screen
    Then the 'Confirm' dialog should be displayed

    When I tap the 'SUBMIT' button on the 'Confirm' dialog
    Then I should be on the 'Result' screen
    And the 'Result Title' should be 'Demo Limit Request Submitted'
    And the 'Result Message' should be 'Your demo request was submitted successfully'
    And the 'Retry' button should not be visible
    And the 'Result Icon' should have content description 'Success'

    When I tap the 'BACK TO HOME' button
    Then I should be on the 'Dashboard Home' screen