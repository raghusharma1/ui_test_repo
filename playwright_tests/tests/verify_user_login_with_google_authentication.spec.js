const { test, expect } = require('@playwright/test');

test('Verify User Login with Google Authentication', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Navigated to the login page.');

  // Step 2: Locate the Google authentication button
  const googleAuthButton = page.locator("//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]");
  await expect(googleAuthButton).toBeVisible();
  console.log('Found the Google authentication button.');

  // Step 3: Click on the Google authentication button
  await googleAuthButton.click();
  console.log('Clicked on the Google authentication button.');

  // Step 4: Verify that the browser redirects to the Google authentication page
  await page.waitForURL('https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin');
  await expect(page).toHaveURL('https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin');
  console.log('Redirected to the Google authentication page.');

  // Step 5: Log in with valid Google credentials
  try {
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('testuser@gmail.com');
    console.log('Filled in the email.');

    const nextButton = page.locator('button:has-text("Next")');
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    console.log('Clicked the Next button.');

    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('password123');
    console.log('Filled in the password.');

    const loginButton = page.locator('button:has-text("Next")');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    console.log('Clicked the login button.');
  } catch (error) {
    console.error('Error during login:', error);
    await page.screenshot({ path: 'google-login-error.png' });
    throw error;
  }

  // Step 6: Verify that the browser redirects back to the Roost.ai dashboard
  await page.waitForURL('https://dev.roost.ai');
  await expect(page).toHaveURL('https://dev.roost.ai');
  console.log('Redirected back to the Roost.ai dashboard.');

  // Step 7: Ensure that the dashboard page loads successfully and displays the user's account information
  const accountInfo = page.locator('.account-info'); // Assuming .account-info contains user details
  await expect(accountInfo).toBeVisible();
  console.log('Verified that the dashboard displays the user\'s account information.');
});