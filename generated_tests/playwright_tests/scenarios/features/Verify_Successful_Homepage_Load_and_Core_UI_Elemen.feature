```gherkin
@smoke @critical @homepage
Feature: Docker Hub Homepage Accessibility and Core Elements
  As a new user, I want to load the Docker Hub homepage
  So that I can see the main features and begin searching for container images.
  This feature ensures that the primary entry point of the Docker Hub service is online, accessible, and renders the essential UI for user interaction.

  Scenario: Verify Successful Homepage Load and Core UI Elements
    This fundamental smoke test scenario verifies that the Docker Hub homepage is accessible and loads correctly.
    It ensures that critical, above-the-fold UI components, such as the main navigation, search bar, and sign-in options, are present and visible.

    Given I am on the homepage 'https://hub.docker.com/'
    Then the page URL should be 'https://hub.docker.com/'
    And the page title should contain 'Docker Hub'
    And I should see the 'Docker Hub' logo in the header
    And I should see an input field with the placeholder 'Search Docker Hub'
    And I should see a link with the text 'Sign In'
```