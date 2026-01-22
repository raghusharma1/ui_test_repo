import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { CardsPage } from './pom/CardsPage.js';
import { CardsPreviewPage } from './pom/CardsPreviewPage.js';
import { CardsOtpPage } from './pom/CardsOtpPage.js';
import { CardsDetailsPage } from './pom/CardsDetailsPage.js';
// Environment variables
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://mutual-buy-bird-marketing.trycloudflare.com';
const BASE_URL = process.env.BASE_URL || 'https://mutual-buy-bird-marketing.trycloudflare.com/';

// Screenshot capture hook (MANDATORY)

test('View Credit Card Details with OTP Verification', async ({ page }) => {
  // Step 1: Navigate to website homepage
  await page.goto(BASE_URL);
  await expect(page).toHaveURL(new RegExp(`^${BASE_HOST_URL}`));

  // Step 2: Click 'View card details' on the homepage
  const homePage = new HomePage(page);
  const cardsPage = await homePage.viewCardDetails();
  await expect(page).toHaveURL(`${BASE_HOST_URL}/#/cards`);

  // Steps 3 & 4: Select the Mastercard ending in 1425 and continue
  const cardsPreviewPage = await cardsPage.selectCardAndContinue('1425');
  await expect(page).toHaveURL(`${BASE_HOST_URL}/#/cards/preview`);

  // Step 5: Proceed to OTP verification
  const cardsOtpPage = await cardsPreviewPage.proceedToOtpVerification();
  await expect(page).toHaveURL(`${BASE_HOST_URL}/#/cards/otp`);

  // Steps 6-12: Enter the complete OTP code '122074' and submit
  const cardsDetailsPage = await cardsOtpPage.enterAndSubmitOtp('122074');
  await expect(page).toHaveURL(`${BASE_HOST_URL}/#/cards/details`);

  // Step 13: Click 'Finish' after viewing details
  await cardsDetailsPage.finishViewingDetails();
  
  // Final Verification: Ensure the page navigates to the success screen
  await expect(page).toHaveURL(`${BASE_HOST_URL}/#/success`);
});