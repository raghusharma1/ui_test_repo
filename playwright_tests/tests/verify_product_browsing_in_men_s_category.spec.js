import { test, expect } from '@playwright/test';

test('Verify Product Browsing in Men\'s Category', async ({ page }) => {
  // Step 1: Navigate to the Men's category page using the main navigation menu
  await page.goto('https://atid.store');
  const mensCategoryLink = page.locator("//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]");
  
  // Ensure the Men's category link is visible and clickable
  await expect(mensCategoryLink).toBeVisible();
  await mensCategoryLink.click();

  // Wait for the Men's category page to load
  await page.waitForURL('https://atid.store/product-category/men/');
  console.log('Navigated to the Men\'s category page.');

  // Step 2: Verify the page title contains 'Men'
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Men');
  console.log('Verified that the page title contains "Men".');

  // Step 3: Scroll through the product listings to view available items
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  console.log('Scrolled through the product listings.');

  // Step 4: Click on the 'ATID Blue Shoes' product link
  const atidBlueShoesLink = page.locator("//a[@href='https://atid.store/product/atid-blue-shoes/' and contains(@class, 'ast-loop-product__link')]");
  
  // Ensure the product link is visible and clickable
  await expect(atidBlueShoesLink).toBeVisible();
  await atidBlueShoesLink.click();

  // Wait for the product details page for 'ATID Blue Shoes' to load
  await page.waitForURL('https://atid.store/product/atid-blue-shoes/');
  console.log('Navigated to the product details page for "ATID Blue Shoes".');

  // Step 5: Verify that the product details page for 'ATID Blue Shoes' loads successfully
  const productTitle = page.locator('h1.product_title');
  await expect(productTitle).toBeVisible();
  await expect(productTitle).toContainText('ATID Blue Shoes');
  console.log('Verified that the product details page for "ATID Blue Shoes" loaded successfully.');
});