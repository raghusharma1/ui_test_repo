```gherkin
Feature: Homepage Accessibility and Verification
  As a potential customer
  I want to be able to load the ATID Store homepage successfully
  So that I can confirm the site is online and begin my shopping journey

@smoke @critical @homepage @functional_test
Scenario: Homepage Load and Basic Verification - Sanity Test
  This fundamental scenario validates that the ATID Store website is online and the homepage can be successfully loaded.
  It checks for the correct URL, page title, and the presence of essential structural elements, ensuring the site's basic availability.

  Given I am a new visitor to the ATID Store
  When I navigate to the homepage "https://atid.store/"
  Then the URL should be "https://atid.store/"
  And the page title should be "ATID Store – ATID College"
  And I should see the main site header
  And the main site header should contain the text "ATID Demo Store"

```