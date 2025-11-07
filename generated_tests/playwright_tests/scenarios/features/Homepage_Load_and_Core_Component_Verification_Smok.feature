```gherkin
# language: en
@smoke
@critical
@homepage
Feature: Homepage Accessibility and Core Component Verification
  As a potential customer,
  I need to be able to successfully load the ATID Store homepage and see its essential components,
  So that I can confirm the site is operational and begin my shopping journey.

  @functional_test
  Scenario: Homepage Load and Core Component Verification - Smoke Test
    This critical smoke test validates that the website's primary entry point is online, accessible, and renders its essential structural elements correctly.
    User Story: As a first-time visitor, I want to successfully load the homepage, so that I can begin browsing the store's products and categories.

    Given I am on the homepage 'https://atid.store/'
    Then the URL should be 'https://atid.store/'
    And I should see the page title contains 'ATID Store'
    And I should see the main site header is visible
    And the site logo should be visible in the header
    And I should see a primary navigation menu
    And the navigation menu should contain a link with text 'Home'
    And the navigation menu should contain a link with text 'Store'
    And the navigation menu should contain a link with text 'Men'
    And the navigation menu should contain a link with text 'Women'
    And the navigation menu should contain a link with text 'Accessories'
    And the navigation menu should contain a link with text 'About'
    And the navigation menu should contain a link with text 'Contact Us'

```