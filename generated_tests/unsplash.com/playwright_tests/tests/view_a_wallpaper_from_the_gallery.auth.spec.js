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

test('View a Wallpaper from the Gallery', async ({ page }) => {
  // Step 1: Navigate to website homepage
  // Navigate to the Unsplash homepage to begin the user journey.
  await page.goto(BASE_URL || BASE_HOST_URL);
  await page.waitForURL(BASE_URL || BASE_HOST_URL);

  // Step 2: Click on the 'Wallpapers' link in the main navigation bar
  // Captured selectors:
  //   1. page.getByRole('link', { name: 'Wallpapers' }) (confidence: 99%, strategy: roost_primary, unique: true)
  //   2. page.getByText('Wallpapers') (confidence: 88%, strategy: text, unique: true)
  //   3. page.locator('a').filter({ hasText: /^Wallpapers$/ }) (confidence: 74%, strategy: css, unique: true)
  //   4. page.locator('a').filter({ hasText: 'Wallpapers' }) (confidence: 69%, strategy: css, unique: true)
  //   5. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div[1]/div/div/div/div/ul/li[2]/a') (confidence: 50%, strategy: xpath, unique: true)
  await page.getByRole('link', { name: 'Wallpapers' }).click();
  
  // Verify navigation to the wallpapers gallery
  await page.waitForURL(`${BASE_HOST_URL}/t/wallpapers`);

  // Step 3: Select and click on a wallpaper image from the gallery
  // Captured selectors:
  //   1. page.getByRole('link', { name: 'Abstract pink and purple' }) (confidence: 99%, strategy: roost_primary, unique: true)
  //   2. page.locator('a.photoInfoLink-mG0SPO[href*="-texture-ghYgiyVb9N4"]') (confidence: 88%, strategy: css, unique: true)
  //   3. page.locator('a[href*="abstract-pink-and-purple-marbled-texture-ghYgiyVb9N4"]') (confidence: 79%, strategy: css, unique: true)
  //   4. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div[2]/div[3]/div[3]/div/div/div[1]/figure[1]/div[1]/div/a') (confidence: 50%, strategy: xpath, unique: true)
  await page.getByRole('link', { name: 'Abstract pink and purple' }).click();
  
  // Final Goal: Verify navigation to the specific photo detail page
  await expect(page).toHaveURL(`${BASE_HOST_URL}/photos/abstract-pink-and-purple-marbled-texture-ghYgiyVb9N4`);
});