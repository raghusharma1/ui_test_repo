```gherkin
# language: en
@smoke
@critical
@navigation

Feature: Website Homepage Accessibility
  As a potential customer,
  I want to successfully navigate to the ATID Store homepage,
  so that I can begin browsing the store's products without any loading errors.

  Background:
    Given I have a web browser ready

  @P1
  Scenario: Verify successful loading of the ATID Store homepage
    This is a critical smoke test to verify that the website's homepage is online and accessible.
    It validates the most fundamental prerequisite for any user interaction: the site must load correctly.

    When I navigate to the homepage "https://atid.store/"
    Then I should be on the homepage with the URL "https://atid.store/"
    And the page title should be "ATID Demo Store"
    And I should see the "ATID Demo Store" logo in the header section
    And the main navigation bar containing "Home", "Store", and "Men" links should be visible

```