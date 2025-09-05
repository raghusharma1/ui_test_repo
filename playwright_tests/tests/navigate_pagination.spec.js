import { test, expect } from '@playwright/test';

test('Navigate Pagination', async ({ page }) => {
  // Step 1: Navigate to the store page
  await page.goto('https://atid.store/store/');
  
  // Verify the initial page URL
  await expect(page).toHaveURL('https://atid.store/store/');
  
  // Step 2: Locate the pagination controls at the bottom of the page
  const paginationToPage2 = page.locator("//a[@href='https://atid.store/store/page/2/' and contains(@class, 'page-numbers')]");
  await expect(paginationToPage2).toBeVisible();

  // Step 3: Click on the '2' link to navigate to page 2
  await paginationToPage2.click();

  // Step 4: Wait for the page to load
  await page.waitForURL('https://atid.store/store/page/2/');

  // Step 5: Verify the URL changes to page 2 and products on page 2 are displayed
  await expect(page).toHaveURL('https://atid.store/store/page/2/');
  const productsOnPage2 = page.locator('.products'); // Assuming a class 'products' is used for the listings
  await expect(productsOnPage2).toBeVisible();

  // Step 6: Click on the 'Next page' link to navigate to page 3
  const paginationToPage3 = page.locator("//a[@href='https://atid.store/store/page/3/' and contains(@class, 'page-numbers')]");
  await expect(paginationToPage3).toBeVisible();
  await paginationToPage3.click();

  // Step 7: Wait for the page to load
  await page.waitForURL('https://atid.store/store/page/3/');

  // Step 8: Verify the URL changes to page 3 and products on page 3 are displayed
  await expect(page).toHaveURL('https://atid.store/store/page/3/');
  const productsOnPage3 = page.locator('.products'); // Assuming the same class 'products' is used for listings
  await expect(productsOnPage3).toBeVisible();

  // Optional logging for debugging
  console.log('Pagination navigation test completed successfully.');
});