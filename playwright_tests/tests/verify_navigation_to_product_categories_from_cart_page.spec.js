import { test, expect } from '@playwright/test';

test('Verify Navigation to Product Categories from Cart Page', async ({ page }) => {
  // Step 1: Navigate to the cart page
  const cartPageUrl = 'https://atid.store/cart-2/';
  await page.goto(cartPageUrl);

  // Verify the cart page loaded successfully
  await expect(page).toHaveURL(cartPageUrl);
  console.log('Navigated to the cart page successfully.');

  // Step 2: Locate the navigation menu and click on the 'MEN' category link
  const menCategorySelector = "//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]";
  const menCategoryPageUrl = 'https://atid.store/product-category/men/';
  
  await page.locator(menCategorySelector).click();
  console.log("Clicked the 'MEN' category link.");

  // Step 3: Verify the 'Men' product category page loads successfully
  await page.waitForURL(menCategoryPageUrl);
  await expect(page).toHaveURL(menCategoryPageUrl);
  console.log('Verified navigation to the Men product category page.');

  // Step 4: Return to the cart page
  await page.goto(cartPageUrl);
  await expect(page).toHaveURL(cartPageUrl);
  console.log('Returned to the cart page.');

  // Step 5: Click on the 'WOMEN' category link
  const womenCategorySelector = "//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]";
  const womenCategoryPageUrl = 'https://atid.store/product-category/women/';
  
  await page.locator(womenCategorySelector).click();
  console.log("Clicked the 'WOMEN' category link.");

  // Step 6: Verify the 'Women' product category page loads successfully
  await page.waitForURL(womenCategoryPageUrl);
  await expect(page).toHaveURL(womenCategoryPageUrl);
  console.log('Verified navigation to the Women product category page.');
});