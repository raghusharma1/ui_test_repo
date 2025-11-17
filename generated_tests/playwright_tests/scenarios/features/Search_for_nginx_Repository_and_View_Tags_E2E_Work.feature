```gherkin
# Author: Gherkin Expert AI
# Website: https://hub.docker.com/
# Priority: Critical
# Test Type: E2E Workflow

@e2e @critical @search
Feature: Docker Hub Repository Search and Tag Discovery
  As a developer, I need to search for the official 'nginx' image and view its available tags
  so that I can choose the correct version for my application deployment.

  Scenario: Search for 'nginx' Repository and View its Tags
    # Step 1: Navigate to the homepage and verify initial state
    Given I am on the homepage 'https://hub.docker.com/'
    Then I should see a main navigation header
    And I should see the main search input field with placeholder text "Search"

    # Step 2 & 3: Perform a search for the 'nginx' image
    When I enter "nginx" into the "Search" input field
    And I press the "Enter" key
    Then I should be on the search results page
    And the URL should contain "/search?q=nginx"
    And I should see a heading containing "Search results"

    # Step 4: Select the official repository from the results
    When I click the "nginx" repository link identified as the 'Docker Official Image'
    Then I should be on the "nginx" repository details page
    And the URL should contain "/_/nginx"
    And I should see the repository title "nginx"

    # Step 5: Navigate to the tags view
    When I click on the "Tags" tab
    Then I should be on the repository tags page
    And the URL should contain "/_/nginx/tags"
    And the "Tags" tab should be active

    # Step 6: Verify that the list of tags is displayed correctly
    And I should see a list of image tags
    And the list should contain an image tag named "latest"
```