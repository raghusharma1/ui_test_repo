# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 1
- **Application Base URL**: https://dev.roost.ai
- **Generated On**: 2025-09-04 13:48:10

## Scenarios

### 1. Verify Login Page Accessibility and OAuth Login Options
_This test validates the accessibility and functionality of the login page, ensuring OAuth login options (Google, GitHub, Azure, Okta, Auth0, PingFederate) are functional and accessible._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, authentication, auto-generated, data-validation, error-handling, network-resilience, performance, ui-test
**Est. Execution Time**: 50 seconds | **Flakiness Potential**: high

**Type**: authentication
**Pages Involved:**
- https://dev.roost.ai/login

#### Steps:
- Navigate to the login page.
- Verify the presence of the main brand logo link using its selector.
- Locate the OAuth login options for Google, GitHub, Azure, Okta, Auth0, and PingFederate using their respective selectors.
- Click on the Google login button and verify the redirected URL.
- Return to the login page.
- Click on the GitHub login button and verify the redirected URL.
- Return to the login page.
- Repeat the same steps for Azure, Okta, Auth0, and PingFederate login buttons.
- Verify that all links are enabled and accessible.
- Validate that clicking each OAuth login button redirects the user correctly to the corresponding authentication provider's page.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='/' and contains(@class, 'brand-logo-container')]`, **Action**: verify
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]`, **Action**: click
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://github.com/login/oauth/authorize?scope=user%3Aemail&client_id=0fc11ea1f52d5e2a8dcf&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'git')]`, **Action**: click
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&scope=user.read&state=azure&client_id=946156a9-5142-4469-b79f-bdcc9e76cf7f&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'azure')]`, **Action**: click
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://dev-53854943.okta.com/oauth2/default/v1/authorize?response_type=code&scope=openid%20profile%20email%20address&state=okta&client_id=0oa3x8katznHWlHeD5d7&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'okta')]`, **Action**: click
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://dev-mhrflm8cktpvkqq5.us.auth0.com/authorize?response_type=code&scope=openid%20profile%20email&state=auth0&client_id=1IoDt4wUDOKHcpnYKCaNVhG4XWl3jJHR&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'auth0')]`, **Action**: click
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://ping.tryroost.link/as/authorization.oauth2?response_type=code&scope=openid%20profile%20email&state=pingFederate&client_id=roost-dev&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'pingFederate')]`, **Action**: click

#### Expected Results:
- All OAuth login options are visible on the login page.
- All links are enabled and clickable.
- Clicking each link redirects to the correct authentication provider's page.
- The main brand logo link is visible and functional.

---

