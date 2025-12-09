/*
 * ⚠️ TEST FAILED AFTER 3 ITERATIONS
 * Test: attempt_invalid_image_upload_and_gracefully_cancel
 *
 * Errors are captured in test_iteration_errors_attempt_invalid_image_upload_and_gracefully_cancel.md
 * Please review and fix manually.
 */

import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// This test fails due to a configuration issue (running headed in a headless environment).
// The fix is to set 'headless: true' in playwright.config.js or to not use the --headed flag in a headless environment (e.g., CI/CD).
// Since the test code itself is not the source of the error, no changes are made to the logic.
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

// Capture accessibility tree on failure

test.setTimeout(120000);

test('Discovered Workflow: Attempt Invalid Image Upload and Gracefully Cancel', async ({ page }) => {
  // Step 1: Navigate to website homepage
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForLoadState('load');
  await expect(page).toHaveURL(new RegExp(`^${BASE_HOST_URL}/?$`));

  // Step 2: Click the 'Submit an image' button to open the upload modal.
  // Captured selectors:
  //   1. page.getByRole('button', { name: /Submit an image/ }) (confidence: 95%, strategy: role_name_regex)
  //   2. page.getByText('Submit an image') (confidence: 88%, strategy: text)
  await page.getByRole('button', { name: /Submit an image/ }).click();
  await page.waitForURL(/modal=%5B%22Uploader%22%2C%5B%22Publish%22%2Cnull%5D%5D/);

  // Step 3: Agree to the terms by clicking the 'I understand and agree' checkbox.
  // Captured selectors:
  //   1. page.locator('form[action*="..."]').getByRole('checkbox', { name: /I understand and agree/ }) (confidence: 97%, strategy: form_action_role_regex)
  //   2. page.getByRole('checkbox', { name: /I understand and agree/ }) (confidence: 95%, strategy: role_name_regex)
  //   3. page.getByLabel('I understand and agree') (confidence: 93%, strategy: label_text)
  await page.getByRole('checkbox', { name: /I understand and agree/ }).click();

  // Step 4: Click the 'Start uploading' button and handle the file chooser with an invalid file.
  // Captured selectors:
  //   1. page.locator('form[action*="..."]').getByRole('button', { name: /Start uploading/ }) (confidence: 97%, strategy: form_action_role_regex)
  //   2. page.getByRole('button', { name: /Start uploading/ }) (confidence: 95%, strategy: role_name_regex)
  //   3. page.getByText('Start uploading') (confidence: 88%, strategy: text)
  
  // Prepare to intercept the file chooser dialog
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: /Start uploading/ }).click();
  const fileChooser = await fileChooserPromise;

  // Create a dummy invalid file (e.g., a text file)
  const invalidFilePath = path.join(__dirname, 'invalid-file.txt');
  fs.writeFileSync(invalidFilePath, 'This is an invalid file for an image upload.');

  // Set the invalid file for upload
  await fileChooser.setFiles(invalidFilePath);

  // Clean up the dummy file
  fs.unlinkSync(invalidFilePath);

  // Step 5: Acknowledge the invalid file type error by clicking 'OK, got it'.
  // Captured selectors:
  //   1. page.locator('[role="dialog"]').getByRole('button', { name: 'OK, got it' }) (confidence: 95%, strategy: portal_role_name)
  //   2. page.getByRole('button', { name: /OK, got it/ }) (confidence: 95%, strategy: role_name_regex)
  //   3. page.getByText('OK, got it') (confidence: 88%, strategy: text)
  await page.locator('[role="dialog"]').getByRole('button', { name: 'OK, got it' }).click();

  // Step 6: Cancel the submission process by clicking the 'Cancel' button.
  // Captured selectors:
  //   1. page.locator('[role="dialog"]').getByRole('button', { name: 'Cancel' }) (confidence: 95%, strategy: portal_role_name)
  //   2. page.getByRole('button', { name: 'Cancel' }) (confidence: 95%, strategy: role_name)
  await page.locator('[role="dialog"]').getByRole('button', { name: 'Cancel' }).click();
  
  // Verification: The upload modal should close, and the user should be returned to the homepage.
  await page.waitForURL(new RegExp(`^${BASE_HOST_URL}/?$`));
  await expect(page).toHaveURL(new RegExp(`^${BASE_HOST_URL}/?$`));
  await expect(page.getByRole('button', { name: /Submit an image/ })).toBeVisible();
});