@job-seeker-onboarding
Feature: Job Seeker Onboarding and Profile Management

  As a job seeker, I want to define my job preferences, upload my resume, and receive personalized job matches, with a seamless transition from an anonymous visitor to a registered user.

  #------------------------------------------------------------------------------------#
  # API Test Scenarios
  # These scenarios test the backend logic for preference and resume handling directly.
  #------------------------------------------------------------------------------------#

  @api @preferences
  Scenario Outline: API - Submit job preferences for an anonymous session
    Given the API endpoint for anonymous preferences is "/api/preferences/anonymous"
    When I send a POST request to that endpoint with the following payload
      """
      <payload>
      """
    Then the response status should be <status_code>
    And the response body should contain "<message>"

    Examples:
      | description                       | payload                                                                                                                                                                                                                                                         | status_code | message                               |
      | Happy Path - Full submission      | {"workingArrangement": "fully_remote", "motivation": "career_progression", "targetSalary": 95000, "location": "United States", "jobTitles": ["Product Manager"], "experienceYears": "5-7", "educationLevel": "bachelors"}                                       | 201         | "Preferences saved successfully"      |
      | Partial Submission - Skips fields | {"workingArrangement": "hybrid", "jobTitles": ["Data Analyst"], "location": "Canada", "targetSalary": null, "educationLevel": null}                                                                                                                            | 201         | "Preferences saved successfully"      |
      | Negative - Invalid salary format  | {"workingArrangement": "fully_remote", "targetSalary": "ninety-thousand"}                                                                                                                                                                                       | 400         | "Invalid format for targetSalary"     |
      | Boundary - Max job titles         | {"jobTitles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]}                                                                                                                                                                                            | 201         | "Preferences saved successfully"      |
      | Boundary - Exceed job titles      | {"jobTitles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5", "Title 6"]}                                                                                                                                                                                 | 400         | "Maximum number of job titles is 5" |
      | Negative - Empty submission       | {}                                                                                                                                                                                                                                                              | 400         | "At least one preference is required" |

  @api @resume
  Scenario Outline: API - Upload a resume for an anonymous session
    Given the API endpoint for anonymous resume upload is "/api/resumes/anonymous"
    When I send a POST request to that endpoint with a file named "<file_name>" of size "<file_size_mb>" and type "<file_type>"
    Then the response status should be <status_code>
    And the response body should contain the message "<message>"

    Examples:
      | description                  | file_name           | file_size_mb | file_type        | status_code | message                      |
      | Happy Path - PDF             | resume.pdf          | 2            | "application/pdf"  | 200         | "File uploaded successfully" |
      | Happy Path - DOCX            | resume.docx         | 3            | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | 200         | "File uploaded successfully" |
      | Boundary - Max size          | large_resume.pdf    | 5            | "application/pdf"  | 200         | "File uploaded successfully" |
      | Negative - Oversized         | too_large_resume.pdf| 5.1          | "application/pdf"  | 413         | "File exceeds maximum size of 5MB" |
      | Negative - Unsupported type  | image.png           | 1            | "image/png"        | 415         | "Unsupported file type. Please use PDF or DOCX" |

  @api @matching
  Scenario Outline: API - Retrieve personalized job listings based on preferences
    Given the API endpoint for job search is "/api/jobs"
    When I send a GET request to that endpoint with query parameter "<parameter>" set to "<value>"
    Then the response status should be 200
    And each job listing in the response should have the property "<property>" matching "<expected_value>"

    Examples:
      | description               | parameter            | value            | property                       | expected_value   |
      | Filter by remote work     | workingArrangement   | fully_remote     | workingArrangement             | "fully_remote"   |
      | Filter by salary          | minSalary            | 90000            | salary.min                     | ">= 90000"       |
      | Filter by experience      | experienceLevel      | senior           | experienceLevel                | "senior"         |
      | Filter by education       | educationRequirement | phd              | educationRequirement           | "phd"            |
      | Filter by job title       | jobTitle             | Product Manager  | title                          | "Product Manager"|

  @api @account @data
  Scenario Outline: API - Manage registered user's data
    Given I am an authenticated user with ID "user123"
    When I send a <method> request to the endpoint "<endpoint>"
    Then the response status should be <status_code>
    And the response should confirm the action was "<action_result>"

    Examples:
      | description             | method | endpoint                          | status_code | action_result       |
      | Get user preferences    | GET    | /api/account/preferences          | 200         | "preferences retrieved" |
      | Get user resume         | GET    | /api/account/resume               | 200         | "resume retrieved"      |
      | Delete user resume      | DELETE | /api/account/resume               | 204         | "successfully deleted"  |
      | Clear user preferences  | DELETE | /api/account/preferences          | 204         | "successfully cleared"  |

  #------------------------------------------------------------------------------------#
  # UI Test Scenarios
  # These scenarios simulate user journeys through the web interface.
  #------------------------------------------------------------------------------------#

  @ui @preferences
  Scenario: A new anonymous user can complete the entire guided questionnaire
    Given I am a new visitor on the home page with a clean session
    When I start the guided questionnaire
    And I select "Fully Remote" for working arrangement
    And I select "Career Progression" for motivation
    And I enter "95000" as the target annual salary
    And I select "United States" for location
    And I enter "Product Manager" as a job title
    And I select "5-7 years" for years of experience
    And I select "Bachelor's Degree" for highest level of education
    And I click the "Find Jobs" button
    Then I should be redirected to the job results page
    And I should see job listings filtered by my preferences
    And I should not be prompted to create an account

  @ui @preferences
  Scenario: A new user can skip some questions and still get job matches
    Given I am a new visitor on the home page
    When I start the guided questionnaire
    And I enter "Data Analyst" as a job title
    And I select "Canada" for location
    And I skip the "target annual salary" question
    And I skip the "highest level of education" question
    And I click the "Find Jobs" button
    Then I should be on the job results page
    And the results should be filtered by "Data Analyst" and "Canada"
    And the "salary" and "education" filters should not be active

  @ui @preferences
  Scenario Outline: A user can add job titles up to but not exceeding the maximum limit
    Given I am on the job titles step of the questionnaire
    And I have already added 4 job titles
    When I add the job title "<fifth_title>"
    And I attempt to add the job title "<sixth_title>"
    Then I should see 5 job titles listed
    And I should see a message stating "Maximum limit of 5 titles has been reached"
    And the input for adding a new title should be disabled

    Examples:
      | fifth_title     | sixth_title      |
      | "Product Owner" | "Data Scientist" |

  @ui @resume
  Scenario Outline: A user attempts to upload a resume with various file types and sizes
    Given I am on the resume upload step of the questionnaire
    When I attempt to upload a file named "<file_name>" with size "<size>" and type "<type>"
    Then I should see the message "<message>"

    Examples:
      | file_name              | size    | type      | message                                                              |
      | my_resume.pdf          | "1MB"   | "PDF"     | "my_resume.pdf uploaded successfully"                                |
      | resume_max_size.docx   | "5MB"   | "DOCX"    | "resume_max_size.docx uploaded successfully"                         |
      | large_resume.pdf       | "5.1MB" | "PDF"     | "File is too large. Please ensure it is under 5MB."                  |
      | profile_image.png      | "2MB"   | "PNG"     | "Invalid file format. Please use PDF, DOC, or DOCX."                 |

  @ui @matching
  Scenario Outline: Job results are correctly filtered based on a single key preference
    Given I am a new visitor on the home page
    When I complete the questionnaire with the preference "<preference_type>" set to "<preference_value>"
    And I submit the questionnaire
    Then I should be on the job results page
    And the active filter for "<preference_type>" should be set to "<preference_value>"
    And all displayed jobs should match the "<preference_type>" of "<preference_value>"

    Examples:
      | preference_type      | preference_value      |
      | "Working Arrangement"| "fully remote"        |
      | "Target Salary"      | "$90,000"             |
      | "Experience Level"   | "8+ years"            |
      | "Education Level"    | "PhD"                 |

  @ui @matching
  Scenario: A user can widen a preference on the results page to see more jobs
    Given I have completed the questionnaire with a target salary of "$120,000"
    And I am on the job results page viewing "45" results
    When I change the "Salary" filter to "$100,000"
    Then the job results should update automatically
    And the number of results should be greater than "45"

  @ui @matching
  Scenario: The system indicates which preference is narrowing a search with very few results
    Given I have completed the questionnaire with Job Title "Lead Lunar Geologist" and Location "Antarctica"
    And I am on the job results page viewing "1" result
    Then I should see a message suggesting I widen my "Location" or "Job Title" preference

  @ui @account @e2e
  Scenario: A user's anonymous preferences and resume are carried over upon registration
    Given I am a new visitor on the home page
    When I complete the questionnaire with Job Category "Engineering"
    And I upload a resume named "my_cv.pdf"
    And I view the matched job results
    And I click the "Apply" button on the first job listing
    Then I should be prompted to register for an account
    When I complete the registration for a new account
    And I navigate to the "My Preferences" page
    Then the Job Category should be set to "Engineering"
    When I navigate to the "My Documents" page
    Then I should see the resume "my_cv.pdf" listed

  @ui @data
  Scenario: A registered user's data persists across sessions
    Given I am a registered user with a saved salary preference of "$110,000"
    And I have a resume named "persistent_resume.pdf" on my profile
    When I log out and log back in
    And I navigate to the "My Preferences" page
    Then my salary preference should still be "$110,000"
    When I navigate to the "My Documents" page
    Then my resume "persistent_resume.pdf" should still be present

  @ui @data
  Scenario Outline: A registered user can manage their personal data
    Given I am a logged-in registered user
    When I navigate to the "<page>" page
    And I click the "<action_button>" button
    And I confirm the action in the dialog
    Then I should see a confirmation message that "<data_item>" was removed
    And the "<data_item>" should no longer be visible on my profile

    Examples:
      | page             | action_button      | data_item      |
      | "Manage Resume"  | "Delete Resume"    | "my resume"    |
      | "My Preferences" | "Clear All"        | "my preferences" |
