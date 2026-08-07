@job-seeker-onboarding
Feature: Job Seeker Onboarding and Profile Management
  As a job seeker, I want to provide my job preferences and resume, receive personalized job matches, and manage my data, so that I can efficiently find relevant job opportunities.

  Background:
    Given the application is available and running

  #----------------------------------------------------#
  # Section 1: Seeker Preference Capture (Anonymous)   #
  #----------------------------------------------------#

  @preferences @ui @anonymous @p0
  Scenario: TC-PREF-01 - First-time anonymous user is presented with the guided questionnaire
    Given I am a new anonymous user visiting the site
    When I navigate to the home page
    Then I should be presented with the "guided questionnaire"
    And I should not be prompted to log in, register, or pay

  @preferences @ui @anonymous @p0
  Scenario Outline: TC-PREF-02, TC-PREF-03 - Anonymous user completes the questionnaire with various inputs
    Given I am a new anonymous user on the guided questionnaire
    When I enter my working arrangement as "<working_arrangement>"
    And I enter my target annual salary as "<salary>"
    And I enter my job title as "<job_title>"
    And I select my years of experience as "<experience>"
    And I submit the questionnaire
    Then I should be redirected to the job matching results page
    And my preferences should be correctly applied to the search results

    Examples: Happy Path and Partial Submission
      | working_arrangement | salary   | job_title                 | experience  |
      | fully remote        | 120000   | Senior Software Engineer  | 8+ years    |
      | hybrid              |          | Marketing Coordinator     |             |
      | no preference       | 75000    |                           | 2-5 years   |

  @preferences @api @anonymous @p0
  Scenario Outline: TC-PREF-03 - API correctly records partially completed preferences
    Given I am an anonymous user with a valid session token
    When I send a POST request to "/api/v1/preferences" with the following payload
      """
      <payload>
      """
    Then the response status should be 200
    And the response body should confirm that the provided preferences were saved
    And the response body should indicate that the unanswered preferences are stored as null

    Examples: API Payload for Partial Submission
      | payload                                                                                             |
      | {"workingArrangement": "hybrid", "jobTitles": ["Marketing Coordinator"], "annualSalary": null, "experience": null} |
      | {"workingArrangement": null, "jobTitles": [], "annualSalary": 80000, "experience": "5+ years"}      |

  @preferences @ui @anonymous @p1
  Scenario: TC-PREF-04 - Anonymous user can revisit and change a submitted preference
    Given I have completed the questionnaire with "fully remote" as the working arrangement
    And I am on the job results page
    When I use the 'Edit Preferences' feature to change my working arrangement to "hybrid"
    And I save the change
    Then the job results page should refresh and display jobs matching the "hybrid" preference

  @preferences @ui @anonymous @p1
  Scenario Outline: TC-PREF-05, TC-PREF-06 - User enters job titles up to the defined maximum limit of 5
    Given I am on the job title step of the questionnaire where the limit is 5
    When I enter <number_of_titles> job titles
    And I attempt to add a sixth job title
    Then the UI should <outcome>
    And I should <submission_status> the questionnaire

    Examples: Boundary testing for job titles
      | number_of_titles | outcome                                                              | submission_status |
      | 5                | accept all 5 titles and disable the input field for adding more      | be able to submit   |
      | 5                | prevent the sixth title from being added and show an error message   | be able to submit   |

  #----------------------------------------------------#
  # Section 2: Resume Handling (Anonymous)             #
  #----------------------------------------------------#

  @resume @ui @anonymous @p0
  Scenario Outline: TC-RESUME-01, TC-RESUME-03, TC-RESUME-04, TC-RESUME-05 - Uploading a resume with various file types and sizes
    Given I am on the resume upload step of the questionnaire
    When I attempt to upload a file named "<file_name>" of type "<file_type>" and size "<file_size_mb>" MB
    Then I should see a message indicating "<expected_outcome>"
    And the UI should reflect the upload status

    Examples: Positive, Negative, and Boundary Tests for Resume Upload
      | file_name              | file_type | file_size_mb | expected_outcome                                                     |
      | test_resume.docx       | docx      | 2            | Success! Your resume has been uploaded.                              |
      | my_cv.pdf              | pdf       | 5            | Success! Your resume has been uploaded.                              |
      | screenshot.png         | png       | 1            | Unsupported file type. Please upload your resume as a PDF or DOCX.   |
      | large_portfolio.pdf    | pdf       | 12           | File is too large. Please upload a file smaller than 10MB.           |
      | exact_limit_resume.docx| docx      | 10           | Success! Your resume has been uploaded.                              |

  @resume @api @anonymous @p0
  Scenario Outline: API validation for resume uploads
    Given I am an anonymous user with a valid session token
    When I send a POST request to "/api/v1/resume/upload" with a file of type "<file_type>" and size "<file_size_mb>" MB
    Then the response status should be <status_code>
    And the response body should contain a message like "<response_message>"

    Examples: API Response Validation
      | file_type | file_size_mb | status_code | response_message                               |
      | docx      | 2            | 200         | File uploaded successfully                   |
      | png       | 1            | 400         | Unsupported file type                        |
      | pdf       | 12           | 413         | File size exceeds the 10MB limit             |
      | docx      | 10           | 200         | File uploaded successfully                   |

  @resume @ui @anonymous @p1
  Scenario Outline: TC-RESUME-06 - User selects their current resume state
    Given I am on the resume handling step of the questionnaire
    When I select the resume state as "<state>"
    And I proceed to the next step
    And I navigate back to the resume step
    Then the "<state>" option should still be selected

    Examples: Resume State Options
      | state             |
      | up to date        |
      | needs work        |
      | not written yet   |

  #----------------------------------------------------#
  # Section 3: Job Matching and Results                #
  #----------------------------------------------------#

  @matching @ui @anonymous @p0
  Scenario: TC-MATCH-01 - Personalized job listings are produced based on captured preferences
    Given I have completed the questionnaire with working arrangement "fully remote", salary "120000", and category "Software Engineering"
    When I am taken to the job results page
    Then all displayed job listings should match the "fully remote" working arrangement
    And all displayed job listings should have a salary of "$120,000" or greater
    And all displayed job listings should be in the "Software Engineering" category

  @matching @ui @anonymous @p1
  Scenario Outline: TC-MATCH-02, TC-MATCH-03 - User can widen or narrow search results by modifying a preference
    Given I am on the job results page with filters for "<initial_filter_type>" as "<initial_filter_value>"
    When I change the "<filter_to_change>" filter to "<new_filter_value>"
    Then the job results list should update automatically
    And the total number of results should <result_count_change>

    Examples: Modifying Filters
      | initial_filter_type | initial_filter_value | filter_to_change | new_filter_value | result_count_change |
      | Location            | United States        | Location         | (cleared)        | increase            |
      | Experience          | Any                  | Experience       | 10+ years        | decrease            |

  @matching @ui @anonymous @p1
  Scenario: TC-MATCH-04 - System indicates which constraint is narrowing the search results
    Given I have submitted preferences with a common category "Sales" and a very niche benefit "On-site Pet Care"
    When I view the job results page with very few listings
    Then a message should be displayed next to the "On-site Pet Care" filter
    And the message should suggest that this filter is the primary reason for the limited results

  @matching @ui @anonymous @p1
  Scenario: TC-MATCH-05 - Captured preferences are automatically applied to subsequent searches during the visit
    Given I have completed the questionnaire with working arrangement "hybrid"
    And I have viewed the initial job results
    When I navigate back to the home page and perform a new keyword search for "Manager"
    Then the new search results page should have the "hybrid" filter automatically applied
    And the displayed jobs should be for "Manager" roles with a "hybrid" working arrangement

  #----------------------------------------------------#
  # Section 4 & 5: Account Conversion and Data Handling #
  #----------------------------------------------------#

  @account @e2e @ui @anonymous @p0
  Scenario: TC-CONV-01, TC-DATA-02 - Anonymous user's preferences and resume are carried over upon registration
    Given I am a new anonymous user on the home page
    When I complete the questionnaire with Location "Canada" and Salary "95000"
    And I upload a resume named "resume_john_doe.pdf"
    And I proceed to the job results page
    And I click 'Save Job' on a listing, which prompts me to register
    And I complete the registration for a new account
    And I log in and navigate to my account profile page
    Then my saved preferences should show Location "Canada" and Salary "95000"
    And my saved documents should include "resume_john_doe.pdf"

  @account @ui @anonymous @p0
  Scenario Outline: Registration is prompted for account-required actions
    Given I am an anonymous user who has completed the questionnaire
    And I am on the job results page
    When I click the "<action>" button on a job listing
    Then I should be presented with a registration or login form
    And I should be prevented from completing the action until I register or log in

    Examples: Gated Actions
      | action         |
      | Apply          |
      | Save Job       |
      | Set up alerts  |

  @account @ui @anonymous @p0
  Scenario: TC-CONV-04 - Anonymous user can browse and get matches without registration
    Given I am a new anonymous user
    When I navigate to the home page
    And I complete the guided questionnaire
    And I view the personalized job results
    Then at no point should I be required to create an account or provide payment

  @data_management @ui @registered @p1
  Scenario Outline: TC-REMOVE-01, TC-REMOVE-02 - Registered user can remove their data
    Given I am a registered user logged into my account
    And I have existing <data_type> saved to my profile
    When I navigate to my account settings page
    And I use the function to remove my <data_type>
    And I confirm the action
    Then my <data_type> should be successfully removed from my account
    And the change should persist across login sessions

    Examples: Data Removal
      | data_type   |
      | resume      |
      | preferences |

  @data_management @e2e @ui @registered @p2
  Scenario: TC-REMOVE-03 - Clearing preferences correctly updates subsequent job searches
    Given I am a registered user with a restrictive saved preference for Location "Antarctica"
    And I am on the job search page viewing only "Antarctica" results
    When I navigate to my settings and clear all my preferences
    And I return to the job search page
    Then the search results should no longer be filtered by Location "Antarctica"
    And the results should show a broad, unfiltered list of jobs from all locations
