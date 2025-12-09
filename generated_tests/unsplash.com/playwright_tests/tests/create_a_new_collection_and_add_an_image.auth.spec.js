/*
 * ⚠️ TEST FAILED AFTER 3 ITERATIONS
 * Test: create_a_new_collection_and_add_an_image
 *
 * Errors are captured in test_iteration_errors_create_a_new_collection_and_add_an_image.md
 * Please review and fix manually.
 */

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import testData from './create_a_new_collection_and_add_an_image.test-data.json';
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

// Use the first variation of test data
const variation = testData.variations[0];
// Append a timestamp to the collection name to ensure uniqueness for each test run
const collectionName = `${variation.collectionName} ${Date.now()}`;
const collectionDescription = variation.collectionDescription;
const searchTerm = variation.searchTerm;

test.use({ headless: true });

test('Discovered Workflow: Create a New Collection and Add an Image', async ({ page }) => {
  // Step 1: Navigate to website homepage
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForURL(`${BASE_HOST_URL}/`);

  // Step 2: Enter the search term 'nature' into the main search bar.
  // Captured selectors:
  //   1. page.getByTestId('nav-bar-search-form-input') (confidence: 100%, strategy: testid)
  await page.getByTestId('nav-bar-search-form-input').fill(searchTerm);

  // Step 3: Click the search button to find images of 'nature'.
  // Captured selectors:
  //   1. page.getByTestId('nav-bar-search-form-button') (confidence: 100%, strategy: testid)
  await page.getByTestId('nav-bar-search-form-button').click();
  await page.waitForURL(`${BASE_HOST_URL}/s/photos/${searchTerm}`);
  
  // Wait for search results to load
  await page.waitForLoadState('networkidle');

  // Step 4: Click on an image from the search results to view its details.
  // Using a more robust selector to click the first image result, as provided selectors are brittle.
  await page.locator('figure[itemprop="image"] a').first().click();
  await page.waitForURL(new RegExp(`${BASE_HOST_URL}/photos/.*`));

  // Wait for the image detail page to load completely.
  await page.waitForLoadState('networkidle');

  // Step 5: Click the 'Add to Collection' button (plus icon) to open the collections dialog.
  // The provided selector is a dynamic ID and highly unstable. Using a more robust role-based selector.
  await page.getByRole('button', { name: 'Add to collection' }).click();

  // Step 6: Click the button to start creating a new collection.
  // Captured selectors:
  //   1. page.locator('button.createCollectionButton-G8yTlC') (confidence: 84%, strategy: css_tag_semantic_empty)
  //   2. page.locator('.createCollectionButton-G8yTlC') (confidence: 82%, strategy: css_semantic_empty)
  await page.getByRole('button', { name: 'Create new collection' }).click();

  // Step 7: Enter title for the new collection.
  // Captured selectors:
  //   1. page.locator('input[type="text"][name="title"]') (confidence: 89%, strategy: css_combined)
  //   2. page.locator('input[name="title"]') (confidence: 87%, strategy: name_attribute)
  //   3. page.getByPlaceholder('Beautiful photos') (confidence: 85%, strategy: placeholder)
  await page.locator('input[type="text"][name="title"]').fill(collectionName);

  // Step 8: Enter a description for the new collection.
  // Captured selectors:
  //   1. page.locator('textarea[name="description"]') (confidence: 87%, strategy: name_attribute)
  //   2. page.locator('textarea.textArea-LW4jKs') (confidence: 78%, strategy: css_stable_class)
  await page.locator('textarea[name="description"]').fill(collectionDescription);

  // Step 9: Click the 'Create collection' button to finalize its creation.
  // Captured selectors:
  //   1. page.locator('[role="dialog"]').getByRole('button', { name: 'Create collection' }) (confidence: 95%, strategy: portal_role_name)
  //   2. page.getByRole('button', { name: /Create collection/ }) (confidence: 95%, strategy: role_name_regex)
  //   3. page.getByText('Create collection') (confidence: 88%, strategy: text)
  await page.locator('[role="dialog"]').getByRole('button', { name: 'Create collection' }).click();

  // Final verification: A confirmation should appear indicating the collection was created.
  await expect(page.getByText(`Added to ${collectionName}`).first()).toBeVisible({ timeout: 15000 });
});