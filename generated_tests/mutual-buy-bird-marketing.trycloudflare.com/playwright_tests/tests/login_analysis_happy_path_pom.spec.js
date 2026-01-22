import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage.js';
import { HomePage } from './pom/HomePage.js';
// --- Environment Variables ---
// Use LOGIN_URL for initial navigation, fallback to BASE_URL if not defined.
const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;

// Use BASE_HOST_URL for constructing post-login URL expectations.
const BASE_HOST_URL = process.env.BASE_HOST_URL;

// Credentials for the test user, loaded from environment variables.
const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;

// Path to save the authentication state file for reuse in other tests.
const AUTH_FILE = '.auth/storage-state.json';

// --- Test Hooks ---

/**
 * This hook runs after each test. If a test fails, it captures a screenshot
 * to help with debugging.
 */

// --- Test Suite: Authentication Workflow ---

test.describe('Authentication Workflow', () => {
  /**
   * Test: login_analysis_happy_path
   * Description: Verifies the complete successful login flow. A user provides valid
   * credentials, submits the form, is redirected to the authenticated home page,
   * and the authentication state is saved for subsequent tests.
   */
  test('login_analysis_happy_path', async ({ page }) => {
    // Step 0: Navigate to the login page. This is a prerequisite for any login test.
    await page.goto(LOGIN_URL);

    // Instantiate the Page Object Model for the Login page.
    const loginPage = new LoginPage(page);

    // Step 1-3: Perform the login action using the high-level POM method.
    // This encapsulates entering the username, password, and clicking the submit button.
    // The method returns an instance of the HomePage, following the Page Object pattern.
    console.log('Attempting login with provided credentials...');
    const homePage = await loginPage.loginAs(UI_SITE_USERNAME, UI_SITE_PASSWORD);

    // Step 4: Verify successful login by checking the URL and page content.
    // The HomePage POM provides methods to confirm we have landed on the correct page.
    console.log('Verifying redirection to the home page...');
    await homePage.verifyOnHomePage();

    // Additional explicit check to ensure the page is fully loaded and key elements are present.
    const isHomePageLoaded = await homePage.isLoaded();
    expect(isHomePageLoaded, 'Home page should be loaded after successful login').toBe(true);

    // Final Step: Save the authentication state (cookies, local storage) to a file.
    // This allows other tests to bypass the login process and start in an authenticated state.
    await page.context().storageState({ path: AUTH_FILE });
    console.log(`✅ Authentication state successfully saved to: ${AUTH_FILE}`);
  });
});