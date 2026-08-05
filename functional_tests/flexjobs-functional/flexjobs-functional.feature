Feature: Job Seeker Onboarding and Preference Management
  As a job seeker, I want to provide my preferences, find relevant jobs, and manage my profile,
  both as an anonymous visitor and as a registered user, to have a seamless and personalized job search experience.

  Background:
    Given the API base URL is "https://api.jobplatform.com"
    And the "Content-Type" header is "application/json"

# --- API Test Scenarios ---
# These scenarios test the backend logic for preference submission, resume handling, and job matching directly.

  @api @onboarding
  Scenario Outline: API - Submit job preferences for an anonymous session
    Given I have a new anonymous session token
    When I send a POST request to "/api/v1/preferences" with the payload:
      """
      <payload>
      """
    Then the response status should be <status_code>
    And the response body should contain "<message>"

    Examples:
      | description                               | payload                                                                                                                                                                                          | status_code | message                               |
      | Full valid preferences                  | {"working_arrangement": "fully_remote", "motivation": "income", "target_salary": 95000, "location": "United States", "job_titles": ["Senior QA Lead"], "experience_years": 7}                         | 200         | Preferences saved successfully        |
      | Partial valid preferences               | {"working_arrangement": "hybrid", "job_titles": ["Project Manager"], "category": "Technology", "target_salary": null, "experience_years": null}                                                      | 200         | Preferences saved successfully        |
      | Minimal valid preference (work)         | {"working_arrangement": "fully_remote"}                                                                                                                                                              | 200         | Preferences saved successfully        |
      | Minimal valid preference (salary)       | {"target_salary": 120000}                                                                                                                                                                            | 200         | Preferences saved successfully        |
      | Boundary - Max job titles (5)           | {"job_titles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]}                                                                                                                              | 200         | Preferences saved successfully        |
      | Negative - Too many job titles (6)      | {"job_titles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5", "Title 6"]}                                                                                                                    | 400         | "Maximum of 5 job titles allowed"     |
      | Negative - Invalid salary type          | {"target_salary": "Eighty Thousand"}                                                                                                                                                                 | 400         | "target_salary must be a number"      |
      | Negative - Invalid experience type      | {"experience_years": "ten"}                                                                                                                                                                          | 400         | "experience_years must be a number"   |

  @api @resume
  Scenario Outline: API - Upload a resume for an anonymous session
    Given I have a new anonymous session token
    When I send a POST request to "/api/v1/resume/upload" with a multipart file "<file_name>" of size <file_size_kb> and type "<file_type>"
    Then the response status should be <status_code>
    And the response body should contain "<message>"

    Examples:
      | description                       | file_name                 | file_size_kb | file_type      | status_code | message                   |
      | Valid PDF below limit             | test_resume.pdf           | 1024         | "application/pdf"  | 201         | "File uploaded successfully"  |
      | Valid DOCX below limit            | test_resume.docx          | 2048         | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | 201         | "File uploaded successfully"  |
      | Boundary - At size limit (5MB)    | resume_max_size.pdf       | 5120         | "application/pdf"  | 201         | "File uploaded successfully"  |
      | Boundary - Over size limit (5MB+1KB) | resume_too_large.pdf      | 5121         | "application/pdf"  | 413         | "File size exceeds the 5 MB limit" |
      | Negative - Unsupported format (PNG) | profile_image.png         | 500          | "image/png"        | 415         | "Unsupported file format"     |
      | Negative - Unsupported format (ZIP) | my_files.zip              | 1500         | "application/zip"  | 415         | "Unsupported file format"     |

  @api @registration
  Scenario: API - Registering an account persists anonymous session preferences and resume
    Given I have a new anonymous session token
    And I have successfully submitted preferences and uploaded a resume with that token
    When I send a POST request to "/api/v1/register" with the anonymous session token and user details
    Then the response status should be 201
    And the response contains a new authentication token
    When I use the new token to send a GET request to "/api/v1/users/me/profile"
    Then the response status should be 200
    And the response body should contain the preferences submitted in the anonymous session
    And the response body should contain a link to the resume uploaded in the anonymous session

  @api @management
  Scenario Outline: API - A registered user manages their preferences
    Given I am authenticated as a registered user with existing preferences
    When I send a <method> request to "<endpoint>" with the payload:
      """
      <payload>
      """
    Then the response status should be <status_code>
    And a subsequent GET request to "/api/v1/users/me/preferences" should reflect the change

    Examples:
      | description                     | method | endpoint                        | payload                                       | status_code |
      | Update a single preference      | PUT    | /api/v1/users/me/preferences    | {"target_salary": 150000}                     | 200         |
      | Add a previously null preference | PUT    | /api/v1/users/me/preferences    | {"experience_years": 10}                      | 200         |
      | Clear a single preference       | PUT    | /api/v1/users/me/preferences    | {"job_titles": null}                          | 200         |
      | Clear all preferences         | DELETE | /api/v1/users/me/preferences    | {}                                            | 204         |
      | Remove resume                   | DELETE | /api/v1/users/me/resume         | {}                                            | 204         |

# --- UI Test Scenarios ---
# These scenarios test the end-to-end user flows from the job seeker's perspective.

  @ui @onboarding @happy_path
  Scenario: A new anonymous user can complete the questionnaire and see personalized job results
    Given I am a new visitor on the home page
    When I select "Fully remote" for working arrangement
    And I enter "95000" as the target annual salary
    And I select "United States" as the location
    And I enter "Senior QA Lead" as the job title
    And I enter "7" for years of experience
    And I click the "See Jobs" button
    Then I should be on the job results page
    And I should see job listings relevant to a "Senior QA Lead"
    And the active filters should show "Fully remote" and "United States"
    And I should not be prompted to register or pay

  @ui @onboarding
  Scenario: A user can partially complete the questionnaire and see results
    Given I am a new visitor on the home page
    When I select "Hybrid" for working arrangement
    And I enter "Project Manager" as the job title
    And I skip the "annual salary" and "years of relevant experience" fields
    And I click the "See Jobs" button
    Then I should be on the job results page
    And I should see job listings for "Project Manager" roles
    And the active filter for working arrangement should be "Hybrid"
    When I navigate to the "My Preferences" page
    Then the "annual salary" preference should be empty
    And the "years of relevant experience" preference should be empty

  @ui @onboarding @negative
  Scenario Outline: The questionnaire validates numeric inputs for salary and experience
    Given I am a new visitor on the home page
    When I enter "<input_value>" in the "<field_name>" field
    And I click the "See Jobs" button
    Then I should see a validation error message "<error_message>" for the "<field_name>" field
    And I should remain on the questionnaire page

    Examples:
      | field_name                  | input_value       | error_message                         |
      | annual salary               | "Eighty Thousand" | "Please enter a valid number."        |
      | annual salary               | "$90,000!"        | "Please enter a valid number."        |
      | years of relevant experience | "ten"             | "Please enter a number for years of experience." |
      | years of relevant experience | ">5"              | "Please enter a number for years of experience." |

  @ui @onboarding @boundary
  Scenario: The questionnaire enforces a maximum limit for job titles
    Given I am a new visitor on the home page
    When I add 5 job titles: "Software Developer", "Backend Engineer", "Cloud Engineer", "DevOps Specialist", "Site Reliability Engineer"
    Then the input for adding a new job title should be disabled or hidden
    And I should see a message "You have reached the maximum of 5 job titles."
    When I click the "See Jobs" button
    Then I should be on the job results page
    And the active filters should display all 5 job titles

  @ui @resume
  Scenario Outline: A user attempts to upload a resume with various file types and sizes
    Given I am a new visitor on the questionnaire page
    When I attempt to upload a file named "<file_name>"
    Then I should see the message "<feedback_message>"
    And the UI should reflect the <upload_status>

    Examples:
      | description                       | file_name                 | feedback_message                                                       | upload_status         |
      | Valid PDF below limit             | "valid_resume.pdf"        | "valid_resume.pdf has been uploaded successfully"                      | "upload succeeded"    |
      | Boundary - At size limit (5MB)    | "max_size_resume.pdf"     | "max_size_resume.pdf has been uploaded successfully"                   | "upload succeeded"    |
      | Negative - Unsupported format     | "profile_image.png"       | "Unsupported file format. Please upload a PDF, DOCX, or TXT file."     | "upload failed"       |
      | Negative - Exceeds size limit     | "oversized_portfolio.pdf" | "File size exceeds the 5 MB limit."                                    | "upload failed"       |
      | Boundary - Just over size limit   | "slightly_large.pdf"      | "File size exceeds the 5 MB limit."                                    | "upload failed"       |

  @ui @matching
  Scenario: Job preferences persist throughout an anonymous user's session
    Given I have completed the questionnaire with "hybrid" work preference
    And I am on the job results page
    When I navigate to the "Engineering" category page
    Then the "hybrid" work preference should still be an active filter
    When I use the global search bar to search for "Manager"
    Then the search results should be filtered for "hybrid" "Manager" roles

  @ui @matching
  Scenario: A user can widen a preference on the results page to see more jobs
    Given I have completed the questionnaire with a target salary of "$120,000"
    And I see "15" job results
    When I change the "Salary" filter on the results page to "$100,000"
    Then the job list should update without a full page reload
    And I should see more than "15" job results

  @ui @matching
  Scenario: The system suggests which preference is narrowing the search results
    Given I have completed the questionnaire with a highly restrictive search
    And I am on the job results page seeing "2" jobs
    Then I should see a message suggesting I widen my search for 'Principal Blockchain Architect' or change the location

  @ui @registration @e2e
  Scenario: An anonymous user's data is persisted after registering an account
    Given I am a new visitor on the home page
    When I complete the questionnaire with salary "$115,000", location "Canada", and title "Product Manager"
    And I upload a resume named "my_cv.pdf"
    And I am on the job results page
    And I click the "Save Job" button on a listing
    Then I should be prompted to register an account
    When I complete the registration for a new account and log in
    And I navigate to my profile page
    Then my saved salary preference should be "$115,000"
    And my saved location preference should be "Canada"
    And my saved job title preference should be "Product Manager"
    And I should see "my_cv.pdf" listed in my documents

  @ui @management
  Scenario: A registered user can edit their preferences without repeating the questionnaire
    Given I am logged in as a registered user with a saved salary of "$100,000"
    When I navigate to the "Account Settings" page
    And I change my target salary to "135000"
    And I save my preferences
    Then I should see a confirmation message "Your preferences have been updated"
    And my profile should display the new target salary of "135000"
    When I navigate to the job search page
    Then the job results should be filtered by the new salary

  @ui @management @delete
  Scenario: A registered user can clear all their preferences and remove their resume
    Given I am logged in as a registered user with saved preferences and an uploaded resume
    When I navigate to the "Account Settings" page
    And I click the "Clear All Preferences" button and confirm
    Then I should see a message that my preferences have been cleared
    And all preference fields should be empty
    When I navigate to the "My Documents" page
    And I click the "Delete" button for my resume and confirm
    Then I should see a message that my resume has been removed
    And no documents should be listed
