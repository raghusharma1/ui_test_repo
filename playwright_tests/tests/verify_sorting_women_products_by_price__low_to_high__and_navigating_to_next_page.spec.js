import { test, expect } from '@playwright/test';

test('Verify Sorting Women Products by Price (Low to High) and Navigating to Next Page', async ({ page }) => {
  // Step 1: Navigate to the Women category page
  const womenCategoryUrl = 'https://atid.store/product-category/women/';
  await page.goto(womenCategoryUrl);

  // Verify the page has loaded correctly
  await expect(page).toHaveURL(womenCategoryUrl);

  // Step 2: Locate the sorting dropdown and select 'Sort by price: low to high'
  const sortingDropdown = page.locator('select[aria-label="Shop order"]');
  await expect(sortingDropdown).toBeVisible();
  await sortingDropdown.selectOption({ label: 'Sort by price: low to high' });

  // Step 3: Verify that the product list updates to reflect the selected sorting option
  // (Assume we wait for some kind of API response or page update)
  await page.waitForTimeout(1000); // Give some time for the sorting to apply visually
  // You can verify specific elements if unique identifiers for sorted products are available

  // Step 4: Scroll down to the bottom of the product list
  await page.locator('.products').scrollIntoViewIfNeeded();

  // Step 5: Locate and click the pagination link labeled '2'
  const paginationLink = page.locator("//a[@href='https://atid.store/product-category/women/page/2/' and contains(@class, 'page-numbers')]");
  await expect(paginationLink).toBeVisible();
  await paginationLink.click();

  // Step 6: Verify that the second page of products is displayed
  const secondPageUrl = 'https://atid.store/product-category/women/page/2/';
  await page.waitForURL(secondPageUrl);
  await expect(page).toHaveURL(secondPageUrl);

  // Step 7: Check that the products on the second page are sorted by price in ascending order
  // (Assume we have a way to validate product prices, e.g., through a data attribute or displayed text)
  const productPrices = page.locator('.products .price');
  const prices = await productPrices.allInnerTexts();
  const parsedPrices = prices.map(price => parseFloat(price.replace(/[^0-9.]/g, '')));
  const isSortedAscending = parsedPrices.every((value, index, array) => index === 0 || array[index - 1] <= value);
  
  // Assert that prices are sorted in ascending order
  expect(isSortedAscending).toBeTruthy();

  console.log('Test passed: Products are sorted by price (low to high) and the second page is displayed correctly.');
});