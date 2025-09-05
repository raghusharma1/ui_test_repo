import { test, expect } from '@playwright/test';

test('Verify Navigation to Documentation Page', async ({ page }) => {
  // Step 1: Navigate to the login page
  const loginPageUrl = 'https://dev.roost.ai/login';
  await page.goto(loginPageUrl);

  // Step 2: Verify that the page loaded correctly
  await expect(page).toHaveURL(loginPageUrl);

  // Step 3: Scroll to the footer section of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Step 4: Locate the 'Documentation' link using the provided stable selector
  const documentationLink = page.locator("//a[@href='https://docs.roost.ai' and contains(@class, 'footer-item')]");
  await expect(documentationLink).toBeVisible(); // Ensure the link is visible
  await expect(documentationLink).toHaveText('Documentation'); // Ensure the text matches

  // Step 5: Click the 'Documentation' link
  await documentationLink.click();

  // Step 6: Ensure the browser is redirected to the Documentation page
  const documentationPageUrl = 'https://docs.roost.ai';
  await page.waitForURL(documentationPageUrl);
  await expect(page).toHaveURL(documentationPageUrl);

  // Step 7: Verify that the Documentation page loads successfully by checking for specific content
  const uniqueContentSelector = page.locator('h1'); // Assuming the page has a unique heading for identification
  await expect(uniqueContentSelector).toContainText('Documentation'); // Verify the heading contains expected text

  // Additional logging for debugging
  console.log('Navigation to Documentation page verified successfully.');
});