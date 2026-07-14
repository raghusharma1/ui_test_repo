import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { WallpapersTopicPage } from './pom/WallpapersTopicPage.js';
import { PhotoDetailPage } from './pom/PhotoDetailPage.js';
import testData from './w01_unsplash_wallpaper_click.test-data.json' with { type: 'json' };
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://unsplash.com';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://unsplash.com';

let stepTimeout30 = { timeout: 30000 };

test('Discovered Workflow: Unsplash Wallpaper Click - Complete User Journey', { tag: ['@smoke'] }, async ({ page }) => {
  const homePage = new HomePage(page);
  const wallpapersPage = new WallpapersTopicPage(page);
  const photoDetailPage = new PhotoDetailPage(page);
  const data = testData.variations[0];

  // Step 1: Navigate to homepage
  await homePage.goto();

  // Step 2: Click on the 'Wallpapers' category link
  await homePage.clickWallpapersCategory();
  // Verification point from scenario: URL changes to include /t/wallpapers
  await expect(page).toHaveURL(/.*\/t\/wallpapers/);

  // Step 3: Click on the specific wallpaper 'Interlocking rounded shapes'
  await wallpapersPage.selectSpecificWallpaper(data.wallpaperName);

  // Verification: URL matches the specific photo detail page
  await photoDetailPage.verifyPhotoUrl(data.expectedPhotoUrl);
});