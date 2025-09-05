# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 9
- **Application Base URL**: https://dev.roost.ai
- **Generated On**: 2025-09-05 10:05:07

## Scenarios

### 1. Verify Login Using Google OAuth Integration
_This test verifies that a user can successfully log in using the Google OAuth integration available on the login page._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, authentication, auto-generated, cross-browser, error-handling, form-submission, keyboard-navigation, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: authentication
**Pages Involved:**
- https://dev.roost.ai/login

#### Steps:
- Navigate to the login page at https://dev.roost.ai/login.
- Locate the 'Login with Google' button using the provided stable selector.
- Click the 'Login with Google' button.
- Ensure the browser is redirected to the Google OAuth page.
- Input valid Google account credentials (email and password) and submit.
- Verify the OAuth consent screen, if prompted, and accept.
- Ensure the browser is redirected back to https://dev.roost.ai with a valid authentication token.
- Verify that the user is logged in by checking the presence of a user-specific element on the dashboard.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]`, **Action**: click

#### Expected Results:
- User is redirected to the Google OAuth login page.
- User can authenticate using valid Google credentials.
- User is redirected back to https://dev.roost.ai with an active session.
- User-specific dashboard elements are visible after login.

---

### 2. Verify Navigation to Documentation Page
_This test ensures that users can navigate to the Documentation page from the footer of the login page._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, authentication, auto-generated, cross-browser, keyboard-navigation, navigation, network-resilience, performance, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: high

**Type**: navigation
**Pages Involved:**
- https://dev.roost.ai/login
- https://docs.roost.ai

#### Steps:
- Navigate to the login page at https://dev.roost.ai/login.
- Scroll to the footer section of the page.
- Locate the 'Documentation' link using the provided stable selector.
- Click the 'Documentation' link.
- Ensure the browser is redirected to https://docs.roost.ai.
- Verify that the Documentation page loads successfully by checking for specific content unique to that page.

#### Selectors Used:
- **Type**: a, **Text**: 'Documentation', **Selector**: `//a[@href='https://docs.roost.ai' and contains(@class, 'footer-item')]`, **Action**: click

#### Expected Results:
- User can see the 'Documentation' link in the footer.
- Clicking the link redirects the user to the Documentation page.
- The Documentation page loads successfully with relevant content.

---

### 3. Verify User Login with Google Authentication
_This test verifies that a user can successfully log in using their Google account and is redirected to the application dashboard._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, authentication, auto-generated, cross-browser, error-handling, form-submission, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: authentication
**Pages Involved:**
- https://dev.roost.ai/login
- https://dev.roost.ai

#### Steps:
- Navigate to the login page at https://dev.roost.ai/login.
- Locate the Google authentication button.
- Click on the Google authentication button.
- Verify that the browser redirects to the Google authentication page.
- Log in with valid Google credentials on the Google authentication page.
- Verify that the browser redirects back to the Roost.ai dashboard.
- Ensure that the dashboard page loads successfully and displays the user's account information.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]`, **Action**: click

#### Expected Results:
- User is redirected to the Google authentication page.
- User successfully logs in with Google and is redirected to their dashboard.
- Dashboard page displays user's account information.

---

### 4. Verify User Login with GitHub Authentication
_This test verifies that a user can successfully log in using their GitHub account and is redirected to the application dashboard._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, authentication, auto-generated, cross-browser, error-handling, form-submission, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: authentication
**Pages Involved:**
- https://dev.roost.ai/login
- https://dev.roost.ai

#### Steps:
- Navigate to the login page at https://dev.roost.ai/login.
- Locate the GitHub authentication button.
- Click on the GitHub authentication button.
- Verify that the browser redirects to the GitHub authentication page.
- Log in with valid GitHub credentials on the GitHub authentication page.
- Verify that the browser redirects back to the Roost.ai dashboard.
- Ensure that the dashboard page loads successfully and displays the user's account information.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://github.com/login/oauth/authorize?scope=user%3Aemail&client_id=0fc11ea1f52d5e2a8dcf&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'git')]`, **Action**: click

#### Expected Results:
- User is redirected to the GitHub authentication page.
- User successfully logs in with GitHub and is redirected to their dashboard.
- Dashboard page displays user's account information.

---

### 5. Configure Test Settings and Save
_Tests the ability of users to configure test settings including test name, cloud/git type, and OpenAI API token, and save the configuration._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, configuration, error-handling, form-submission, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: configuration
**Pages Involved:**
- https://dev.roost.ai/gptCLIForm

#### Steps:
- Navigate to the 'RoostGPT Config' page from the navigation menu.
- Type 'Sample Test' into the test name input field.
- Select 'Cloud Git' as the git type by ensuring the 'Cloud Git' radio button is selected.
- Type a valid OpenAI API token into the OpenAI token input field.
- Click the OpenAI token unmask icon to verify the token entry.
- Click the 'Save Configuration' button to save the test settings.
- Verify that a confirmation message is displayed indicating successful save.

#### Selectors Used:
- **Type**: a, **Text**: 'RoostGPT Config', **Selector**: `//a[@href='/gptCLIForm' and contains(@class, 'nav-link')]`, **Action**: click
- **Type**: input, **Text**: '', **Selector**: `[data-testid="test-name-input"]`, **Action**: type
- **Type**: input, **Text**: '', **Selector**: `[data-testid="cloud-git-type-radio-button-selected"]`, **Action**: verify selected
- **Type**: input, **Text**: '', **Selector**: `[data-testid="openai-token"]`, **Action**: type
- **Type**: button, **Text**: '', **Selector**: `[data-testid="openai-token-unMask-icon"]`, **Action**: click

#### Expected Results:
- Test settings are successfully saved, and a confirmation message is displayed.
- The OpenAI token input value is correctly visible after unmasking.

---

### 6. Clone Virtual Environment
_Tests the cloning of a virtual environment to reproduce issues or test scenarios._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, form-submission, performance, ui-test, virtual_environment_management
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: virtual_environment_management
**Pages Involved:**
- https://dev.roost.ai/gptCLIForm

#### Steps:
- Navigate to the 'RoostGPT Config' page from the navigation menu.
- Select an existing virtual environment from the list.
- Click the 'Clone' button associated with the selected virtual environment.
- Provide a unique name for the cloned environment in the pop-up input field.
- Click the 'Confirm Clone' button to proceed.
- Verify that the cloned environment appears in the environment list.
- Check if the cloned environment inherits all configurations from the original environment.

#### Selectors Used:
- **Type**: a, **Text**: 'RoostGPT Config', **Selector**: `//a[@href='/gptCLIForm' and contains(@class, 'nav-link')]`, **Action**: click
- **Type**: button, **Text**: '', **Selector**: `[data-testid="clone-environment-button"]`, **Action**: click
- **Type**: input, **Text**: '', **Selector**: `[data-testid="cloned-environment-name"]`, **Action**: type

#### Expected Results:
- The cloned environment appears in the list with the provided name.
- The cloned environment inherits all configurations from the original.

---

### 7. Verify Navigation to API Documentation and Endpoint Exploration
_Tests the user's ability to navigate to the API documentation page and explore API endpoints by scrolling through the content._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, navigation, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: navigation
**Pages Involved:**
- https://dev.roost.ai
- https://dev.roost.ai/docs/api

#### Steps:
- Navigate to https://dev.roost.ai.
- Locate the 'roost.ai' logo link in the header.
- Click on the 'roost.ai' logo link.
- Ensure the page redirects to https://dev.roost.ai/docs/api.
- Verify the API documentation page is loaded successfully.
- Scroll through the API documentation content.
- Identify and verify the presence of multiple API endpoint details.
- Scroll to the bottom of the page and ensure all content is visible.

#### Selectors Used:
- **Type**: a, **Text**: 'roost.ai', **Selector**: `//a[@href='/docs/api' and contains(@class, 'logo')]`, **Action**: click

#### Expected Results:
- User is successfully redirected to the API documentation page.
- All API documentation content is visible and accessible.
- User can scroll through and view all API endpoints.

---

### 8. Verify API Documentation Link Redirection
_Tests whether the API documentation link on the main page redirects the user to the correct external API documentation URL._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, performance, redirection, ui-test
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: medium

**Type**: redirection
**Pages Involved:**
- https://dev.roost.ai
- https://docs.roost.ai

#### Steps:
- Navigate to https://dev.roost.ai.
- Locate the API documentation link with the 'roost-icon' class.
- Click on the link.
- Verify that the user is redirected to https://docs.roost.ai.
- Ensure the content of the external API documentation is loaded correctly.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://docs.roost.ai' and contains(@class, 'roost-icon')]`, **Action**: click

#### Expected Results:
- Clicking the link redirects the user to https://docs.roost.ai.
- The external API documentation content is visible and functional.

---

### 9. Verify Swagger API Interface Access
_Tests whether the Swagger API interface link on the main page redirects to the correct Swagger-based API configuration interface._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, performance, redirection, ui-test
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: medium

**Type**: redirection
**Pages Involved:**
- https://dev.roost.ai
- https://dev.roost.ai/api/swagger

#### Steps:
- Navigate to https://dev.roost.ai.
- Locate the Swagger API interface link with the 'roost-icon' class.
- Click on the link.
- Verify that the user is redirected to https://dev.roost.ai/api/swagger.
- Ensure the Swagger interface loads and displays the API configuration options.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://dev.roost.ai/api/swagger' and contains(@class, 'roost-icon')]`, **Action**: click

#### Expected Results:
- Clicking the Swagger link redirects the user to the correct Swagger interface.
- The Swagger interface loads and displays all API configuration options.

---

