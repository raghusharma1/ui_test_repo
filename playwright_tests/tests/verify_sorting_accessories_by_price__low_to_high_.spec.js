import { test, expect } from '@playwright/test';

test('Verify Sorting Accessories by Price (Low to High)', async ({ page }) => {
  // Step 1: Navigate to the Accessories category page
  const accessoriesPageUrl = 'https://atid.store/product-category/accessories/';
  await page.goto(accessoriesPageUrl);

  // Verify that the page loaded correctly
  await expect(page).toHaveURL(accessoriesPageUrl);

  // Step 2: Locate the sort dropdown menu
  const sortDropdown = page.locator('select[aria-label="Shop order"]');
  await expect(sortDropdown).toBeVisible();

  // Step 3: Select 'Sort by price: low to high' from the dropdown options
  await sortDropdown.selectOption({ label: 'Sort by price: low to high' });

  // Step 4: Verify that the page reloads or updates dynamically
  await page.waitForURL(accessoriesPageUrl);

  // Step 5: Scroll through the list of sorted products
  const productPrices = page.locator('.woocommerce-Price-amount');
  await expect(productPrices).toBeVisible();

  // Collect all displayed product prices
  const prices = await productPrices.evaluateAll(elements => 
    elements.map(el => parseFloat(el.textContent.replace(/[^0-9.]/g, '')))
  );

  // Step 6: Verify that the products are displayed in ascending order of price
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i] > prices[i + 1]) {
      throw new Error('Products are not sorted by price in ascending order.');
    }
  }
  console.log('Products are sorted by price in ascending order.');

  // Step 7: Click on a product to view its details
  const firstProduct = page.locator('.products .product').first();
  await firstProduct.click();

  // Step 8: Verify that the product price matches the order
  const productPagePrice = page.locator('.woocommerce-Price-amount');
  await expect(productPagePrice).toBeVisible();

  const productPrice = parseFloat(await productPagePrice.textContent().replace(/[^0-9.]/g, ''));
  if (productPrice !== prices[0]) {
    throw new Error('Product price does not match the sorted order.');
  }
  console.log('Product price matches the sorted order.');
});