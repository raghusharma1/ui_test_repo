import { test, expect } from '@playwright/test';

test('Verify Swagger API Interface Access', async ({ page }) => {
  // Step 1: Navigate to the main page
  await page.goto('https://dev.roost.ai');
  
  // Step 2: Verify the main page loaded correctly
  await expect(page).toHaveURL('https://dev.roost.ai');
  console.log('Successfully navigated to https://dev.roost.ai');

  // Step 3: Locate the Swagger API interface link
  const swaggerLink = page.locator("//a[@href='https://dev.roost.ai/api/swagger' and contains(@class, 'roost-icon')]");
  await expect(swaggerLink).toBeVisible();
  console.log('Swagger API link is visible on the main page');

  // Step 4: Click on the Swagger API link
  try {
    await swaggerLink.click();
    console.log('Clicked on the Swagger API link');
  } catch (error) {
    console.error('Failed to click the Swagger API link:', error);
    throw error;
  }

  // Step 5: Verify redirection to the Swagger interface
  await page.waitForURL('https://dev.roost.ai/api/swagger', { timeout: 10000 });
  await expect(page).toHaveURL('https://dev.roost.ai/api/swagger');
  console.log('Successfully redirected to https://dev.roost.ai/api/swagger');

  // Step 6: Verify the Swagger interface loads and displays API configuration options
  const swaggerInterface = page.locator('div.swagger-ui');
  await expect(swaggerInterface).toBeVisible();
  console.log('Swagger interface loaded successfully and is visible');
});