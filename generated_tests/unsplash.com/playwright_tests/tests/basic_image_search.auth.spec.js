import 'dotenv/config';
import { test, expect } from '@playwright/test';
import testData from './basic_image_search.test-data.json';
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

// Capture accessibility tree on failure

test.setTimeout(120000);

// Using the first data variation for this test run.
const testData_0 = testData.variations[0];

test.use({ headless: true });
test(`Discovered Workflow: Basic Image Search for '${testData_0.searchTerm}'`, async ({ page }) => {
  // Step 1: Navigate to website homepage
  // The test starts at the application's entry point. Authentication is handled by pre-configured storage state.
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForURL(new RegExp(BASE_HOST_URL));

  // Step 2: Enter the search term into the main search bar.
  // Captured selectors:
  //   1. page.getByTestId('nav-bar-search-form-input') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.locator('input[type="search"][name="searchKeyword"]') (confidence: 89%, strategy: css_combined, unique: true)
  //   3. page.getByPlaceholder('Search photos and illustrations') (confidence: 85%, strategy: placeholder, unique: true)
  const searchInput = page.getByTestId('nav-bar-search-form-input');
  await searchInput.waitFor({ state: 'visible', timeout: 30000 });
  await searchInput.fill(testData_0.searchTerm);

  // Step 3: Click the search button to submit the search query.
  // Captured selectors:
  //   1. page.getByTestId('nav-bar-search-form-button') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.getByText('A magnifying glass') (confidence: 88%, strategy: text, unique: true)
  //   3. page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^A magnifying glass$/ }) (confidence: 75%, strategy: button_filter_exact, unique: true)
  const searchButton = page.getByTestId('nav-bar-search-form-button');
  await searchButton.click();

  // Step 4: Verify that the page URL corresponds to the search results.
  // This confirms that the core search functionality has successfully completed.
  const expectedUrl = `${BASE_HOST_URL}/s/photos/${testData_0.searchTerm}`;
  await page.waitForURL(expectedUrl, { timeout: 30000 });
  await expect(page).toHaveURL(expectedUrl);
});