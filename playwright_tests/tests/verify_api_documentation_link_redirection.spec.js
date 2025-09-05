import { test, expect } from '@playwright/test';

test('Verify API Documentation Link Redirection', async ({ page }) => {
  // Step 1: Navigate to https://dev.roost.ai
  const mainPageUrl = 'https://dev.roost.ai';
  await page.goto(mainPageUrl);

  // Verify that the main page loaded correctly
  await expect(page).toHaveURL(mainPageUrl);

  // Step 2: Locate the API documentation link with the 'roost-icon' class
  const apiDocLinkSelector = "//a[@href='https://docs.roost.ai' and contains(@class, 'roost-icon')]";
  const apiDocLink = page.locator(apiDocLinkSelector);

  // Verify the link is visible and enabled
  await expect(apiDocLink).toBeVisible();
  await expect(apiDocLink).toHaveAttribute('href', 'https://docs.roost.ai');

  // Step 3: Click on the link
  await apiDocLink.click();

  // Step 4: Verify that the user is redirected to https://docs.roost.ai
  const apiDocPageUrl = 'https://docs.roost.ai';
  await page.waitForURL(apiDocPageUrl);
  await expect(page).toHaveURL(apiDocPageUrl);

  // Step 5: Ensure the content of the external API documentation is loaded correctly
  // Verify that the page contains expected content (e.g., a visible heading or specific text)
  const expectedContentSelector = 'h1, h2, h3, .main-content'; // Adjust this selector to match the actual page structure
  const externalContent = page.locator(expectedContentSelector);
  await expect(externalContent).toBeVisible();

  console.log('API Documentation link redirection verified successfully.');
});