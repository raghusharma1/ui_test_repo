```gherkin
@e2e_workflow @critical @search @repository
Feature: Docker Hub Repository Search and Tag Inspection
  To find and use the correct version of a container image
  As a developer
  I need to be able to search for a repository on Docker Hub, navigate to its details, and view its available tags.

  Scenario: Happy Path - Search for and View Nginx Repository Tags - E2E Workflow
    Given I am on the homepage 'https://hub.docker.com/'
    Then the page title should contain 'Docker Hub'
    And the 'Search Docker Hub' input field should be visible

    When I enter 'nginx' into the 'Search Docker Hub' input field
    And I click the search button
    Then I should be on the search results page with the URL containing '/search?q=nginx'
    And I should see a heading indicating search results for 'nginx'

    When I click the 'nginx' repository link marked as 'Docker Official Image'
    Then I should be on the 'nginx' repository details page with the URL containing '/_/nginx'
    And the main heading of the page should be 'nginx'
    And the 'Overview' and 'Tags' navigation tabs should be visible

    When I click on the 'Tags' navigation tab
    Then the page URL should be updated to contain '/_/nginx/tags'
    And the 'Tags' tab should be in an active state
    And a list of image tags should be displayed

    And the list should contain a row for the 'latest' tag
    And the list should contain column headers for 'Tag' and 'OS/ARCH'
```