import { test, expect } from '@playwright/test';

test('View Product Details', async ({ page }) => {
  // Step 1: Navigate to the store page
  await page.goto('https://atid.store/store/');

  // Step 2: Verify the store page has loaded
  await expect(page).toHaveURL('https://atid.store/store/');

  // Step 3: Locate the 'Anchor Bracelet' product link
  const productLink = page.locator("//a[@href='https://atid.store/product/anchor-bracelet/' and contains(@class, 'woocommerce-LoopProduct-link')]");

  // Verify that the product link is visible
  await expect(productLink).toBeVisible();

  // Step 4: Click on the product link
  await productLink.click();

  // Step 5: Wait for the product details page to load
  await page.waitForURL('https://atid.store/product/anchor-bracelet/');

  // Step 6: Verify that the product details page has loaded
  await expect(page).toHaveURL('https://atid.store/product/anchor-bracelet/');

  // Step 7: Verify the product name is visible
  const productName = page.locator('h1.product_title.entry-title');
  await expect(productName).toBeVisible();

  // Step 8: Verify the product price is visible
  const productPrice = page.locator('.woocommerce-Price-amount.amount');
  await expect(productPrice).toBeVisible();

  // Step 9: Verify the product description is visible
  const productDescription = page.locator('.woocommerce-product-details__short-description');
  await expect(productDescription).toBeVisible();

  // Step 10: Verify the 'Add to Cart' button is visible and enabled
  const addToCartButton = page.locator('button[name="add-to-cart"]');
  await expect(addToCartButton).toBeVisible();
  await expect(addToCartButton).toBeEnabled();

  // Log success message
  console.log('Test passed: All product details and interactions are visible and functional.');
});