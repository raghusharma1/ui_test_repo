/*
 * ⚠️ TEST FAILED AFTER 3 ITERATIONS
 * Test: view_and_edit_user_profile_information
 *
 * Errors are captured in test_iteration_errors_view_and_edit_user_profile_information.md
 * Please review and fix manually.
 */

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import testData from './view_and_edit_user_profile_information.test-data.json';
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;
const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME;

// Capture accessibility tree on failure

test.use({ headless: true }); test.setTimeout(120000);

// Use the first data variation for the test.
// To run with all variations, you can uncomment the loop structure.
const testData_0 = testData.variations[0];

test(`Discovered Workflow: View and Edit User Profile Information - ${testData_0.firstName} ${testData_0.lastName}`, async ({ page }) => {
  // Step 1: Navigate to website homepage
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForURL(new RegExp(BASE_HOST_URL));

  // Step 2: Click on the user profile icon in the navigation bar to open the menu.
  // Captured selectors:
  //   1. page.getByRole('button', { name: 'Profile', exact: true }) (confidence: 96%, strategy: aria_label_exact)
  //   2. page.getByRole('button', { name: 'Profile' }) (confidence: 95%, strategy: role_name)
  //   3. page.locator('#base-ui-_R_rr5am_') (confidence: 75%, strategy: id)
  await page.getByRole('button', { name: 'Profile', exact: true }).click();

  // Step 3: Click on the 'View profile' link from the dropdown menu.
  // Captured selectors:
  //   1. page.locator('a.profileLink-_4S3Tu') (confidence: 84%, strategy: css_tag_semantic_empty)
  //   2. page.locator('.profileLink-_4S3Tu') (confidence: 82%, strategy: css_semantic_empty)
  await page.locator('a.profileLink-_4S3Tu').click();
  // The username in the URL should be parameterized.
  await expect(page).toHaveURL(new RegExp(`${BASE_HOST_URL}/@${UI_SITE_USERNAME.toLowerCase()}`));

  // Step 4: Click the 'Edit profile' link to go to the account settings page.
  // Captured selectors:
  //   1. page.locator('[data-testid="users-route"]').getByRole('link', { name: /Edit profile/ }) (confidence: 98%, strategy: parent_testid_role_regex)
  //   2. page.getByRole('link', { name: /Edit profile/ }) (confidence: 95%, strategy: role_name_regex)
  //   3. page.getByText('Edit') (confidence: 78%, strategy: text_phrase)
  await page.locator('[data-testid="users-route"]').getByRole('link', { name: /Edit profile/ }).click();
  await page.waitForURL(`${BASE_HOST_URL}/account`);

  // Step 5: Enter an updated first name into the 'First name' field.
  // Captured selectors:
  //   1. page.locator('form[action*="account"]').getByRole('textbox', { name: /First name/ }) (confidence: 97%, strategy: form_action_role_regex)
  //   2. page.getByRole('textbox', { name: /First name/ }) (confidence: 95%, strategy: role_name_regex)
  //   3. page.getByLabel('First name') (confidence: 93%, strategy: label_text)
  //   4. page.locator('#user_first_name') (confidence: 75%, strategy: id)
  await page.getByLabel('First name').fill(testData_0.firstName);

  // Step 6: Enter an updated last name into the 'Last name' field.
  // Captured selectors:
  //   1. page.locator('form[action*="account"]').getByRole('textbox', { name: /Last name/ }) (confidence: 97%, strategy: form_action_role_regex)
  //   2. page.getByRole('textbox', { name: /Last name/ }) (confidence: 95%, strategy: role_name_regex)
  //   3. page.getByLabel('Last name') (confidence: 93%, strategy: label_text)
  //   4. page.locator('#user_last_name') (confidence: 75%, strategy: id)
  await page.getByLabel('Last name').fill(testData_0.lastName);

  // Step 7: Click the 'Update account' button to save the changes.
  // Captured selectors:
  //   1. page.locator('form[action*="account"]').getByRole('button', { name: /Update account/ }) (confidence: 97%, strategy: form_action_role_regex)
  //   2. page.getByRole('button', { name: /Update account/ }) (confidence: 95%, strategy: role_name_regex)
  //   3. page.locator('input[value="Update account"]') (confidence: 89%, strategy: css_tag_value)
  await page.getByRole('button', { name: /Update account/ }).click();

  // Final Verification: A confirmation message should appear indicating the profile was updated.
  await expect(page.getByText('Account updated').first()).toBeVisible({ timeout: 10000 });
});