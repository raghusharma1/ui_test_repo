import { test, expect } from '@playwright/test';

test('Verify Product Search and Navigation to Product Details Page', async ({ page }) => {
  // Step 1: Navigate to the main page
  const homePageUrl = 'https://atid.store/';
  await page.goto(homePageUrl);
  // Verify the page loaded correctly
  await expect(page).toHaveURL(homePageUrl);

  // Step 2: Click on the 'ACCESSORIES' menu link in the navigation bar
  const accessoriesMenuSelector = "//a[@href='https://atid.store/product-category/accessories/' and contains(@class, 'menu-link')]";
  await page.locator(accessoriesMenuSelector).click();

  // Step 3: Wait for the Accessories category page to load
  const accessoriesPageUrl = 'https://atid.store/product-category/accessories/';
  await page.waitForURL(accessoriesPageUrl);
  // Verify the Accessories page loaded correctly
  await expect(page).toHaveURL(accessoriesPageUrl);

  // Step 4: Locate and click on the product link 'Light Brown Purse'
  const productLinkSelector = "//a[@href='https://atid.store/product/light-brown-purse/' and contains(@class, 'ast-loop-product__link')]";
  await page.locator(productLinkSelector).click();

  // Step 5: Wait for the product details page to fully load
  const productDetailsPageUrl = 'https://atid.store/product/light-brown-purse/';
  await page.waitForURL(productDetailsPageUrl);
  // Verify the Product Details Page loaded correctly
  await expect(page).toHaveURL(productDetailsPageUrl);

  // Step 6: Verify that the product name 'Light Brown Purse' is displayed
  const productNameLocator = page.locator('h1.entry-title'); // Assuming the product name is in an <h1> tag with class 'entry-title'
  await expect(productNameLocator).toBeVisible();
  await expect(productNameLocator).toContainText('Light Brown Purse');

  // Step 7: Verify that the product description and pricing information are displayed
  const productDescriptionLocator = page.locator('.woocommerce-product-details__short-description'); // Assuming description has this class
  const productPriceLocator = page.locator('.price'); // Assuming price has this class
  await expect(productDescriptionLocator).toBeVisible();
  await expect(productPriceLocator).toBeVisible();

  // Assertions for validation
  console.log('Test completed successfully: Verified product search and navigation to product details page.');
});