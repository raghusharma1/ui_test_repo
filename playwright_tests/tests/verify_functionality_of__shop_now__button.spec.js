import { test, expect } from '@playwright/test';

test('Verify Functionality of "SHOP NOW" Button', async ({ page }) => {
  // Step 1: Navigate to the homepage
  const homepageUrl = 'https://atid.store';
  const storePageUrl = 'https://atid.store/store/';
  await page.goto(homepageUrl);

  // Verify that the homepage has loaded successfully
  await expect(page).toHaveURL(homepageUrl);
  console.log('Homepage loaded successfully.');

  // Step 2: Locate the "SHOP NOW" button
  const shopNowButton = page.locator("//a[@href='https://atid.store/store/' and contains(@class, 'elementor-button-link')]");
  await expect(shopNowButton).toBeVisible();
  console.log('"SHOP NOW" button is visible on the homepage.');

  // Step 3: Click on the "SHOP NOW" button
  await shopNowButton.click();
  console.log('Clicked on the "SHOP NOW" button.');

  // Wait for navigation to the store page
  await page.waitForURL(storePageUrl);

  // Step 4: Verify that the page navigates to the store page
  await expect(page).toHaveURL(storePageUrl);
  console.log('Successfully navigated to the store page.');

  // Step 5: Verify that the store page displays a list of products
  const productList = page.locator('.products'); // Assumes a class "products" for the product list container
  await expect(productList).toBeVisible();
  console.log('The store page displays a list of products.');
});