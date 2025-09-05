import { test, expect } from '@playwright/test';

test('Verify Search Functionality for Products', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('https://atid.store');

  // Verify that the homepage loaded correctly
  await expect(page).toHaveURL('https://atid.store');
  console.log('Navigated to the homepage successfully.');

  // Step 2: Locate and click on the 'Search' button in the header
  try {
    const searchButton = page.locator("//a[@href='#' and contains(@class, 'slide-search')]");
    await searchButton.click();
    console.log('Clicked on the Search button.');
  } catch (error) {
    console.error('Search button is non-clickable or missing:', error);
    throw error;
  }

  // Step 3: Type 'Yellow Shoes' into the search input field
  try {
    const searchInput = page.locator('input[placeholder="Search …"], input[type="search"]');
    await searchInput.fill('Yellow Shoes');
    console.log('Typed "Yellow Shoes" into the search input field.');
  } catch (error) {
    console.error('Failed to locate or interact with the search input field:', error);
    throw error;
  }

  // Step 4: Submit the search query by pressing Enter
  try {
    const searchInput = page.locator('input[placeholder="Search …"], input[type="search"]');
    await searchInput.press('Enter');
    console.log('Submitted the search query.');
  } catch (error) {
    console.error('Failed to submit the search query:', error);
    throw error;
  }

  // Step 5: Verify that the search results page displays products related to 'Yellow Shoes'
  try {
    await page.waitForURL(/.*\?s=Yellow\+Shoes.*/);
    const searchResultsTitle = page.locator('h1.entry-title');
    await expect(searchResultsTitle).toContainText('Search Results for: Yellow Shoes');
    console.log('Search results for "Yellow Shoes" are displayed.');
  } catch (error) {
    console.error('Search results page failed to load or display correctly:', error);
    throw error;
  }

  // Step 6: Click on the product link for 'ATID Yellow Shoes' from the search results
  try {
    const productLink = page.locator("//a[@href='https://atid.store/product/atid-yellow-shoes/' and contains(@class, 'ast-loop-product__link')]");
    await productLink.click();
    console.log('Clicked on the product link for "ATID Yellow Shoes".');
  } catch (error) {
    console.error('Failed to click on the product link for "ATID Yellow Shoes":', error);
    throw error;
  }

  // Step 7: Verify that the product detail page for 'ATID Yellow Shoes' is displayed
  try {
    await page.waitForURL('https://atid.store/product/atid-yellow-shoes/');
    const productTitle = page.locator('h1.product_title.entry-title');
    await expect(productTitle).toContainText('ATID Yellow Shoes');
    console.log('The product detail page for "ATID Yellow Shoes" is displayed.');
  } catch (error) {
    console.error('The product detail page for "ATID Yellow Shoes" failed to load or display correctly:', error);
    throw error;
  }
});