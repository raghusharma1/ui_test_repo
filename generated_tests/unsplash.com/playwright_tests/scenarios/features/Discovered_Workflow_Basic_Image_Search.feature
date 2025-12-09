```gherkin
# language: en
# author: GherkinExpert AI
# date: [current date]

@smoke_test
@critical
@search

Feature: Image Search
  As a user of Unsplash, I want to perform a keyword search to find relevant images.
  This feature is the primary method for content discovery and is critical to the core user experience.

  Scenario: Discovered Workflow: Basic Image Search
    This scenario validates the fundamental user journey of searching for a common term ("nature")
    and verifying the successful navigation to the corresponding search results page.

    Given I am on the homepage "https://unsplash.com/"
    Then I should see the search input field with the placeholder "Search photos and illustrations"

    When I fill in the "Search photos and illustrations" field with "nature"
    And I click the search button next to the input field
    
    Then I should be on the search results page for "nature"
    And the page URL should contain "/s/photos/nature"
    And I should see the heading "Nature"
    And I should see a grid of images related to the search term
```