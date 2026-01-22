import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage.js';
// HomePage is imported for type safety and clarity, although LoginPage dynamically loads it.
import { HomePage } from './pom/HomePage.js';
import * as fs from 'node:fs';
import path from 'path';

// --- Environment Variables ---
// Ensures the test uses the correct URLs and credentials from the environment configuration.
const LOGIN_URL = process.env.LOGIN_URL || 'https://unsplash.com/login';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://unsplash.com';
const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;
const AUTH_FILE = '.auth/storage-state.json';

// --- Pre-flight Checks for Credentials ---
// This block ensures that the test fails fast if essential credentials are not configured.
if (!UI_SITE_USERNAME || !UI_SITE_PASSWORD) {
  throw new Error(
    'UI_SITE_USERNAME and UI_SITE_PASSWORD environment variables must be set.'
  );
}

// --- Test Hooks ---
// This hook captures a screenshot on test failure for easier debugging.
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Create a descriptive file name for the screenshot.
      const testFileName = path.basename(testInfo.file).replace('.spec.js', '');
      const screenshotName = `${testFileName}-${testInfo.title.replace(/\s+/g, '_')}_failure.png`;
      
      const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      
      const screenshotPath = path.join(screenshotDir, screenshotName);
      
      // Capture and save the screenshot.
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved to ${screenshotPath}`);
    } catch (e) {
      console.error('Failed to capture or save screenshot:', e);
    }
  }
});

// --- Test Suite for Login Workflow ---
test.describe('Authentication Workflow: Happy Path', () => {

  /**
   * @test {login_analysis_happy_path}
   * @description This test verifies the complete happy path for user login.
   * It navigates to the login page, enters valid credentials, submits the form,
   * verifies successful navigation to the home page, and saves the authentication
   * state for use in subsequent tests.
   */
  test('should successfully log in and save authentication state', async ({ page }) => {
    // Step 1: Navigate to the Unsplash login page.
    // The LoginPage's visit() method handles navigation and waits for the page to be ready.
    const loginPage = new LoginPage(page);
    await loginPage.visit();

    // Verification for Step 1: Confirm the URL and title of the login page.
    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page).toHaveTitle('Login | Unsplash');
    console.log('Step 1 PASSED: Successfully navigated to the login page.');

    // Steps 2, 3 & 4: Enter valid credentials and click the 'Login' button.
    // The high-level `login` method from the POM encapsulates these actions.
    console.log('Attempting to log in with provided credentials...');
    const homePage = await loginPage.login(UI_SITE_USERNAME, UI_SITE_PASSWORD);

    // Step 5: Verify successful login by checking the URL has changed.
    // A successful login should redirect the user away from the login page to the main site.
    // We expect the URL to be the base host URL, with or without a trailing slash.
    await expect(page).toHaveURL(new RegExp(`^${BASE_HOST_URL}/?$`));
    console.log(`Step 5 PASSED: Successfully redirected to ${page.url()} after login.`);

    // Final Step: Save the authenticated session state to a file.
    // This allows other tests to bypass the login process by reusing the session.
    await page.context().storageState({ path: AUTH_FILE });
    console.log(`✅ Authentication state successfully saved to: ${AUTH_FILE}`);
  });
});