import { test, expect } from '@playwright/test';

test('Search for a Product Using the Search Bar', async ({ page }) => {
  // Step 1: Navigate to the homepage
  const homepageURL = 'https://atid.store/';
  await page.goto(homepageURL);
  await expect(page).toHaveURL(homepageURL);

  // Step 2: Locate the search bar in the header
  const searchBar = page.locator("//input[@type='search' and @placeholder='Search']");
  await expect(searchBar).toBeVisible();

  // Step 3: Click on the search bar to activate it
  await searchBar.click();

  // Step 4: Type the product name 'Dark Brown Jeans' into the search bar
  const productName = 'Dark Brown Jeans';
  await searchBar.fill(productName);

  // Step 5: Press Enter to initiate the search
  await searchBar.press('Enter');
  const searchResultsURL = 'https://atid.store/search';
  await page.waitForURL(searchResultsURL);

  // Step 6: Verify the search results page loads with relevant products matching the query
  await expect(page).toHaveURL(searchResultsURL);

  // Step 7: Locate the product 'Dark Brown Jeans' in the search results
  const productLinkSelector = "//a[@href='https://atid.store/product/dark-brown-jeans/' and contains(@class, 'ast-loop-product__link')]";
  const productLink = page.locator(productLinkSelector);
  await expect(productLink).toBeVisible();
  await expect(productLink).toContainText(productName);

  // Step 8: Click on the product link to view its detailed page
  await productLink.click();
  const productDetailsURL = 'https://atid.store/product/dark-brown-jeans/';
  await page.waitForURL(productDetailsURL);

  // Step 9: Verify the detailed product page has loaded correctly
  await expect(page).toHaveURL(productDetailsURL);
  await expect(page.locator('h1')).toContainText(productName);

  console.log('Test completed successfully: Product search and navigation verified.');
});