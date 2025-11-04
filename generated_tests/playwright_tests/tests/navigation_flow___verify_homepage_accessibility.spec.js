import 'dotenv/config';
import { test, expect } from '@playwright/test';

// STANDARD environment variables (use exactly these names)
const BASE_URL = process.env.BASE_URL || 'https://atid.store'; // NO trailing slash

test('Discovered Workflow: navigation_flow - Verify Homepage Accessibility', async ({ page }) => {
  try {
    // Step 1: Navigate to website homepage
    // Load the main website homepage at https://atid.store/ and verify the page loads successfully.
    await page.goto(BASE_URL);

    // Verification Point: Page URL is 'https://atid.store/' and the page title is as expected for the homepage.
    
    // Create a regular expression to match the base URL with or without a trailing slash.
    // This makes the URL check more robust against automatic redirects.
    const expectedUrlRegex = new RegExp(`^${BASE_URL}/?$`);
    
    // Verify that the current URL matches the expected base URL.
    await expect(page).toHaveURL(expectedUrlRegex);

    // Verify that the page title is correct for the homepage.
    await expect(page).toHaveTitle('ATID Demo Store – ATID Demo Store');

  } catch (error) {
    // Log any errors that occur during the test execution.
    console.error(`An error occurred during the homepage accessibility test: ${error}`);
    
    // Re-throw the error to ensure the test is marked as failed.
    throw error;
  }
});