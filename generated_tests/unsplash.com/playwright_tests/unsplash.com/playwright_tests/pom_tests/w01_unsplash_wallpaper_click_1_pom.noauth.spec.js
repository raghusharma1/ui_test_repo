import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL || 'https://unsplash.com';
const BASE_URL = process.env.BASE_URL || 'https://unsplash.com/';

let stepTimeout30 = { timeout: 30000 };

test('Discovered Workflow: Unsplash Wallpaper Click (1) -- Partial', { tag: ['@smoke'] }, async ({ page }) => {
  // Step 1: Navigate to homepage
  const homePage = new HomePage(page);
  await homePage.navigateToHomepage();

  // Expected Results:
  // 1. The browser navigates to https://unsplash.com.
  // 2. An 'Access Denied' error (error code 4d1dbaddfcc0f385) is displayed on the page.
  // 3. No further interaction with the site is possible.

  await expect(page).toHaveURL(BASE_URL);
  await expect(page.locator('body')).toContainText('Access Denied');
  await expect(page.locator('body')).toContainText('error code 4d1dbaddfcc0f385');
});

