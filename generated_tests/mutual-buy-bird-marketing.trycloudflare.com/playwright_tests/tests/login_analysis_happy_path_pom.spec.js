import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage.js';
import { HomePage } from './pom/HomePage.js';
// --- Environment Variables ---
// Fetches configuration from .env file.
const LOGIN_URL = process.env.LOGIN_URL || 'https://mutual-buy-bird-marketing.trycloudflare.com/';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://mutual-buy-bird-marketing.trycloudflare.com';
const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;

// --- Constants ---
// Defines the path where the authentication state will be stored.
const AUTH_FILE = '.auth/storage-state.json';

/**
 * This hook runs after each test. If a test fails, it captures a screenshot
 * to help with debugging. The screenshot is saved in the 'screenshots' directory.
 */

/**
 * Test suite for authentication-related scenarios.
 * This suite focuses on verifying the login workflow.
 */
test.describe('Authentication Workflow', () => {

  /**
   * Test case for a successful login.
   * This test is critical as it generates the authentication state file (`storage-state.json`)
   * that other tests will use to bypass the login process.
   *
   * Scenario: login_analysis_happy_path
   */
  test('login_analysis_happy_path: Successful login and authentication state saving', async ({ page }) => {
    // Ensure credentials are provided via environment variables
    if (!UI_SITE_USERNAME || !UI_SITE_PASSWORD) {
      throw new Error('UI_SITE_USERNAME and UI_SITE_PASSWORD environment variables must be set.');
    }

    // Step 0: Navigate to the login page
    await page.goto(LOGIN_URL);
    
    // Instantiate the Page Object Model for the Login page
    const loginPage = new LoginPage(page);

    // Step 1-3: Perform login using the high-level POM method
    // This encapsulates entering username, password, and clicking the login button.
    // It returns an instance of the HomePage POM upon successful submission.
    const homePage = await loginPage.loginAs(UI_SITE_USERNAME, UI_SITE_PASSWORD);

    // Step 4: Verify successful navigation to the home page
    // The POM method checks if the URL matches the expected pattern for the home page.
    await homePage.expectToBeOnHomePage();
    
    // Final Step: Save the authentication state
    // This is the most crucial part of a login test. The saved state allows
    // other tests to start already authenticated, making them faster and more reliable.
    await page.context().storageState({ path: AUTH_FILE });
    console.log(`✅ Authentication state successfully saved to: ${AUTH_FILE}`);
  });
});