Feature: Mortgage Application Management and Regulatory Compliance

  Background:
    Given the application is in 'In Setup' status
    And the main purpose is set to 'Housing'
    And the user is logged in as a 'Banker'

  # UI Test Scenarios
  @ui @regulatory
  Scenario Outline: Dynamic Guarantor Classification based on Law NBOT 329
    Given I am on the 'Participant Details' tab
    When I add a new participant with Role 'Guarantor'
    And I set ID Type to '<id_type>'
    And I set Family Relationship to '<relationship>'
    And I set the Requested Amount to '<amount_offset>' relative to the threshold
    Then the Guarantor Type (L026.1) should be updated to '<expected_classification>'

    Examples:
      | id_type  | relationship      | amount_offset | expected_classification |
      | Company  | N/A               | N/A           | Other Guarantor         |
      | Identity | Cohabiting Spouse | N/A           | Other Guarantor         |
      | Identity | Brother           | -100          | Protected Guarantor     |
      | Identity | Brother           | +100          | Single Guarantor        |

  @ui @boundary
  Scenario Outline: Asset Value Calculation for Regulated Price Purchases
    Given the application sub-purpose is 'Regulated Price'
    And I am on the 'Asset and Transaction Details' tab
    When I enter a Contract Value (A03) of <contract_val>
    And I enter an Appraisal Value (A07) of <appraisal_val>
    Then the Calculated Asset Value (A02) should be <expected_a02>

    Examples:
      | contract_val | appraisal_val | expected_a02 |
      | 1500000      | 2000000       | 1800000      |
      | 1900000      | 2000000       | 1900000      |

  @ui @workflow
  Scenario: Workflow Gating and Consent Enforcement
    Given I create a new application for 'Purchase' -> 'Contractor'
    And I am on the 'Participant Details' tab
    When I enter participant ID details
    And I attempt to click 'Import Data' without checking 'Approval for data import'
    Then the 'Import Data' button should be disabled
    When I check the consent box and click 'Import Data'
    Then the data should be successfully pulled from Core Systems
    And I should be blocked from navigating to 'Financial Data' until Asset fields are filled

  @ui @functional
  Scenario: Disposable Income (IF007) Calculation Accuracy
    Given I am on the 'Financial Data' tab
    And the application has two Borrowers and one Paying Guarantor
    When I enter the following financial data:
      | Field             | Entity     | Amount |
      | Individual Income | Borrower 1 | 5000   |
      | Individual Income | Borrower 2 | 5000   |
      | Joint Income      | Both       | 2000   |
      | Existing Mortgage | Asset      | 3000   |
      | Guarantor Income  | Guarantor  | 4000   |
      | Guarantor Expense | Guarantor  | 1000   |
      | Other Bank Loan   | Borrower 1 | 500    |
    And I click 'Save'
    Then the Total Disposable Income (IF007) should be 11500

  @ui @regulatory
  Scenario Outline: Alert Management and Submission Overrides
    Given the application status is 'Ready for Submission'
    When a '<alert_type>' alert is triggered
    And I attempt to send the application for approval
    Then I should see a '<response_message>'
    And the application status should be '<final_status>'

    Examples:
      | alert_type | response_message   | final_status        |
      | Blocking   | Submission Blocked | Ready for Submission|
      | Inquiry    | Alert Justification| Sent for Approval   |

  @ui @functional
  Scenario: Impact of Purpose Modification on Data Integrity
    Given I am on the 'Application Setup' screen
    And Asset data 'A03' and 'A07' are populated for 'Purchase'
    When I change the Main Purpose to 'Self-Construction'
    And I confirm the data removal warning
    Then the field 'A03' should be cleared in the 'Asset and Transaction Details' tab
    When I enter Land Value (A08) as 1000000 and Construction Costs (A12) as 500000
    Then the Calculated Asset Value (A02) should be 1500000

  @ui @regulatory
  Scenario: Duplicate Application Detection
    Given an active application exists for Borrower ID '123456789'
    And I am on the 'Participant Details' tab of a new application
    When I enter ID '123456789' and click 'Import Data'
    Then I should see a 'Duplicate Application Detected' warning
    And navigation to the 'Asset Details' tab should be blocked

  @ui @boundary
  Scenario Outline: Asset Value Fallback Logic for Self-Construction
    Given the application purpose is 'Self-Construction'
    And I am on the 'Asset and Transaction Details' tab
    When I enter Land Value '<land>' and Construction Costs '<construction>' and Estimated Value '<estimated>'
    Then the Calculated Asset Value (A02) should be '<expected>'

    Examples:
      | land    | construction | estimated | expected |
      |         |              | 2000000   | 2000000  |
      | 1000000 | 1500000      | 2000000   | 2500000  |
      | 1000000 |              | 2000000   | 1000000  |

  @ui @functional
  Scenario: Joint Account Data Import Logic
    Given two borrowers match a joint account in core systems
    When I click 'Import Data' for the joint account row in 'Participant Details'
    Then the 'Contact Information' in 'Asset Details' should be overwritten and 'View Only'
    And the 'Contact Person' field should be empty and require manual selection

  @ui @functional
  Scenario: Dynamic Tab Completion Indication
    Given I am on the 'Participant Details' tab
    When I fill all mandatory fields and click 'Save'
    Then a completion checkmark should appear on the tab header
    When I add a second borrower without filling their details
    Then the completion checkmark should be removed from the tab header

  @ui @functional
  Scenario: Partial Mortgage Repayment Validation
    Given an existing mortgage is retrieved from the interface
    And I am on the 'Asset and Transaction Details' tab
    When I set 'Borrower Commitment to Repay' (L037) to 'Partial'
    And I attempt to save without LAL44 or LAL45
    Then I should see a validation error for mandatory repayment fields
    When I enter 500000 in LAL44 and 2500 in LAL45
    Then the 'Financial Data' tab should reflect 2500 as the monthly expense

  @ui @regulatory
  Scenario: Financing Rate Alert with Dynamic Injection
    Given Calculated Asset Value (A02) is 2000000
    And the regulatory limit is 75%
    When I enter a 'Requested Amount' (C15) of 1600000
    And I click 'Save'
    Then an alert should display: "The mortgage amount in the application exceeds the maximum allowed amount... 80% ... 1,500,000 NIS"

  @ui @functional
  Scenario: Application Header Aggregation
    When I add borrowers 'Israel Israeli', 'Sarah Levi', and 'Moshe Cohen'
    Then the Application Header (RLA98) should display 'Israel Israeli, Sarah Levi, Moshe Cohen'
    And the Performance Prediction Model (RLA96) should display dual model outputs
    When I transition status to 'Ready for Submission'
    Then the Submission Date (RLA99) should update to the current date

  @ui @functional
  Scenario: Joint Income Auto-Association
    Given I have one borrower and add a 'Joint Income' of 10000
    When I add a second participant with role 'Borrower'
    Then the 'Joint Income' should be automatically associated with both borrowers
    When I add a 'Guarantor'
    Then the 'Joint Income' should NOT be associated with the Guarantor

  # API Test Scenarios
  @api @workflow
  Scenario: Automatic Data Refresh After 24 Hours
    Given the API base URL is set to the Mortgage Core Gateway
    And an application was last modified > 24 hours ago
    When I send a GET request to '/api/applications/{appId}/re-entry'
    Then the response status should be 200
    And the response body should trigger the following interface calls:
      """
      {
        "refresh_triggered": true,
        "interfaces": ["Kashmamit", "Alerts", "CreditScore"],
        "timestamp": "2023-10-27T10:00:00Z"
      }
      """

  @api @regulatory
  Scenario Outline: Identity Update Triggers Alert Refresh for Non-Bank Customers
    Given the participant is not a bank customer
    When I send a PATCH request to '/api/participants/{participantId}/identity' with payload:
      """
      {
        "<field>": "<value>"
      }
      """
    Then the response status should be 200
    And the system should perform a POST to '/api/external/alerts/fetch'
    And the response should contain updated alert data

    Examples:
      | field            | value          |
      | firstNameHebrew  | אברהם          |
      | lastNameHebrew   | כהן            |
      | firstNameEnglish | Abraham        |
      | lastNameEnglish  | Cohen          |
