```gherkin
# language: en
@critical @e2e @search @filtering
Feature: Advanced Image Search and Filtering
  As a content creator, I need to be able to search for images on Unsplash
  and use multiple filters and refinement tools to efficiently narrow down
  the results to my specific needs, ensuring a productive and successful user experience.

  @smoke
  Scenario: Refine an image search with orientation and related topic filters
    This scenario validates a user's ability to perform a search, apply an orientation filter,
    and then pivot to a related topic, ensuring all filters persist correctly.

    Given I am on the homepage 'https://unsplash.com/'
    Then I should see the main search input field with placeholder text "Search photos and illustrations"

    When I fill in the "Search photos and illustrations" field with "nature"
    And I click the search icon button to submit the query
    Then I should be on the search results page for "nature"
    And the page URL should contain "/s/photos/nature"
    And I should see a heading that says "Nature"

    When I click the "Orientation" filter button
    Then the orientation filter options should be displayed
    And the "Landscape" option should be visible in the orientation dropdown

    When I click the "Landscape" orientation option
    Then the page URL should contain "orientation=landscape"
    And the "Orientation" filter should display "Landscape"
    And the displayed images should primarily be in landscape format

    When I click the "Sort by" filter button
    Then the sort by options dropdown should be displayed
    And I should see the "Relevance" and "Newest" sort options

    When I click the "forest" related search tag
    Then I should be on the search results page for "forest"
    And the page URL should contain "/s/photos/forest"
    And the page URL should still contain "orientation=landscape"
    And the main search input should contain the value "forest"

```