# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 2
- **Application Base URL**: https://dev.roost.ai
- **Generated On**: 2025-09-04 13:55:57

## Scenarios

### 1. Verify Google OAuth Login
_This test verifies that a user can successfully log in to the platform using their Google account via the OAuth flow._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, authentication, auto-generated, error-handling, file-upload, form-submission, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: authentication
**Pages Involved:**
- https://dev.roost.ai/login

#### Steps:
- Navigate to the login page at https://dev.roost.ai/login.
- Locate the Google login button.
- Click on the Google login button.
- Verify that the user is redirected to the Google OAuth authentication page.
- Enter valid Google account credentials and submit.
- Verify that the user is redirected back to the platform dashboard.
- Check that the user is logged in and their Google profile data is displayed on the dashboard.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]`, **Action**: click

#### Expected Results:
- User is redirected to Google's OAuth page.
- User can authenticate using valid Google credentials.
- User is redirected back to https://dev.roost.ai and logged in successfully.
- User's Google profile details are displayed on the dashboard.

---

### 2. Verify GitHub OAuth Login
_This test ensures that a user can log in to the platform using their GitHub account via the OAuth flow._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, authentication, auto-generated, error-handling, file-upload, form-submission, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: authentication
**Pages Involved:**
- https://dev.roost.ai/login

#### Steps:
- Navigate to the login page at https://dev.roost.ai/login.
- Locate the GitHub login button.
- Click on the GitHub login button.
- Verify that the user is redirected to the GitHub OAuth authentication page.
- Enter valid GitHub account credentials and submit.
- Authorize the application if prompted.
- Verify that the user is redirected back to the platform dashboard.
- Check that the user is logged in and their GitHub profile data is displayed on the dashboard.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://github.com/login/oauth/authorize?scope=user%3Aemail&client_id=0fc11ea1f52d5e2a8dcf&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'git')]`, **Action**: click

#### Expected Results:
- User is redirected to GitHub's OAuth page.
- User can authenticate using valid GitHub credentials.
- User is redirected back to https://dev.roost.ai and logged in successfully.
- User's GitHub profile details are displayed on the dashboard.

---

