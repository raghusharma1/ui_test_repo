```gherkin
@e2e @profile @high-priority
Feature: User Profile Management
  As a registered Unsplash user,
  I want to navigate to my account settings and edit my personal information,
  So that I can ensure my profile details are accurate and up-to-date.

Background:
  Given I am an authenticated user on the Unsplash website

@e2e-business-workflow @profile-update
Scenario: Successfully update first and last name from the account settings page
  Given I am on the homepage "https://unsplash.com/"
  When I click the "Profile" button in the main navigation header
  And I click the "View profile" link in the user dropdown menu
  Then I should be on my public profile page with the path containing "/@testerui39"

  When I click the "Edit profile" link
  Then I should be on the account settings page with the path "/account"
  And the page title should contain "Edit Profile"

  When I fill in the "First name" field with "Updated First Name"
  And I fill in the "Last name" field with "Updated Last Name"
  And I click the "Update account" button to save my changes
  Then I should see a success confirmation message stating "Account updated."
  And the value of the "First name" field should be "Updated First Name"
  And the value of the "Last name" field should be "Updated Last Name"

```