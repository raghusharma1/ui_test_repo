import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
// --- Environment Variables ---
// Using BASE_URL for initial navigation as per instructions.
const BASE_URL = process.env.BASE_URL || 'https://unsplash.com/';
// Using BASE_HOST_URL for constructing expected URL paths.
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://unsplash.com';

// --- Screenshot Capture on Failure (Mandatory Hook) ---

// --- Test Scenario ---
test('View a Wallpaper from the Gallery', async ({ page }) => {
  // 1. Navigate to the website homepage
  const homePage = new HomePage(page);
  await homePage.open(BASE_URL);
  await expect(page).toHaveURL(BASE_URL);
  
  // 2. Click on the 'Wallpapers' link in the main navigation bar
  const wallpapersPage = await homePage.navigateToWallpapersPage();
  await wallpapersPage.waitForPageLoad();
  
  // Verification for step 2
  await expect(page).toHaveURL(`${BASE_HOST_URL}/t/wallpapers`);

  // 3. Select and click on a specific wallpaper from the gallery
  // The POM provides a method specifically for the image in the scenario.
  const photoDetailsPage = await wallpapersPage.selectAbstractPinkWallpaper();
  await photoDetailsPage.waitForPageLoad();

  // Final verification for step 3
  await expect(page).toHaveURL(`${BASE_HOST_URL}/photos/abstract-pink-and-purple-marbled-texture-ghYgiyVb9N4`);
});