import 'dotenv/config';
import { test, expect } from '@playwright/test';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

// Capture accessibility tree on failure

test.setTimeout(120000);

test('View Credit Card Details with OTP Verification', async ({ page }) => {
  // Step 1: Navigate to website homepage
  // Navigate to the application's starting URL. Authentication is handled by storage state.
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(new RegExp(`^${BASE_HOST_URL}`));

  // Step 2: Click the 'View card details' button on the homepage
  // Captured selectors:
  //   1. page.getByTestId('home-view-cards-button').getByText('צפייה בפרטי כרטיס') (confidence: 99%, strategy: roost_primary, unique: true)
  //   2. page.getByText('צפייה בפרטי כרטיס') (confidence: 88%, strategy: text, unique: false)
  //   3. page.locator('[data-testid="home-view-cards-button"]').locator('div') (confidence: 75%, strategy: css, unique: true)
  await page.getByTestId('home-view-cards-button').getByText('צפייה בפרטי כרטיס').click();
  await page.waitForURL(`${BASE_HOST_URL}/#/cards`);

  // Step 3: Select the Mastercard ending in 1425
  // Captured selectors:
  //   1. page.getByTestId('card-item-1425') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.locator('div.card-item') (confidence: 78%, strategy: css, unique: false)
  await page.getByTestId('card-item-1425').click();

  // Step 4: Click the 'Continue' button
  // Captured selectors:
  //   1. page.getByTestId('continue-button') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.getByRole('button', { name: 'המשך' }) (confidence: 95%, strategy: role, unique: true)
  //   3. page.getByText('המשך') (confidence: 88%, strategy: text, unique: true)
  await page.getByTestId('continue-button').click();
  await page.waitForURL(`${BASE_HOST_URL}/#/cards/preview`);

  // Step 5: Click the 'View card details' button on the preview page
  // Captured selectors:
  //   1. page.getByTestId('view-card-details-button') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.getByRole('button', { name: /לצפייה בפרטי הכרטיס/ }) (confidence: 95%, strategy: role, unique: true)
  //   3. page.getByText('לצפייה בפרטי הכרטיס') (confidence: 88%, strategy: text, unique: true)
  await page.getByTestId('view-card-details-button').click();
  await page.waitForURL(`${BASE_HOST_URL}/#/cards/otp`);

  // Step 6: Enter the first digit '1' of the OTP code
  // Captured selectors:
  //   1. page.getByTestId('otp-input-0') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.locator('input.otp-input') (confidence: 69%, strategy: css, unique: false)
  await page.getByTestId('otp-input-0').fill('1');

  // Step 7: Enter the second digit '2' of the OTP code
  // Captured selectors:
  //   1. page.getByTestId('otp-input-1') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.locator('input.otp-input') (confidence: 69%, strategy: css, unique: false)
  await page.getByTestId('otp-input-1').fill('2');

  // Step 8: Enter the third digit '2' of the OTP code
  // Captured selectors:
  //   1. page.getByTestId('otp-input-2') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.locator('input.otp-input') (confidence: 69%, strategy: css, unique: false)
  await page.getByTestId('otp-input-2').fill('2');

  // Step 9: Enter the fourth digit '0' of the OTP code
  // Captured selectors:
  //   1. page.getByTestId('otp-input-3') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.locator('input.otp-input') (confidence: 69%, strategy: css, unique: false)
  await page.getByTestId('otp-input-3').fill('0');

  // Step 10: Enter the fifth digit '7' of the OTP code
  // Captured selectors:
  //   1. page.getByTestId('otp-input-4') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.locator('input.otp-input') (confidence: 69%, strategy: css, unique: false)
  await page.getByTestId('otp-input-4').fill('7');

  // Step 11: Enter the final digit '4' of the OTP code
  // Captured selectors:
  //   1. page.getByTestId('otp-input-5') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.locator('input.otp-input') (confidence: 69%, strategy: css, unique: false)
  await page.getByTestId('otp-input-5').fill('4');

  // Step 12: Click the 'Continue' button to submit the OTP
  // Captured selectors:
  //   1. page.getByTestId('verify-otp-button') (confidence: 100%, strategy: testid, unique: true)
  //   2. page.getByRole('button', { name: 'המשך' }) (confidence: 95%, strategy: role, unique: true)
  //   3. page.getByText('המשך') (confidence: 88%, strategy: text, unique: true)
  await page.getByTestId('verify-otp-button').click();
  await page.waitForURL(`${BASE_HOST_URL}/#/cards/details`);

  // Step 13: Click the 'Finish' button after viewing the card details
  // Captured selectors:
  //   1. page.getByRole('button', { name: 'סיום' }) (confidence: 95%, strategy: role, unique: true)
  //   2. page.getByText('סיום') (confidence: 88%, strategy: text, unique: true)
  //   3. page.locator('button.btn.btn-secondary') (confidence: 80%, strategy: css, unique: true)
  await page.getByRole('button', { name: 'סיום' }).click();

  // Final Verification: Ensure the page navigates to the success screen
  await page.waitForURL(`${BASE_HOST_URL}/#/success`);
  await expect(page).toHaveURL(`${BASE_HOST_URL}/#/success`);
});