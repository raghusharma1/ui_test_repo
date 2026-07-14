import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import { WallpapersPage } from './pom/WallpapersPage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'https://unsplash.com/';
const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://unsplash.com';

let stepTimeout30 = { timeout: 30000 };

test('Discovered Workflow: Unsplash Wallpaper Click (1) -- Partial', { tag: ['@smoke'] }, async ({ page }) => {
  const homePage = new HomePage(page);
  const wallpapersPage = new WallpapersPage(page);

  // Step 1: Navigate to homepage
  // The POM method navigateToHome already uses BASE_HOST_URL equivalent
  await homePage.navigateToHome();

  // Step 2: Navigate to Wallpapers Topic
  // The POM method navigateToWallpapers navigates to /t/wallpapers
  await wallpapersPage.navigateToWallpapers();

  // Final Verification: Assert the FINAL destination only, and LOOSELY
  // We wait for the URL to contain the expected path segment
  await page.waitForURL(/\/t\/wallpapers/, stepTimeout30);
  expect(page.url()).toContain('/t/wallpapers');
});

