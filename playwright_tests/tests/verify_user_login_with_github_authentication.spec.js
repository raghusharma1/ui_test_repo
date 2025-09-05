// @playwright/test is required for running Playwright tests
import { test, expect } from '@playwright/test';

// Test to verify user login with GitHub authentication
test('Verify User Login with GitHub Authentication', async ({ page }) => {
  // Step 1: Navigate to the login page at https://dev.roost.ai/login
  const loginPageURL = 'https://dev.roost.ai/login';
  await page.goto(loginPageURL);

  // Verify that the login page has loaded successfully
  await expect(page).toHaveURL(loginPageURL);

  // Step 2: Locate the GitHub authentication button
  const githubAuthButton = page.locator("//a[@href='https://github.com/login/oauth/authorize?scope=user%3Aemail&client_id=0fc11ea1f52d5e2a8dcf&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'git')]");

  // Ensure the GitHub authentication button is visible and enabled
  await expect(githubAuthButton).toBeVisible();
  await expect(githubAuthButton).toBeEnabled();

  // Step 3: Click on the GitHub authentication button
  await githubAuthButton.click();

  // Step 4: Verify that the browser redirects to the GitHub authentication page
  const githubAuthPageURL = 'https://github.com/login';
  await page.waitForURL(githubAuthPageURL);
  await expect(page).toHaveURL(new RegExp(`${githubAuthPageURL}.*`)); // Handle URL parameters if present

  // Step 5: Log in with valid GitHub credentials on the GitHub authentication page
  // Fill in the GitHub username and password fields
  const githubUsernameField = page.locator('input#login_field'); // GitHub username input field
  const githubPasswordField = page.locator('input#password'); // GitHub password input field
  const githubSignInButton = page.locator('input[type="submit"]'); // GitHub sign-in button

  await githubUsernameField.fill('valid-github-username'); // Replace with actual GitHub username
  await githubPasswordField.fill('valid-github-password'); // Replace with actual GitHub password
  await githubSignInButton.click();

  // Step 6: Verify that the browser redirects back to the Roost.ai dashboard
  const dashboardPageURL = 'https://dev.roost.ai';
  await page.waitForURL(dashboardPageURL);
  await expect(page).toHaveURL(dashboardPageURL);

  // Step 7: Ensure that the dashboard page loads successfully and displays the user's account information
  const userAccountInfo = page.locator('div.account-info'); // Replace with the actual selector for user account information
  await expect(userAccountInfo).toBeVisible();
  await expect(userAccountInfo).toContainText('valid-github-username'); // Replace with the expected account name or identifier

  // Log test success
  console.log('Test passed: User successfully logged in using GitHub and was redirected to the dashboard.');
});