import { test, expect } from '@playwright/test';

test('Verify Login Using Google OAuth Integration', async ({ page }) => {
  // Step 1: Navigate to the login page
  const loginPageURL = 'https://dev.roost.ai/login';
  await page.goto(loginPageURL);

  // Step 2: Ensure the login page loads correctly
  await expect(page).toHaveURL(loginPageURL);

  // Step 3: Locate the 'Login with Google' button using the provided selector
  const googleLoginButton = page.locator("//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]");
  await expect(googleLoginButton).toBeVisible();

  // Step 4: Click the 'Login with Google' button
  await googleLoginButton.click();

  // Step 5: Ensure redirection to the Google OAuth login page
  const googleOAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  await page.waitForURL(new RegExp(`^${googleOAuthURL}`));
  expect(page.url()).toContain(googleOAuthURL);

  // Step 6: Input valid Google account credentials
  try {
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('testuser@example.com'); // Replace with valid credentials
    await page.locator('button:has-text("Next")').click();

    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('TestPassword123'); // Replace with valid credentials
    await page.locator('button:has-text("Next")').click();
  } catch (error) {
    console.error('Error entering Google credentials:', error);
    throw error;
  }

  // Step 7: Handle the Google OAuth consent screen if prompted
  try {
    const consentButton = page.locator('button:has-text("Allow")'); // Adjust selector as necessary
    if (await consentButton.count() > 0) {
      await consentButton.click();
    }
  } catch (error) {
    console.error('Error in Google OAuth consent screen:', error);
    throw error;
  }

  // Step 8: Ensure redirection back to the Roost.ai application with a valid session
  const dashboardURL = 'https://dev.roost.ai/';
  await page.waitForURL(dashboardURL);
  await expect(page).toHaveURL(dashboardURL);

  // Step 9: Verify the user is logged in by checking for a user-specific element on the dashboard
  const userDashboardElement = page.locator('.user-dashboard'); // Replace with a specific selector for a user-unique element
  await expect(userDashboardElement).toBeVisible();
  console.log('User successfully logged in and dashboard is visible.');
});