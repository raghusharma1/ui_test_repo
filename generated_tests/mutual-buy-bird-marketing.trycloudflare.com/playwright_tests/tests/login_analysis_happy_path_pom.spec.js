import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage.js';
import { HomePage } from './pom/HomePage.js';
// --- Environment Variables ---
// Fetches credentials and URLs from the environment configuration.
const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;
const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;

// --- Constants ---
// Defines the path for storing the authentication state.
const AUTH_FILE = '.auth/storage-state.json';

/**
 * This hook runs after each test. If a test fails, it captures a screenshot
 * to aid in debugging. The screenshot is saved in the 'screenshots' directory.
 */

/**
 * Test suite for the main login workflow.
 * This suite focuses on the critical "happy path" where a user successfully logs in.
 */
test.describe('Login Scenarios - Happy Path', () => {

  /**
   * @description Tests the complete successful login flow.
   * It verifies that a user with valid credentials can log in,
   * is redirected to the home page, and that the authentication state
   * is saved for use in subsequent tests.
   *
   * @test_id login_analysis_happy_path
   * @priority critical
   * @user_story As a registered user, I want to log in with my valid credentials so that I can access my account.
   */
  test('should allow a user to log in successfully and save authentication state', async ({ page }) => {
    // Step 0: Navigate to the login page
    await page.goto(LOGIN_URL);
    
    // Instantiate the Page Object for the Login page
    const loginPage = new LoginPage(page);
    
    // Step 1-3: Perform the login action using the POM method, which encapsulates
    // entering username, password, and clicking the submit button.
    // This returns an instance of the HomePage POM.
    const homePage = await loginPage.login(UI_SITE_USERNAME, UI_SITE_PASSWORD);
    
    // Step 4: Verify successful login by confirming navigation to the home page.
    // The POM method handles the specific URL check.
    await homePage.expectToBeOnHomePage();
    
    // Post-condition: Save the authentication state (cookies, local storage) to a file.
    // This allows other tests to bypass the login process and start authenticated.
    await page.context().storageState({ path: AUTH_FILE });
    
    // Log a confirmation message to the console for visibility.
    console.log(`✅ Authentication state successfully saved to: ${AUTH_FILE}`);
  });
});