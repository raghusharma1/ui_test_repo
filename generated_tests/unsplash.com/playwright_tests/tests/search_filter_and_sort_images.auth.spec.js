/*
 * ⚠️ TEST FAILED AFTER 3 ITERATIONS
 * Test: search_filter_and_sort_images
 *
 * Errors are captured in test_iteration_errors_search_filter_and_sort_images.md
 * Please review and fix manually.
 */

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import testData from './search_filter_and_sort_images.test-data.json';
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

// Capture accessibility tree on failure

test.use({ timeout: 120000, headless: true });

const testData_0 = testData.variations[0];

test(`Discovered Workflow: Search, Filter, and Sort Images - ${testData_0.searchTerm}`, async ({ page }) => {
  // Step 1: Navigate to website homepage
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForURL(new RegExp(`^${BASE_HOST_URL}/?$`));

  // Step 2: Enter the search term into the main search bar.
  // Captured selectors:
  //   1. page.getByTestId('nav-bar-search-form-input') (confidence: 100%, strategy: testid)
  //   2. page.locator('input[type="search"][name="searchKeyword"]') (confidence: 89%, strategy: css_combined)
  //   3. page.locator('input[type="search"]') (confidence: 88%, strategy: input_type)
  //   4. page.locator('input[name="searchKeyword"]') (confidence: 87%, strategy: name_attribute)
  //   5. page.getByPlaceholder('Search photos and illustrations') (confidence: 85%, strategy: placeholder)
  await page.getByTestId('nav-bar-search-form-input').fill(testData_0.searchTerm);

  // Step 3: Click the search button to execute the search.
  // Captured selectors:
  //   1. page.getByTestId('nav-bar-search-form-button') (confidence: 100%, strategy: testid)
  //   2. page.getByText('A magnifying glass') (confidence: 88%, strategy: text)
  //   3. page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^A magnifying glass$/ }) (confidence: 75%, strategy: button_filter_exact)
  await page.getByTestId('nav-bar-search-form-button').click();
  await page.waitForURL(`${BASE_HOST_URL}/s/photos/${testData_0.searchTerm}`);

  // Step 4: Click on the 'Orientation' filter button.
  // Captured selectors:
  //   1. page.locator('[data-testid="search-route"]').getByRole('button', { name: 'Orientation' }) (confidence: 98%, strategy: parent_testid_role)
  //   2. page.getByRole('button', { name: 'Orientation' }) (confidence: 95%, strategy: role_name)
  //   3. page.getByText('Aspect') (confidence: 78%, strategy: text_phrase)
  //   4. page.locator('#base-ui-_r_8m_') (confidence: 75%, strategy: id)
  await page.getByRole('button', { name: 'Orientation' }).click();

  // Step 5: Select the 'Landscape' orientation from the dropdown menu.
  // Captured selectors:
  //   1. page.locator('a[data-unchecked]') (confidence: 50%, strategy: data_attr_unchecked_presence)
  // Using a more specific locator based on the step description for stability.
  await page.getByRole('link', { name: 'Landscape' }).click();
  await page.waitForURL(`${BASE_HOST_URL}/s/photos/${testData_0.searchTerm}?orientation=landscape`);

  // Step 6: Click on the 'Sort by' filter button.
  // Captured selectors:
  //   1. page.locator('[data-testid="search-route"]').getByRole('button', { name: /Sort by Relevance/ }) (confidence: 98%, strategy: parent_testid_role_regex)
  //   2. page.getByRole('button', { name: /Sort by Relevance/ }) (confidence: 95%, strategy: role_name_regex)
  //   3. page.getByText('Unfold') (confidence: 78%, strategy: text_phrase)
  //   4. page.locator('#base-ui-_r_8s_') (confidence: 75%, strategy: id)
  await page.locator('[data-testid="search-route"]').getByRole('button', { name: /Sort by/ }).click();

  // Step 7: Select the 'Newest' sort option from the dropdown menu.
  // Captured selectors:
  //   1. page.locator('a[data-unchecked]') (confidence: 50%, strategy: data_attr_unchecked_presence)
  // Using a more specific locator based on the step description for stability.
  await page.getByRole('link', { name: 'Newest' }).click();
  
  // Final verification: Ensure the URL contains both filter and sort parameters.
  // The order of parameters can vary, so we check for both.
  await expect(page).toHaveURL(new RegExp(`${BASE_HOST_URL}/s/photos/${testData_0.searchTerm}.*orientation=landscape`));
  await expect(page).toHaveURL(new RegExp(`${BASE_HOST_URL}/s/photos/${testData_0.searchTerm}.*order_by=latest`));
});