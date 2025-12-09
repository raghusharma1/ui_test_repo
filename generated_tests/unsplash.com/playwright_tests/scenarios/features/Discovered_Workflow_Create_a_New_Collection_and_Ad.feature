```gherkin
# language: en
@critical @e2e_business_workflow @collection_management
Feature: Image Collection Management
  As a registered Unsplash user,
  I want to search for images and organize them into new, personalized collections.
  This core functionality allows for curating content, which is crucial for user engagement and retention.

  Background:
    Given I am a logged-in user on the Unsplash website

  @medium @smoke
  Scenario: Create a New Collection and Add a Searched Image
    Based on the user story: "As a user, I want to create a new collection for my favorite nature photos so that I can easily find them later."
    This scenario tests the end-to-end flow of searching for an image, initiating the collection creation process, and successfully adding the image to a newly named and described collection.

    Given I am on the homepage 'https://unsplash.com/'
    When I fill in the main search bar with "nature"
    And I click the search button
    Then I should be on the search results page for "nature"
    And I should see a grid of images related to "nature"

    When I click on the first image in the search results
    Then I should be on the photo details page
    And I should see the "Add to collection" button

    When I click the "Add to collection" button
    Then the "Add to a collection" dialog should appear
    And I should see the "Create a new collection" button

    When I click the "Create a new collection" button
    Then the new collection form should be displayed within the dialog

    When I fill in the "Title" field with "My Nature Collection"
    And I fill in the "Description" field with "A collection of beautiful nature photos."
    And I click the "Create collection" button to finalize
    Then I should see a confirmation message stating the image was added to "My Nature Collection"
    And the "Add to collection" button should now be updated to show the image is in a collection

```