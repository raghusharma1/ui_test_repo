```gherkin
@e2e_business_workflow @high_priority @authentication
Feature: Unsplash Image Submission Workflow
  As a content contributor on Unsplash,
  I want a robust and clear image submission process,
  So that I can successfully upload my photos and handle any errors gracefully.

  Background:
    Given I am a logged-in user on the homepage 'https://unsplash.com/'

  @image_upload @error_handling
  Scenario: Attempt Invalid Image Upload and Gracefully Cancel
    When I click the "Submit an image" button in the site header
    Then I should see the "Submit to Unsplash" modal
    And the modal should contain the text "Help us build the world’s most open library of visuals."

    When I check the "I understand and agree" checkbox
    And I click the "Start uploading" button
    Then the "Select photos to upload" view should be displayed in the modal

    # This step represents the non-automatable user action of selecting a file.
    # The automation script will interact with the file input element directly.
    When I attempt to upload an invalid file type named "document.txt"
    Then I should see a dialog with an error message for an unsupported file type

    When I click the "OK, got it" button in the error dialog
    Then the error dialog should disappear
    And I should still see the "Select photos to upload" view in the modal

    When I click the "Cancel" button in the upload modal
    Then the "Submit to Unsplash" modal should disappear
    And I should be on the homepage 'https://unsplash.com/'
```