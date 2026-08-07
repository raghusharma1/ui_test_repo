@job-seeker-journey
Feature: Job Seeker Preference and Matching Journey
  As a job seeker, I want to provide my preferences, get relevant job matches, and manage my data,
  both as an anonymous visitor and as a registered user, to have a seamless and personalized job search experience.

  #------------------------------------------------------------------------------------
  # API Test Scenarios
  # These scenarios test the backend logic for handling preferences, resumes, and matching.
  #------------------------------------------------------------------------------------

  Background:
    Given the API base URL is "https://api.jobplatform.com"
    And the "Content-Type" header is set to "application/json"

  @api @preferences
  Scenario Outline: API - Submit job preferences for an anonymous session
    Given I have a new anonymous session ID
    When I send a POST request to "/api/v1/preferences" with the payload:
      """
      {
        "workingArrangement": "<workingArrangement>",
        "motivation": "<motivation>",
        "annualSalary": <annualSalary>,
        "location": "<location>",
        "jobTitles": ["<jobTitle>"],
        "yearsExperience": <yearsExperience>,
        "education": "<education>",
        "valuedBenefit": "<valuedBenefit>"
      }
      """
    Then the response status should be <status>
    And the response body should contain a "jobMatches" array

    Examples:
      | workingArrangement | motivation | annualSalary | location       | jobTitle             | yearsExperience | education         | valuedBenefit     | status |
      | Fully Remote       | Income     | 120000       | United States  | Senior QA Lead       | 10              | Master's Degree   | 401(k) Matching   | 200    |
      | Hybrid             | null       | null         | Canada         | Marketing Coordinator| 2               | null              | Health Insurance  | 200    |
      | On-Site            | Growth     | 80000        | United Kingdom | Software Engineer    | 5               | Bachelor's Degree | Paid Time Off     | 200    |

  @api @preferences @validation
  Scenario Outline: API - Validate numeric fields in the preference submission
    Given I have a new anonymous session ID
    When I send a POST request to "/api/v1/preferences" with the payload:
      """
      {
        "workingArrangement": "Fully Remote",
        "jobTitles": ["Developer"],
        "annualSalary": <annualSalary>,
        "yearsExperience": <yearsExperience>
      }
      """
    Then the response status should be 400
    And the response body should contain an error message "<errorMessage>"

    Examples:
      | annualSalary            | yearsExperience | errorMessage                               |
      | "one hundred thousand"  | 10              | "Annual salary must be a valid number."    |
      | 100000                  | "seven"         | "Years of experience must be a valid number." |
      | -50000                  | 10              | "Annual salary cannot be negative."        |
      | 100000                  | -2              | "Years of experience cannot be negative."  |

  @api @preferences @boundary
  Scenario Outline: API - Validate the number of job titles in the preference submission
    Given I have a new anonymous session ID
    When I send a POST request to "/api/v1/preferences" with a payload containing <jobTitles>
    Then the response status should be <status>

    Examples:
      | jobTitles                                                                                  | status |
      | ["Project Manager", "Program Manager", "Scrum Master", "Product Owner", "Agile Coach"]     | 200    |
      | ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5", "Title 6"]                         | 400    |

  @api @registration @data-persistence
  Scenario: API - Preferences and resume from an anonymous session are carried over upon registration
    # Step 1: Submit preferences as an anonymous user
    Given I have a new anonymous session ID
    When I send a POST request to "/api/v1/preferences" with the payload:
      """
      {
        "workingArrangement": "Fully Remote",
        "annualSalary": 125000,
        "jobTitles": ["Senior QA Lead"],
        "location": "United Kingdom"
      }
      """
    Then the response status should be 200

    # Step 2: Upload a resume in the same anonymous session (assuming this returns a file ID)
    When I send a POST request to "/api/v1/resumes/upload" with a valid resume file for the current session
    Then the response status should be 201
    And I store the "fileId" from the response

    # Step 3: Register a new account, passing the session ID to link the data
    When I send a POST request to "/api/v1/register" with the payload:
      """
      {
        "email": "test.user.12345@example.com",
        "password": "ValidPassword123!",
        "anonymousSessionId": "<anonymousSessionId>"
      }
      """
    Then the response status should be 201
    And the response body should contain an "authToken"

    # Step 4: Verify the data is in the new account
    When I set the "Authorization" header to the "authToken"
    And I send a GET request to "/api/v1/me/profile"
    Then the response status should be 200
    And the response body should contain "workingArrangement" with value "Fully Remote"
    And the response body should contain "annualSalary" with value 125000
    And the response body should contain "resumeFileId" with the stored "fileId"

  @api @account-management
  Scenario: API - A registered user can clear their preferences and remove their resume
    Given I am authenticated as a registered user with existing preferences and a resume
    
    # Delete preferences
    When I send a DELETE request to "/api/v1/me/preferences"
    Then the response status should be 204
    
    # Delete resume
    When I send a DELETE request to "/api/v1/me/resume"
    Then the response status should be 204
    
    # Verify deletion
    When I send a GET request to "/api/v1/me/profile"
    Then the response status should be 200
    And the response body should have a null value for "preferences"
    And the response body should have a null value for "resumeFileId"

  #------------------------------------------------------------------------------------
  # UI Test Scenarios
  # These scenarios test the end-to-end user flows and interactions with the web interface.
  #------------------------------------------------------------------------------------

  @ui @preferences @happy-path
  Scenario: A new anonymous user completes the entire preference questionnaire successfully
    Given I am a new visitor on the home page
    When I start the guided questionnaire
    And I select "Fully Remote" for working arrangement
    And I select "Income" for motivation
    And I enter "120000" in the "annual salary" field
    And I select "United States" for location
    And I enter "Senior QA Lead" in the "job titles" field
    And I enter "10" in the "years of relevant experience" field
    And I select "Master's Degree" for education level
    And I select "401(k) Matching" for most valued benefit
    And I click the "See My Matches" button
    Then I should be redirected to the job results page
    And I should see job listings filtered by my preferences

  @ui @preferences @partial-submission
  Scenario: A user submits a partially completed questionnaire and gets relevant matches
    Given I am a new visitor on the home page
    When I start the guided questionnaire
    And I enter "Marketing Coordinator" in the "job titles" field
    And I select "Hybrid" for working arrangement
    And I enter "2" in the "years of relevant experience" field
    And I leave the "annual salary" field blank
    And I leave the "highest level of education" field unselected
    And I click the "See My Matches" button
    Then I should be redirected to the job results page
    And I should see job listings for "Marketing Coordinator" with "Hybrid" work arrangements

  @ui @preferences @validation
  Scenario Outline: The system provides clear validation for non-numeric inputs in the questionnaire
    Given I am a new visitor on the questionnaire page
    When I enter "<invalid_input>" in the "<field_name>" field
    And I fill in all other required fields with valid data
    And I click the "See My Matches" button
    Then I should remain on the questionnaire page
    And I should see the error message "<error_message>" for the "<field_name>" field

    Examples:
      | field_name                    | invalid_input          | error_message                               |
      | annual salary                 | "one hundred thousand" | "Please enter a valid number."              |
      | years of relevant experience  | "seven"                | "Please enter a number for years of experience." |

  @ui @resume @validation
  Scenario Outline: A user attempts to upload a resume with various file types and sizes
    Given I am on the resume upload step of the questionnaire
    When I attempt to upload a file named "<filename>" with size "<filesize>" and type "<filetype>"
    Then I should see the message "<expected_message>"

    Examples:
      | filename              | filesize | filetype | expected_message                                                              |
      | resume_valid.pdf      | 4.9MB    | PDF      | "resume_valid.pdf uploaded successfully."                                     |
      | resume_too_large.pdf  | 5.1MB    | PDF      | "File size exceeds the 5MB limit. Please upload a smaller file."              |
      | my_headshot.png       | 1.2MB    | PNG      | "Unsupported file type. Please upload a .pdf, .doc, or .docx file."           |

  @ui @matching @feedback
  Scenario: The system indicates which preference is narrowing the job search results
    Given I am a new visitor on the home page
    When I complete the questionnaire with a highly restrictive combination of preferences
      | preference | value         |
      | Job Title  | Junior Assistant |
      | Salary     | 200000        |
    And I click the "See My Matches" button
    Then I should be on the job results page with very few listings
    And I should see a message next to the "Salary" filter indicating "This may be limiting your results"

  @ui @matching @persistence
  Scenario: Captured preferences are applied to subsequent searches during the same anonymous visit
    Given I have completed the questionnaire with "Hybrid" as my working arrangement
    And I am on the job results page
    When I enter "Accountant" in the main search bar and submit
    Then the results should be updated to show "Accountant" jobs
    And the "Working Arrangement: Hybrid" filter should still be active

  @ui @registration @state-transition
  Scenario Outline: An anonymous user is prompted to register when performing a key action
    Given I am an anonymous user on the job results page
    When I click the "<action_button>" button on a job listing
    Then I should see a registration and login prompt

    Examples:
      | action_button |
      | Apply         |
      | Save Job      |
      | Set up alerts |

  @ui @e2e @data-persistence
  Scenario: A user's preferences and resume persist from anonymous session to registered account
    Given I am a new visitor on the home page
    When I complete the questionnaire with "Product Manager" as the job title
    And I upload a resume named "my_latest_resume.pdf"
    And I click "Save Job" on a listing from the results page
    And I complete the registration process for a new account
    And I log out and log back in
    And I navigate to my profile page
    Then I should see my saved job title preference is "Product Manager"
    And I should see "my_latest_resume.pdf" listed as my current resume

  @ui @account-management
  Scenario: A registered user can clear all their preferences from their account
    Given I am logged in as a registered user with saved preferences
    When I navigate to the "Account Settings" page
    And I click the "Clear All Preferences" button
    And I confirm the action
    Then I should see a success message "Your preferences have been successfully cleared"
    And when I navigate to the job search page, no filters should be pre-applied

  @ui @analytics
  Scenario Outline: Analytics events are fired for key user actions during a first visit
    Given I am a new anonymous user on the platform with analytics tracking enabled
    When I perform the action "<user_action>"
    Then an analytics event "<event_name>" should be fired with the correct payload

    Examples:
      | user_action                               | event_name          |
      | start the guided questionnaire            | questionnaire_begun |
      | click to view a job listing's details     | listing_engaged     |
      | click to save a job listing               | listing_engaged     |
      | close the browser without engaging        | session_abandoned   |
