# Scenario Summary: w01_gemini_connector_api_check

## Overview

- **Workflow ID**: WF001
- **Title**: Gemini Connector Api Check
- **Goal**: Submit the form and confirm the connector is created (success toast / the new connector appears in the list).
- **Feature Area**: a72e278e-b4ac-4cdd-bb50-a0c37404c643
- **Site URL**: https://dev.roost.ai
- **Site Type**: saas — AI/ML Platform Management
- **Confidence Score**: 0.95
- **Auth Required**: True
- **Generated On**: 2026-06-23T13:38:19.364141

## User Journeys

### 1. Gemini Connector Creation
_User creates a new Gemini AI connector within the platform._

- **Business Value**: Enables users to integrate external AI services, expanding platform capabilities.
- **User Persona**: Administrator / Developer
- **Frequency**: weekly
- **Complexity**: medium

## Scenarios

### 1. Discovered Workflow: Gemini Connector Api Check - Complete User Journey
**Type**: e2e_business_workflow | **Priority**: high

> Verifies the end-to-end process of creating a Gemini AI connector, including navigation, form filling, and submission.

**Business Goal**: Verify users can successfully create a Gemini AI connector.

**User Story**: As an administrator, I want to create a Gemini AI connector so that I can integrate Gemini AI services with the platform.

**Workflow Narrative**:
The user navigates to the Connectors section, initiates the 'Add Connector' process, selects 'Gemini AI', fills in the connector name and API key, and successfully saves the new connector.

#### Implementation Guidance:
- Ensure proper waiting for page navigation after clicking 'Connectors' tab.
- Verify the success toast message or the presence of the new connector in the list after submission.

#### Detailed Steps:

| # | Action | Component | Description | Verification | URL |
|---|--------|-----------|-------------|--------------|-----|
| 1 | Navigate to homepage | Navigation | Load the RoostGPT shell homepage. | RoostGPT shell is loaded. | https://dev.roost.ai |
| 2 | Click | Connectors Tab | Click on the 'Connectors' tab to navigate to the connectors management page. | Connectors page is displayed. | https://dev.roost.ai/connectors |
| 3 | Click | Add Connector Button | Click the 'Add Connector' button to open the connector creation form. | Add Connector form is displayed. | https://dev.roost.ai/connectors |
| 4 | Click | Gemini AI Option | Select 'Gemini AI' as the type of connector to add. | 'Gemini AI' connector type is highlighted or selected. | https://dev.roost.ai/connectors |
| 5 | Fill | Connector Name Input | Enter the name for the new Gemini AI connector. | Connector name input field is populated. | https://dev.roost.ai/connectors |
| 6 | Fill | API Key Input | Enter the API Key for the Gemini AI connector. | API Key input field is populated. | https://dev.roost.ai/connectors |
| 7 | Click | Save Button | Click the 'Save' button to submit the connector creation form. | Gemini AI connector is successfully created and a success notification is displayed. | https://dev.roost.ai/connectors |

#### Expected Results:
- The Gemini AI connector 'gemini_demo_connector2' is successfully created.
- A success toast message is displayed.
- The new connector appears in the list of available connectors.

#### Edge Cases:
- Invalid API key submission.
- Duplicate connector name submission.
- Network interruption during submission.

#### Data Requirements:
- Valid Gemini AI API Key (test key if available, otherwise a placeholder for manual input).
- Unique connector name.

#### Prerequisites:
- User is logged in and has permissions to create connectors.
- Site is accessible.

## Captured Selectors

- **Total**: 12
