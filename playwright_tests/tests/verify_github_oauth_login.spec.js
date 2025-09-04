import { test, expect } from '@playwright/test';

test('Verify GitHub OAuth Login', async ({ page }) => {
  // Step 1: Navigate to the login page
  const loginPageURL = 'https://dev.roost.ai/login';
  console.log('Navigating to the login page:', loginPageURL);
  await page.goto(loginPageURL);

  // Step 2: Verify that the login page loads correctly
  await expect(page).toHaveURL(loginPageURL);
  console.log('Login page loaded successfully.');

  // Step 3: Locate the GitHub login button
  const githubLoginButtonSelector = "//a[@href='https://github.com/login/oauth/authorize?scope=user%3Aemail&client_id=0fc11ea1f52d5e2a8dcf&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'git')]";
  const githubLoginButton = page.locator(githubLoginButtonSelector);
  await expect(githubLoginButton).toBeVisible();
  console.log('GitHub login button is visible.');

  // Step 4: Click on the GitHub login button
  await githubLoginButton.click();
  console.log('Clicked on the GitHub login button.');

  // Step 5: Verify redirection to GitHub OAuth authentication page
  const githubOAuthPageURL = 'https://github.com/login';
  await page.waitForURL(/https:\/\/github\.com\/login/);
  console.log('Redirected to GitHub OAuth authentication page.');
  await expect(page).toHaveURL(githubOAuthPageURL);

  // Step 6: Enter valid GitHub account credentials
  const usernameSelector = 'input[name="login"]';
  const passwordSelector = 'input[name="password"]';
  const signInButtonSelector = 'input[type="submit"]';

  const githubUsername = 'your-github-username'; // Replace with a valid GitHub username
  const githubPassword = 'your-github-password'; // Replace with a valid GitHub password

  await page.locator(usernameSelector).fill(githubUsername);
  console.log('Entered GitHub username.');
  await page.locator(passwordSelector).fill(githubPassword);
  console.log('Entered GitHub password.');
  await page.locator(signInButtonSelector).click();
  console.log('Submitted GitHub credentials.');

  // Step 7: Authorize the application if prompted
  try {
    const authorizeButtonSelector = 'button[id="js-oauth-authorize-btn"]';
    const authorizeButton = page.locator(authorizeButtonSelector);
    if (await authorizeButton.isVisible()) {
      await authorizeButton.click();
      console.log('Authorized the application.');
    }
  } catch (error) {
    console.log('Authorization step not required or an error occurred:', error);
  }

  // Step 8: Verify redirection back to the platform dashboard
  const dashboardURL = 'https://dev.roost.ai/dashboard';
  await page.waitForURL(dashboardURL);
  console.log('Redirected back to the platform dashboard.');
  await expect(page).toHaveURL(dashboardURL);

  // Step 9: Verify that the user is logged in and GitHub profile data is displayed
  const profileNameSelector = 'div.profile-name'; // Replace with the actual selector for GitHub profile name
  const profilePictureSelector = 'img.profile-picture'; // Replace with the actual selector for GitHub profile picture

  await expect(page.locator(profileNameSelector)).toBeVisible();
  console.log('User profile name is visible on the dashboard.');
  await expect(page.locator(profilePictureSelector)).toBeVisible();
  console.log('User profile picture is visible on the dashboard.');
});