```gherkin
@e2e @critical @search @filtering
Feature: Image Discovery and Filtering
  As a designer, I need to search for images and refine the results using filters and sorting.
  This ensures I can efficiently find the most relevant visual assets for my projects,
  verifying the core discovery functionality of the Unsplash platform.

  Scenario: Search, Filter, and Sort Images to Find Suitable Assets
    Given I am on the homepage 'https://unsplash.com/'
    When I enter "nature" into the "Search photos and illustrations" search bar
    And I click the search button
    Then I should be on the search results page for "nature"
    And the page URL should contain "/s/photos/nature"
    And the page heading should display "Nature"

    When I click the "Orientation" filter button
    Then the orientation filter options should be visible
    And I should see the "Landscape" orientation option
    When I click the "Landscape" orientation option
    Then the "Orientation" filter button should show "Landscape" as the selected value
    And the page URL should contain the parameter "orientation=landscape"
    And the displayed images should primarily be in landscape format

    When I click the "Sort by" filter button
    Then the sorting options should be visible
    And I should see the "Newest" sort option
    When I click the "Newest" sort option
    Then the "Sort by" filter button should show "Newest" as the selected value
    And the page URL should contain the parameter "order_by=latest"
    And the page URL should still contain the parameter "orientation=landscape"
    And the search results should be updated to reflect the new sorting order

```