import 'dotenv/config';
import { test, expect } from '@playwright/test';

test('Discovered Workflow: navigation_flow - Verify Homepage Accessibility', async ({ page }) => {
  try {
    // Step 1: Navigate to the website homepage
    // Load the main website homepage from the environment variable.
    await page.goto(process.env.BASE_URL);

    // Verification: Ensure the URL is correct after navigation.
    await expect(page).toHaveURL(process.env.BASE_URL + '/');

    // Verification Point: Check if the page title contains the expected text.
    // This confirms that the correct page has loaded successfully.
    await expect(page).toHaveTitle(/Docker Hub Container Image Library/);

  } catch (error) {
    // Log any errors that occur during the test execution.
    console.error('An error occurred during the homepage accessibility test:', error);
    // Re-throw the error to ensure the test is marked as failed.
    throw error;
  }
});