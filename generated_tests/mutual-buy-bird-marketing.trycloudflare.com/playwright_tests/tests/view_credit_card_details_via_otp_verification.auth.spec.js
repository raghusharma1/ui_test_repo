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

test('view_credit_card_details_via_otp_verification', async ({ page }) => {
  // Step 1: Navigate to website homepage
  // Authentication is handled by storage state, so we navigate directly to the starting URL.
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForURL(`${BASE_HOST_URL}/#/home`);

  // Step 2: Click on the 'View card details' link
  // Captured selectors:
  //   1. page.getByTestId('home-view-cards-button').getByText('צפייה בפרטי כרטיס') (confidence: 99%, strategy: roost_primary)
  //   2. page.getByText('צפייה בפרטי כרטיס') (confidence: 88%, strategy: text)
  //   3. page.locator('[data-testid="home-view-cards-button"]').locator('div') (confidence: 75%, strategy: css)
  await page.getByTestId('home-view-cards-button').getByText('צפייה בפרטי כרטיס').click();
  await page.waitForURL(`${BASE_HOST_URL}/#/cards`);

  // Step 3: Select the first available credit card from the list
  // Captured selectors:
  //   1. page.locator('.card-image').first() (confidence: 99%, strategy: roost_primary)
  //   2. page.locator('div.mastercard') (confidence: 84%, strategy: css)
  //   3. page.locator('.mastercard') (confidence: 82%, strategy: css)
  await page.locator('.card-image').first().click();

  // Step 4: Click the 'Continue' button after selecting a credit card
  // Captured selectors:
  //   1. page.getByTestId('continue-button') (confidence: 100%, strategy: testid)
  //   2. page.getByRole('button', { name: 'המשך' }) (confidence: 95%, strategy: role)
  //   3. page.getByText('המשך') (confidence: 88%, strategy: text)
  await page.getByTestId('continue-button').click();
  await page.waitForURL(`${BASE_HOST_URL}/#/cards/preview`);

  // Step 5: Click the 'View card details' button on the preview page
  // Captured selectors:
  //   1. page.getByTestId('view-card-details-button') (confidence: 100%, strategy: testid)
  //   2. page.getByRole('button', { name: /לצפייה בפרטי הכרטיס/ }) (confidence: 95%, strategy: role)
  //   3. page.getByText('לצפייה בפרטי הכרטיס') (confidence: 88%, strategy: text)
  await page.getByTestId('view-card-details-button').click();
  await page.waitForURL(`${BASE_HOST_URL}/#/cards/otp`);

  // Step 6: Enter the 6-digit One-Time Password '122074' into the input fields
  // Captured selectors:
  //   1. page.getByTestId('otp-input-5') (confidence: 100%, strategy: testid)
  //   2. page.locator('input.otp-input') (confidence: 69%, strategy: css)
  //   3. page.locator('.otp-input') (confidence: 67%, strategy: css)
  // Note: The primary selector targets only the last input. A more robust approach is to fill each input individually.
  const otpCode = '122074';
  const otpDigits = otpCode.split('');
  for (let i = 0; i < otpDigits.length; i++) {
    await page.getByTestId(`otp-input-${i}`).fill(otpDigits[i]);
  }

  // Step 7: Click the 'Continue' button to submit the entered OTP
  // Captured selectors:
  //   1. page.getByTestId('verify-otp-button') (confidence: 100%, strategy: testid)
  //   2. page.getByRole('button', { name: 'המשך' }) (confidence: 95%, strategy: role)
  //   3. page.getByText('המשך') (confidence: 88%, strategy: text)
  await page.getByTestId('verify-otp-button').click();
  await page.waitForURL(`${BASE_HOST_URL}/#/cards/details`);

  // Step 8: Click the 'Finish' button on the card details page
  // Captured selectors:
  //   1. page.getByRole('button', { name: 'סיום' }) (confidence: 99%, strategy: role)
  //   2. page.getByText('סיום') (confidence: 88%, strategy: text)
  //   3. page.locator('#root').getByRole('button', { name: 'סיום' }) (confidence: 82%, strategy: role)
  await page.getByRole('button', { name: 'סיום' }).click();

  // Final Verification: Ensure the page navigates to the success screen
  await expect(page).toHaveURL(`${BASE_HOST_URL}/#/success`);
});