Feature: Job Seeker Onboarding and Preference Management
  As a job seeker, I want to provide my job preferences, upload a resume, and receive personalized job matches,
  so that I can efficiently find relevant employment opportunities.

  Background:
    Given the API base URL is "https://api.jobplatform.com"
    And the "Content-Type" header is "application/json"

# --- Seeker Onboarding and Preference Capture Scenarios ---

  @onboarding @ui
  Scenario: A new visitor is offered the guided questionnaire on their first visit
    Given I am a new visitor to the job platform
    When I navigate to the home page
    Then I should see a prominent prompt to start the guided questionnaire
    When I click the "Start Questionnaire" button
    Then I should be on the first page of the questionnaire

  @onboarding @ui
  Scenario Outline: A new visitor provides various preferences in the questionnaire and sees filtered results
    Given I am a new visitor who has started the questionnaire
    When I answer the "<preference_type>" question with "<value>"
    And I complete and submit the questionnaire
    Then I should be on the job results page
    And the active filters should include "<preference_type>" with "<display_value>"
    And the job listings should be relevant to the provided preference

    Examples:
      | preference_type         | value                     | display_value             |
      | Working Arrangement     | hybrid                    | Hybrid                    |
      | Motivation              | career progression        | Career Progression        |
      | Target Annual Salary    | 85000                     | Salary: $85,000+          |
      | Location                | United Kingdom - London   | Location: UK - London     |
      | Job Category            | Marketing                 | Category: Marketing       |
      | Years of Experience     | 10+ years                 | Experience: 10+ Years     |
      | Highest Education Level | Master's Degree           | Education: Master's Degree|
      | Most Valued Benefit     | 401(k) Matching           | Benefit: 401(k) Matching  |

  @onboarding @api
  Scenario Outline: Submit job preferences for an anonymous seeker via API
    Given I am an anonymous seeker
    When I send a POST request to "/api/v1/preferences/anonymous" with the payload:
      """
      <payload>
      """
    Then the response status should be <status_code>
    And the response body should contain a "sessionId"
    And the response body should match the <expected_outcome>

    Examples:
      | description                     | payload                                                                                                                                                           | status_code | expected_outcome                                                                                             |
      | Full valid preferences          | {"workingArrangement": "fully_remote", "targetSalary": 110000, "location": "USA", "jobTitles": ["Software Engineer"], "experienceYears": "5-9"}                     | 201         | saved preferences                                                                                            |
      | Partial preferences (skip some) | {"workingArrangement": "fully_remote", "targetSalary": 110000, "location": null, "jobTitles": [], "experienceYears": null}                                         | 201         | partially saved preferences with nulls for skipped fields                                                    |
      | Invalid salary format           | {"workingArrangement": "hybrid", "targetSalary": "one hundred thousand", "location": "Canada"}                                                                    | 400         | validation error message for the 'targetSalary' field                                                        |
      | Exceeding max job titles        | {"jobTitles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5", "Title 6"]}                                                                                  | 400         | validation error message indicating the job title limit has been exceeded                                    |
      | Empty payload                   | {}                                                                                                                                                                | 400         | validation error message stating that at least one preference is required                                    |

  @onboarding @ui
  Scenario: A seeker is prevented from entering more than the maximum of 5 job titles
    Given I am on the job titles step of the questionnaire
    When I enter "Product Manager" and add it
    And I enter "Senior Product Manager" and add it
    And I enter "Product Owner" and add it
    And I enter "Head of Product" and add it
    And I enter "Director of Product" and add it
    Then I should see 5 job titles listed
    And the input field for adding a new job title should be disabled
    And I should see a message indicating "You can add a maximum of 5 job titles"

# --- Resume Handling Scenarios ---

  @resume @ui
  Scenario Outline: A seeker uploads a resume with various file types and sizes
    Given I am on the resume upload step of the questionnaire
    When I attempt to upload a file named "<file_name>" with size <size_mb> MB
    Then I should see the message "<expected_message>"
    And the UI should reflect the "<upload_status>"

    Examples:
      | file_name              | size_mb | expected_message                                                      | upload_status         |
      | test_resume.pdf        | 2.0     | "test_resume.pdf has been uploaded successfully"                      | success               |
      | my_cv.docx             | 0.3     | "my_cv.docx has been received"                                        | success               |
      | profile_pic.jpg        | 1.0     | "Invalid file type. Please upload a PDF, DOC, or DOCX document."      | failure               |
      | resume_at_limit.pdf    | 5.0     | "resume_at_limit.pdf has been uploaded successfully"                  | success               |
      | resume_over_limit.pdf  | 5.1     | "File is too large. The maximum file size is 5MB."                    | failure               |
      | empty.docx             | 0.0     | "The selected file is empty and cannot be processed."                 | failure               |

  @resume @api
  Scenario Outline: Upload a resume for an anonymous session via API
    Given I have a valid anonymous "sessionId"
    When I send a multipart/form-data POST request to "/api/v1/resumes/anonymous" with a file of type "<file_type>" and size <size_mb> MB
    Then the response status should be <status_code>
    And the response body should contain the message "<message>"

    Examples:
      | file_type | size_mb | status_code | message                                          |
      | pdf       | 2.5     | 202         | "Resume received and is being processed."        |
      | docx      | 4.9     | 202         | "Resume received and is being processed."        |
      | png       | 1.0     | 415         | "Unsupported file type. Only PDF, DOC, DOCX are accepted." |
      | pdf       | 6.0     | 413         | "Payload too large. Maximum file size is 5MB."   |
      | doc       | 0.0     | 400         | "File cannot be empty."                          |

# --- Job Matching and Results Scenarios ---

  @matching @ui
  Scenario: Captured preferences persist for subsequent searches within an anonymous session
    Given I have completed the questionnaire with "Hybrid" work arrangement and "Marketing" category
    And I am on the job results page
    When I enter "Coordinator" in the search bar and submit
    Then the job results should be updated to match "Coordinator"
    And the "Hybrid" and "Marketing" filters should remain active

  @matching @ui
  Scenario: A seeker can clear an individual preference filter from the job results page
    Given I am on the job results page filtered by "Salary > $100,000" and "Location: United States"
    When I click the "clear" icon on the "Salary > $100,000" filter tag
    Then the "Salary > $100,000" filter tag should disappear
    And the job results list should refresh with more listings
    And the "Location: United States" filter tag should remain active

  @matching @ui
  Scenario: System provides feedback when a search is too restrictive
    Given I have completed the questionnaire with "fully remote", "New Zealand", and a target salary of "$200,000"
    And the job results page shows "Showing 1 result"
    Then I should see a message suggesting "Try widening your 'Location' or 'Salary' to see more."

  @matching @api
  Scenario: Fetch personalized job listings based on saved preferences for a registered user
    Given I am an authenticated user with saved preferences for "fully_remote" and "USA"
    When I send a GET request to "/api/v1/jobs/search"
    Then the response status should be 200
    And all jobs in the response should have "workingArrangement" as "fully_remote"
    And all jobs in the response should have "location" as "USA"

# --- Registration and Data Persistence Scenarios ---

  @registration @ui
  Scenario Outline: Registration is required for high-intent actions
    Given I am an anonymous user on the job results page
    When I click the "<action_button>" button on a job listing
    Then I should be prompted to register or log in
    And the action should be blocked until I am authenticated

    Examples:
      | action_button |
      | Apply         |
      | Save Job      |
      | Set up alerts |

  @registration @e2e
  Scenario: Preferences and resume from an anonymous session carry over after registration
    Given I am a new visitor on the home page
    When I complete the questionnaire with "fully remote" and a salary of "125000"
    And I upload a resume named "my_new_cv.pdf"
    And I view the job results and click "Save Job" on a listing
    And I complete the registration form for a new account
    And I log in to my new account
    Then my profile page should display "fully remote" as the working arrangement
    And my profile page should display "$125,000" as the target salary
    And my documents section should list "my_new_cv.pdf" as my current resume

  @registration @api
  Scenario: Associate anonymous session data with a new user account upon registration
    Given I have an anonymous "sessionId" with saved preferences and an uploaded resume
    When I send a POST request to "/api/v1/register" with the following payload:
      """
      {
        "email": "new.user.test@example.com",
        "password": "ValidPassword123!",
        "anonymousSessionId": "abc-123-def-456"
      }
      """
    Then the response status should be 201
    And the response should contain an authentication token
    When I use the new token to send a GET request to "/api/v1/users/me/preferences"
    Then the response status should be 200
    And the response body should contain the preferences from the anonymous session
    When I use the new token to send a GET request to "/api/v1/users/me/resume"
    Then the response status should be 200
    And the response body should contain details of the uploaded resume

# --- Account and Data Management Scenarios ---

  @management @ui
  Scenario: A registered user can update a single preference without repeating the questionnaire
    Given I am a registered user logged in to my account
    And my current target salary is "$80,000"
    When I navigate to the "My Preferences" page
    And I edit the target salary to "95000" and save the change
    Then I should see a success message "Your preferences have been updated"
    And my profile should now display the target salary as "$95,000"
    And my other preferences should remain unchanged

  @management @ui
  Scenario: A registered user can remove their resume and clear all preferences
    Given I am a registered user logged in with a saved resume and preferences
    When I navigate to the "Document Management" page and remove my resume
    Then the UI should indicate that no resume is on file
    When I navigate to the "My Preferences" page and click "Clear All Preferences"
    Then all preference fields on the page should be empty or reset to default
    And I should see a prompt to start the preference questionnaire again

  @management @api
  Scenario Outline: A registered user manages their data via API
    Given I am an authenticated user with a valid auth token
    When I send a <method> request to "<endpoint>"
    Then the response status should be <status_code>
    And the <subsequent_check> should be successful

    Examples:
      | method   | endpoint                      | status_code | subsequent_check                                                              |
      | DELETE   | /api/v1/users/me/resume       | 204         | subsequent GET to /api/v1/users/me/resume returns 404                         |
      | DELETE   | /api/v1/users/me/preferences  | 204         | subsequent GET to /api/v1/users/me/preferences returns an empty object        |
