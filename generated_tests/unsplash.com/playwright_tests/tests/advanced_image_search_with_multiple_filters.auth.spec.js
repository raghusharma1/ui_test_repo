/*
 * ⚠️ TEST FAILED AFTER 3 ITERATIONS
 * Test: advanced_image_search_with_multiple_filters
 *
 * Errors are captured in test_iteration_errors_advanced_image_search_with_multiple_filters.md
 * Please review and fix manually.
 */

import 'dotenv/config';
import { test, expect } from '@playwright/test';
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

// Capture accessibility tree on failure

test.use({ headless: true });

test('advanced_image_search_with_multiple_filters', async ({ page }) => {
  // Step 1: Navigate to website homepage
  // Use BASE_URL for initial navigation, fallback to BASE_HOST_URL
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForLoadState('networkidle');

  // Verify navigation to the homepage
  await expect(page).toHaveURL(new RegExp(`^${BASE_HOST_URL}/?$`));

  // Step 2: Enter the search term 'nature' into the main search bar.
  // Captured selectors:
  //   1. page.getByTestId('nav-bar-search-form-input') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.locator('input[type="search"][name="searchKeyword"]') (confidence: 89%, strategy: css_combined, unique: true)
  //   3. page.getByPlaceholder('Search photos and illustrations') (confidence: 85%, strategy: placeholder, unique: true)
  const searchInput = page.getByTestId('nav-bar-search-form-input');
  await searchInput.fill('nature');

  // Step 3: Click the search button to submit the search query for 'nature'.
  // Captured selectors:
  //   1. page.getByTestId('nav-bar-search-form-button') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.getByText('A magnifying glass') (confidence: 88%, strategy: text, unique: true)
  //   3. page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^A magnifying glass$/ }) (confidence: 75%, strategy: button_filter_exact, unique: true)
  await page.getByTestId('nav-bar-search-form-button').click();

  // Wait for navigation to the search results page
  await page.waitForURL(`${BASE_HOST_URL}/s/photos/nature`);

  // Step 4: Click on the 'Orientation' filter button to reveal the filtering options.
  // Captured selectors:
  //   1. page.locator('[data-testid="search-route"]').getByRole('button', { name: 'Orientation' }) (confidence: 98%, strategy: parent_testid_role, unique: true)
  //   2. page.getByRole('button', { name: 'Orientation' }) (confidence: 95%, strategy: role_name, unique: true)
  //   3. page.getByText('Aspect') (confidence: 78%, strategy: text_phrase, unique: true)
  await page.locator('[data-testid="search-route"]').getByRole('button', { name: 'Orientation' }).click();

  // Step 5: Select the 'Landscape' option from the 'Orientation' filter dropdown.
  // The provided selector was low-confidence. Using a more robust role-based selector.
  // Captured selectors:
  //   1. page.locator('a[data-unchecked]') (confidence: 50%, strategy: data_attr_unchecked_presence, unique: false)
  await page.getByRole('link', { name: 'Landscape' }).click();

  // Wait for the URL to update with the orientation filter
  await page.waitForURL(`${BASE_HOST_URL}/s/photos/nature?orientation=landscape`);

  // Step 6: Click on the 'Sort by' filter button to open the sorting options.
  // Captured selectors:
  //   1. page.locator('[data-testid="search-route"]').getByRole('button', { name: /Sort by Relevance/ }) (confidence: 98%, strategy: parent_testid_role_regex, unique: true)
  //   2. page.getByRole('button', { name: /Sort by Relevance/ }) (confidence: 95%, strategy: role_name_regex, unique: true)
  //   3. page.getByText('Unfold') (confidence: 78%, strategy: text_phrase, unique: true)
  await page.locator('[data-testid="search-route"]').getByRole('button', { name: /Sort by/ }).click();

  // Step 7: Refine the search further by clicking the 'forest' related search tag.
  // Using a more specific role-based selector to ensure we click a link.
  // Captured selectors:
  //   1. page.getByText('forest') (confidence: 88%, strategy: text, unique: true)
  //   2. page.locator('[data-testid="search-route"]').getByRole('link', { name: 'Forest' }) (confidence: 98%, strategy: parent_testid_role, unique: false)
  //   3. page.getByRole('link', { name: 'Forest' }) (confidence: 95%, strategy: role_name, unique: false)
  await page.getByRole('link', { name: 'Forest', exact: true }).click();

  // Final verification: Ensure the URL reflects all applied filters and the new search term.
  await page.waitForURL(new RegExp(`${BASE_HOST_URL}/s/photos/forest`));
  await expect(page).toHaveURL(new RegExp('orientation=landscape'));
});