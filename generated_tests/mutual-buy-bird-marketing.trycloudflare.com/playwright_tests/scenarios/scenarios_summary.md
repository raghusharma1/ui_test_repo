# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 2
- **Application Base URL**: https://mutual-buy-bird-marketing.trycloudflare.com/
- **Generated On**: 2026-01-22 11:08:40

## Scenarios

### 1. Successful User Login
_Tests the complete successful login flow using valid credentials, from entering user information to landing on the authenticated home page._

**Complexity**: low | **Priority**: high | **Risk Level**: medium
**Tags**: authentication, login, happy-path, form-submission
**Est. Execution Time**: 20 seconds | **Flakiness Potential**: low

**Type**: e2e_authentication_workflow
**Pages Involved:**
- https://mutual-buy-bird-marketing.trycloudflare.com/#/login
- https://mutual-buy-bird-marketing.trycloudflare.com/#/home

#### Steps:
- Enter username into the username field.
- Enter password into the password field.
- Click the login button to submit credentials.
- Verify successful login by confirming navigation to the home page.

#### Expected Results:
- User successfully authenticates with valid credentials.
- User is redirected to the authenticated home page after login.
- No authentication errors are displayed.

---

### 2. View Credit Card Details with OTP Verification
_This end-to-end scenario validates the complete user workflow for securely viewing credit card details. The test covers navigating to the cards section, selecting a specific card, passing a preview screen, successfully entering a multi-digit OTP, viewing the details, and completing the session._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: e2e, credit-card, otp, security, form-submission, critical-flow
**Est. Execution Time**: 65 seconds | **Flakiness Potential**: low

**Type**: e2e_business_workflow
**Pages Involved:**
- https://mutual-buy-bird-marketing.trycloudflare.com/
- https://mutual-buy-bird-marketing.trycloudflare.com/#/cards
- https://mutual-buy-bird-marketing.trycloudflare.com/#/cards/preview
- https://mutual-buy-bird-marketing.trycloudflare.com/#/cards/otp
- https://mutual-buy-bird-marketing.trycloudflare.com/#/cards/details
- https://mutual-buy-bird-marketing.trycloudflare.com/#/success

#### Steps:
- Load the main website homepage to begin the user journey.
- Click the 'View card details' button on the homepage to start the process of viewing credit cards.
- Select the Mastercard ending in 1425 from the list of available cards.
- Click the 'Continue' button to proceed after selecting a credit card.
- Click the 'View card details' button on the preview page to trigger the OTP verification step.
- Enter the first digit '1' of the OTP code '122074' into the first input field.
- Enter the second digit '2' of the OTP code '122074' into the second input field.
- Enter the third digit '2' of the OTP code '122074' into the third input field.
- Enter the fourth digit '0' of the OTP code '122074' into the fourth input field.
- Enter the fifth digit '7' of the OTP code '122074' into the fifth input field.
- Enter the final digit '4' of the OTP code '122074' into the sixth input field.
- Click the 'Continue' button to submit the entered OTP for verification.
- Click the 'Finish' button after viewing the card details to complete the workflow.

#### Expected Results:
- User successfully navigates through the entire card viewing workflow.
- The correct OTP is accepted, and the user is granted access to the card details page.
- The user is successfully redirected to a confirmation/success page after finishing the process.
- The system handles the multi-step authentication process without errors.

---