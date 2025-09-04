import { test, expect } from '@playwright/test';

test('Verify Google OAuth Login', async ({ page }) => {
  // Step 1: Navigate to the login page
  const loginPageURL = 'https://dev.roost.ai/login';
  await page.goto(loginPageURL);

  // Verify that we are on the login page
  await expect(page).toHaveURL(loginPageURL);

  // Step 2: Locate the Google login button
  const googleLoginButton = page.locator("//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]");

  // Ensure the Google login button is visible
  await expect(googleLoginButton).toBeVisible();

  // Step 3: Click on the Google login button
  await googleLoginButton.click();

  // Step 4: Verify that the user is redirected to the Google OAuth authentication page
  const googleOAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  await page.waitForURL(new RegExp(`^${googleOAuthURL}`));

  // Verify the Google OAuth page URL
  const currentURL = page.url();
  expect(currentURL).toContain(googleOAuthURL);

  // Step 5: Enter valid Google account credentials and submit
  const emailInput = page.locator('input[type="email"]');
  const nextButton = page.locator('button:has-text("Next")');
  const passwordInput = page.locator('input[type="password"]');

  // Fill email and proceed
  await emailInput.fill('your-google-email@gmail.com');
  await nextButton.click();

  // Wait for password input to appear
  await passwordInput.waitFor({ state: 'visible' });

  // Fill password and proceed
  await passwordInput.fill('your-google-password');
  await nextButton.click();

  // Step 6: Verify that the user is redirected back to the platform dashboard
  const dashboardURL = 'https://dev.roost.ai/dashboard';
  await page.waitForURL(dashboardURL);

  // Verify the dashboard URL
  await expect(page).toHaveURL(dashboardURL);

  // Step 7: Check that the user is logged in and their Google profile data is displayed on the dashboard
  const profileInfo = page.locator('.user-profile');
  await expect(profileInfo).toBeVisible();
  await expect(profileInfo).toContainText('your-google-email@gmail.com');

  console.log('Test completed successfully: The user is logged in via Google OAuth and their profile data is displayed.');
});