import 'dotenv/config';
import { test, expect } from '@playwright/test';

// STANDARD environment variables (use exactly these names)
const BASE_URL = process.env.BASE_URL || 'https://atid.store'; // NO trailing slash

// Scenario-specific variables (if any, none in this case)

test('Discovered Workflow: navigation_flow - Homepage Load Verification', async ({ page }) => {
  try {
    // Step 1: Navigate to the website homepage
    // This step loads the main website homepage.
    await page.goto(BASE_URL);

    // Verification Point: Check if the page URL matches the base URL.
    // We use a regular expression to gracefully handle optional trailing slashes.
    const expectedUrlRegex = new RegExp(`^${BASE_URL.replace(/\/$/, '')}/?$`);
    await expect(page).toHaveURL(expectedUrlRegex);
    
    console.log(`Successfully navigated to ${BASE_URL} and verified the URL.`);

  } catch (error) {
    // Log any errors that occur during the test execution
    console.error(`An error occurred during the homepage load verification: ${error.message}`);
    // Re-throw the error to ensure the test fails
    throw error;
  }
});