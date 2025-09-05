import { test, expect } from '@playwright/test';

test('Sort Products by Popularity', async ({ page }) => {
  // Step 1: Navigate to the store page
  const storePageUrl = 'https://atid.store/store/';
  await page.goto(storePageUrl);

  // Verify that the page URL matches the expected store page URL
  await expect(page).toHaveURL(storePageUrl);

  // Step 2: Locate the sorting dropdown menu
  const sortingDropdown = page.locator('select[aria-label="Shop order"]');
  await expect(sortingDropdown).toBeVisible(); // Ensure the dropdown is visible

  // Step 3: Select the 'Sort by popularity' option from the dropdown
  await sortingDropdown.selectOption({ label: 'Sort by popularity' });

  // Step 4: Wait for the products list to refresh
  await page.waitForLoadState('networkidle'); // Wait for network requests to settle

  // Step 5: Verify that products are sorted based on popularity rankings
  // Note: This verification assumes you have a way to check that products are sorted
  //       based on popularity, such as inspecting product order or a popularity indicator.

  const productList = page.locator('.products .product'); // Selector for product items
  await expect(productList).toHaveCountGreaterThan(0); // Ensure products are displayed

  // Example of verifying the first product (if there's a popularity indicator on products)
  try {
    const firstProduct = productList.nth(0); // Get the first product
    const popularityIndicator = firstProduct.locator('.popularity'); // Adjust if there's a popularity class/element
    await expect(popularityIndicator).toBeVisible(); // Ensure the popularity indicator is visible
  } catch (error) {
    console.error('Error verifying product order or popularity:', error);
    throw error; // Fail the test if verification fails
  }

  // Additional Accessibility Check: Ensure dropdown is keyboard accessible
  await sortingDropdown.focus();
  await expect(sortingDropdown).toBeFocused(); // Verify focus is on the dropdown
});