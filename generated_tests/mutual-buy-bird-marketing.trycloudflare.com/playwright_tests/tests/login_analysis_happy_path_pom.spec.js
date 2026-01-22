/*
 * ⚠️ TEST FAILED AFTER 5 ITERATIONS
 * Test: login_analysis_happy_path
 *
 * Errors are captured in test_iteration_errors_login_analysis_happy_path.md
 * Please review and fix manually.
 */

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage.js';
import { HomePage } from '../pom/HomePage.js';
import * as fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Environment Variables ---
const LOGIN_URL = process.env.LOGIN_URL || 'https://mutual-buy-bird-marketing.trycloudflare.com/';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://mutual-buy-bird-marketing.trycloudflare.com';
const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;
const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD;
const AUTH_FILE = '.auth/storage-state.json';

// --- Test Setup for ES Modules ---
// This is required to get __dirname in an ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Test Hooks ---
/**
 * This hook runs after each test.
 * It captures a screenshot if the test fails, which is invaluable for debugging.
 */
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Sanitize the test title to create a valid file name
      const fileName = testInfo.title.replace(/[^a-zA-Z0-9_]/g, '_');
      
      // Define the path for the screenshot
      const screenshotDir = path.join(__dirname, '..', 'test-results', 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      const screenshotPath = path.join(screenshotDir, `${fileName}_failure.png`);
      
      // Capture and save the screenshot
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved for failed test: ${testInfo.title}`);
    } catch (e) {
      console.error('Failed to capture or save screenshot:', e);
    }
  }
});

// --- Test Suite ---
test.describe('Authentication | Happy Path', () => {
  
  /**
   * @description This test automates the happy path for user login.
   * It follows the steps outlined in the provided scenario:
   * 1. Navigates to the login page.
   * 2. Enters valid credentials from environment variables.
   * 3. Submits the login form.
   * 4. Verifies successful navigation to the home page.
   * 5. Saves the authentication state to a file for reuse in other tests.
   *
   * @testname login_analysis_happy_path
   */
  test('should successfully log in and save authentication state', async ({ page }) => {
    // Step 0: Navigate to the login page
    // This is a prerequisite for any login test.
    await page.goto(LOGIN_URL);
    
    // Instantiate the Page Object Model for the Login page
    const loginPage = new LoginPage(page);
    
    // Steps 1-3: Perform the login action using the high-level POM method.
    // This encapsulates entering username, password, and clicking the login button.
    // It returns the next page object (HomePage) upon success.
    const homePage = await loginPage.login(UI_SITE_USERNAME, UI_SITE_PASSWORD);
    
    // Step 4: Verify successful navigation
    // Wait for the URL to contain the expected path and then assert it.
    // This ensures the application has redirected correctly after login.
    const expectedHomePageUrl = `${BASE_HOST_URL}/#/home`;
    await page.waitForURL(expectedHomePageUrl, { timeout: 10000 });
    await expect(page).toHaveURL(expectedHomePageUrl);
    
    // Optional but recommended: Verify a key element on the home page is visible
    // This confirms the page has loaded correctly, not just the URL is right.
    await expect(homePage.pageHeader, 'Expected "Welcome" header to be visible after login').toBeVisible();
    
    // CRITICAL: Save the authentication state
    // This allows other tests to bypass the login process, making the suite faster and more reliable.
    await page.context().storageState({ path: AUTH_FILE });
    console.log(`✅ Authentication state successfully saved to: ${AUTH_FILE}`);
  });
});