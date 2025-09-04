import { test, expect } from '@playwright/test';

test('Verify Product Search Functionality', async ({ page }) => {
  // Step 1: Navigate to the Store page
  const storePageURL = 'https://atid.store/store/';
  await page.goto(storePageURL);

  // Verify the page loaded correctly
  await expect(page).toHaveURL(storePageURL);

  // Step 2: Locate the search bar on the page
  const searchBar = page.locator('#wc-block-search__input-1');
  await expect(searchBar).toBeVisible();

  // Step 3: Enter the product name 'Anchor Bracelet' into the search bar
  const productName = 'Anchor Bracelet';
  await searchBar.fill(productName);

  // Step 4: Click the 'Search' button
  const searchButton = page.locator('button[aria-label="Search"]');
  await expect(searchButton).toBeVisible();
  await searchButton.click();

  // Step 5: Wait for the search results page to load
  await page.waitForNavigation();

  // Step 6: Verify that the product 'Anchor Bracelet' appears in the search results
  const searchResult = page.locator('text=Anchor Bracelet');
  await expect(searchResult).toBeVisible();

  // Step 7: Clear the search bar and enter a non-existent product name
  const nonExistentProductName = 'NonExistentProduct';
  await searchBar.fill(nonExistentProductName);

  // Step 8: Click the 'Search' button again
  await searchButton.click();

  // Step 9: Verify that a 'No products found' message is displayed
  const noProductsMessage = page.locator('text=No products found');
  await expect(noProductsMessage).toBeVisible();
});