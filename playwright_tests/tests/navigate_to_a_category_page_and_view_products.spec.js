import { test, expect } from '@playwright/test';

test('Navigate to a Category Page and View Products', async ({ page }) => {
  // Step 1: Navigate to the homepage
  console.log('Navigating to homepage...');
  await page.goto('https://atid.store/');
  await expect(page).toHaveURL('https://atid.store/');
  console.log('Homepage loaded successfully.');

  // Step 2: Locate the 'Women' category link in the header menu
  console.log('Locating "Women" category link...');
  const womenCategoryLink = page.locator("//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]");
  await expect(womenCategoryLink).toBeVisible();

  // Step 3: Click on the 'Women' category link
  console.log('Clicking on "Women" category link...');
  await womenCategoryLink.click();

  // Step 4: Verify the 'Women' category page loads with a list of products
  console.log('Verifying "Women" category page...');
  await page.waitForURL('https://atid.store/product-category/women/');
  await expect(page).toHaveURL('https://atid.store/product-category/women/');
  
  const productList = page.locator('.products'); // Assuming the products container has this class
  await expect(productList).toBeVisible();
  console.log('"Women" category page loaded with products.');

  // Step 5: Scroll through the product list to view all available items
  console.log('Scrolling through the product list...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); // Scroll to bottom
  await page.waitForTimeout(1000); // Wait for potential lazy-loaded products

  // Step 6: Click on a product link (e.g., 'Blue Denim Shorts') to view its detailed page
  console.log('Locating and clicking "Blue Denim Shorts" product link...');
  const productLink = page.locator("//a[@href='https://atid.store/product/blue-denim-shorts/' and contains(@class, 'ast-loop-product__link')]");
  await expect(productLink).toBeVisible();
  await productLink.click();

  // Verify the product detail page loads correctly
  console.log('Verifying "Blue Denim Shorts" product detail page...');
  await page.waitForURL('https://atid.store/product/blue-denim-shorts/');
  await expect(page).toHaveURL('https://atid.store/product/blue-denim-shorts/');
  const productDetail = page.locator('.product'); // Assuming the product detail container has this class
  await expect(productDetail).toBeVisible();
  console.log('"Blue Denim Shorts" product detail page loaded successfully.');
});