@job-seeker @preferences @matching
Feature: Job Seeker Preference and Matching

  As a job seeker, I want to provide my job preferences, get personalized job matches, and manage my profile seamlessly, both as an anonymous visitor and as a registered user.

  # API Test Scenarios
  # These scenarios test the backend logic for submitting preferences, uploading resumes, and fetching job matches directly.

  @api
  Background: API Configuration
    Given the API base URL is "https://api.jobplatform.com/v1"
    And the request header "Content-Type" is "application/json"

  @api @preferences
  Scenario Outline: API - Submit job preferences for an anonymous session
    Given I have an anonymous session token
    When I send a POST request to "/preferences" with the payload:
      """
      {
        "workingArrangement": "<workingArrangement>",
        "targetAnnualSalary": <targetAnnualSalary>,
        "jobTitles": <jobTitles>,
        "location": "<location>",
        "motivation": "<motivation>"
      }
      """
    Then the response status should be <status>
    And the response body should contain a "sessionId"
    And the response body should confirm the saved preferences

    Examples:
      | workingArrangement | targetAnnualSalary | jobTitles                                | location        | motivation          | status |
      | "Fully Remote"     | 85000              | ["Product Manager", "Project Coordinator"] | "United States" | "income"            | 201    |
      | "Hybrid"           | null               | ["Business Analyst"]                     | null            | "career progression" | 201    |
      | "No Preference"    | 120000             | []                                       | "Canada"        | "flexibility"       | 201    |

  @api @resume
  Scenario Outline: API - Upload a resume and handle validation
    Given I have an anonymous session token
    When I send a POST request to "/resume/upload" with a file "<fileName>" of size <fileSizeMB>MB and type "<fileType>"
    Then the response status should be <status>
    And the response message should be "<message>"

    Examples:
      | fileName              | fileSizeMB | fileType      | status | message                                      |
      | "resume.pdf"          | 2          | "application/pdf" | 200    | "Success! Your resume has been uploaded."    |
      | "resume.docx"         | 1          | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | 200    | "Success! Your resume has been uploaded."    |
      | "large_portfolio.pdf" | 7          | "application/pdf" | 413    | "Upload failed: File size exceeds the 5MB limit." |
      | "archive.zip"         | 1          | "application/zip" | 415    | "Upload failed: Unsupported file type."      |
      | "exact_5MB_resume.pdf" | 5          | "application/pdf" | 200    | "Success! Your resume has been uploaded."    |
      | "limit_plus_1B.pdf"   | 5.000001   | "application/pdf" | 413    | "Upload failed: File size exceeds the 5MB limit." |

  @api @matching
  Scenario Outline: API - Get personalized job matches based on preferences
    Given I have an anonymous session with preferences for "<workingArrangement>" and salary "> <targetAnnualSalary>"
    When I send a GET request to "/jobs/search"
    Then the response status should be 200
    And the response should be a list of jobs
    And each job in the response should match the "<workingArrangement>" preference
    And each job in the response should have a salary greater than or equal to <targetAnnualSalary>

    Examples:
      | workingArrangement | targetAnnualSalary |
      | "Fully Remote"     | 120000             |
      | "Hybrid"           | 95000              |
      | "No Preference"    | 0                  |

  # UI Test Scenarios
  # These scenarios test the end-to-end user experience from the perspective of a job seeker interacting with the website.

  @ui @questionnaire @happy-path @e2e
  Scenario: A new anonymous user can complete the entire questionnaire and see personalized results
    Given I am a new visitor on the home page
    When I start the guided questionnaire
    And I select "Fully Remote" for working arrangement and proceed
    And I enter "85000" for target annual salary and proceed
    And I enter "Product Manager" and "Project Coordinator" as job titles and proceed
    And I select "United States" for location and proceed
    And I complete the remaining steps of the questionnaire
    And I submit my preferences
    Then I should be redirected to the job results page
    And the results should be filtered by my preferences
    And I should not be prompted to register or log in

  @ui @questionjecture @negative
  Scenario Outline: Validate user input in the questionnaire
    Given I am on the "<field>" step of the questionnaire
    When I enter "<invalid_input>" into the "<field_name>" field
    And I try to proceed to the next step
    Then I should see the error message "<error_message>"
    And I should remain on the "<field>" step

    Examples:
      | field        | field_name           | invalid_input         | error_message                       |
      | Salary       | target annual salary | "one hundred thousand" | "Please enter a valid number."      |
      | Salary       | target annual salary | "-5000"                | "Salary must be a positive number." |
      | Job Titles   | job titles           | "Title 6"              | "You have reached the maximum of 5 job titles." |

  @ui @resume @boundary
  Scenario Outline: Upload a resume with various file sizes
    Given I am on the resume upload step of the questionnaire
    When I attempt to upload a resume file of size <fileSizeMB>MB
    Then I should see the message "<expected_message>"
    And the UI should reflect the <upload_status>

    Examples:
      | fileSizeMB | expected_message                                      | upload_status        |
      | 2          | "Success! Your resume has been uploaded."             | success              |
      | 5          | "Success! Your resume has been uploaded."             | success              |
      | 5.1        | "Upload failed: File size exceeds the 5MB limit."     | failure              |
      | 7          | "Upload failed: File size exceeds the 5MB limit."     | failure              |

  @ui @matching @filtering
  Scenario Outline: Job results are correctly filtered by a single preference
    Given I am a new visitor on the home page
    When I start the questionnaire and set "<preference_type>" to "<preference_value>"
    And I skip all other preferences
    And I submit my preferences
    Then I should be on the job results page
    And the active filter for "<preference_type>" should be "<preference_value>"
    And all displayed jobs should match the "<preference_type>" of "<preference_value>"

    Examples:
      | preference_type           | preference_value      |
      | Working Arrangement       | Hybrid                |
      | Category or Field         | Healthcare            |
      | Years of Relevant Experience | 2                     |
      | Highest Level of Education | Bachelor's Degree     |

  @ui @matching @feedback
  Scenario: System provides feedback when a combination of preferences returns very few results
    Given the job database has few "Marketing" jobs with a salary of "$400,000"
    And I am a new visitor on the home page
    When I complete the questionnaire with "Marketing" as the category and "400000" as the salary
    And I submit my preferences
    Then I should see a small number of job listings
    And I should see a message indicating that "annual salary" is narrowing my results

  @ui @matching @negative
  Scenario: System handles a combination of preferences that returns zero results gracefully
    Given I am a new visitor on the home page
    When I complete the questionnaire with job title "Space Elevator Operator" and location "Kansas, USA"
    And I submit my preferences
    Then I should not see a system error
    And I should see a user-friendly message stating "No jobs found matching your criteria."

  @ui @refine-search
  Scenario Outline: A seeker can refine, widen, or clear preferences on the results page
    Given I have submitted preferences and am on the job results page with active filters
    When I <action> the "<preference_type>" filter
    Then the job results should update without a full page reload
    And the total number of results should <change>

    Examples:
      | action                                | preference_type       | change         |
      | clear                                 | Annual Salary         | increase       |
      | widen by adding "Hybrid"              | Working Arrangement   | increase       |
      | narrow by changing value to "10+ years" | Experience Level      | decrease       |

  @ui @state-transition @e2e @smoke
  Scenario: Anonymous user preferences and resume are carried over upon registration
    Given I am a new visitor on the home page
    When I complete the questionnaire with "Fully Remote" arrangement and salary "$123,456"
    And I upload a resume named "my_cv.pdf"
    And I view the matched job results
    And I click the "Save Job" button on a listing
    And I complete the registration for a new account
    Then I should be logged in
    And when I navigate to my account preferences
    Then my saved working arrangement should be "Fully Remote"
    And my saved salary should be "$123,456"
    And my saved resume should be "my_cv.pdf"

  @ui @account-management
  Scenario: A registered user can edit their preferences without re-taking the questionnaire
    Given I am logged in as a registered user with a saved salary of "$80,000"
    When I navigate to my account preferences page
    And I change my target annual salary to "$95,000"
    And I save the changes
    Then I should see a success message "Your preferences have been updated"
    And my target annual salary should be displayed as "$95,000"

  @ui @account-management @data-privacy
  Scenario Outline: A registered user can remove their personal data
    Given I am logged in as a registered user with saved <data_type>
    When I navigate to my account settings
    And I choose to remove my <data_type>
    And I confirm the action
    Then I should see a confirmation that my <data_type> has been removed
    And my account should no longer have any saved <data_type>

    Examples:
      | data_type       |
      | resume          |
      | job preferences |
