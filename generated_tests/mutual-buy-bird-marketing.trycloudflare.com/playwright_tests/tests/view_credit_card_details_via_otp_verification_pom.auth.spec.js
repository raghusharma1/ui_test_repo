import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { CardsPage } from './pom/CardsPage.js';
import { CardsPreviewPage } from './pom/CardsPreviewPage.js';
import { CardsOtpPage } from './pom/CardsOtpPage.js';
import { CardsDetailsPage } from './pom/CardsDetailsPage.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Polyfill for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://mutual-buy-bird-marketing.trycloudflare.com';
const BASE_URL = process.env.BASE_URL || 'https://mutual-buy-bird-marketing.trycloudflare.com/';

// Screenshot capture hook (MANDATORY)

test('Discovered Workflow: View Credit Card Details via OTP Verification', async ({ page }) => {
  // Step 1: Navigate to the website homepage
  await page.goto(BASE_URL);
  await expect(page).toHaveURL(new RegExp('.*/#/home$'));

  const homePage = new HomePage(page);

  // Step 2: Click on the 'View card details' link
  const cardsPage = await homePage.clickViewCardDetailsLink();
  await expect(page).toHaveURL(new RegExp('.*/#/cards$'));

  // Step 3 & 4: Select the first credit card and click 'Continue'
  // Using the composite action for efficiency
  const cardsPreviewPage = await cardsPage.selectFirstCardAndContinue();
  await expect(page).toHaveURL(new RegExp('.*/#/cards/preview$'));

  // Step 5: Click the 'View card details' button to trigger OTP
  const cardsOtpPage = await cardsPreviewPage.clickConfirmViewDetailsButton();
  await expect(page).toHaveURL(new RegExp('.*/#/cards/otp$'));

  // Step 6 & 7: Enter the OTP '122074' and submit
  // Using the composite action for efficiency
  const cardsDetailsPage = await cardsOtpPage.submitOtp('122074');
  await expect(page).toHaveURL(new RegExp('.*/#/cards/details$'));

  // Step 8: Click the 'Finish' button to complete the workflow
  const successPage = await cardsDetailsPage.clickFinishButton();
  
  // Final Verification: Ensure the page navigates to the success screen
  await expect(page).toHaveURL(new RegExp('.*/#/success$'));
});