import 'dotenv/config';
import { test, expect } from '@playwright/test';

// STANDARD environment variables (use exactly these names)
const BASE_URL = process.env.BASE_URL || 'https://atid.store'; // NO trailing slash
// The following variables are not used in this scenario but are included for standardization.
const LOGIN_URL = process.env.LOGIN_URL || BASE_URL + '/login';
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const OTP_URL = process.env.OTP_URL;
const OTP_SITE_USERNAME = process.env.OTP_SITE_USERNAME;
const OTP_SITE_PASSWORD = process.env.OTP_SITE_PASSWORD;
const SEARCH_TERM = process.env.SEARCH_TERM || 'test';
const EMAIL = process.env.EMAIL || USERNAME;

test('Discovered Workflow: navigation_flow - Verify Homepage Accessibility', async ({ page }) => {
  try {
    // Step 1: Navigate to the website homepage
    // This action loads the main entry point of the application.
    await page.goto(BASE_URL);

    // Verification Point 1: Verify the URL is correct.
    // We use a regular expression to handle optional trailing slashes, making the test more robust.
    const expectedUrlRegex = new RegExp(`^${BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$`);
    await expect(page).toHaveURL(expectedUrlRegex);

    // Verification Point 2: Verify the page title is correct.
    // This confirms that the correct page has loaded and the title metadata is as expected.
    await expect(page).toHaveTitle('ATID Demo Store – ATID College');

  } catch (error) {
    // Comprehensive error handling to catch any failures during navigation or assertion.
    console.error(`An error occurred during the homepage accessibility test: ${error.message}`);
    // Re-throw the error to ensure the test is marked as failed.
    throw error;
  }
});