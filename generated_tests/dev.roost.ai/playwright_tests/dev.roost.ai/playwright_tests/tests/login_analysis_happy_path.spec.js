import 'dotenv/config';
import { test, expect } from '@playwright/test';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Env Vars
const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;
const BASE_HOST_URL = process.env.BASE_HOST_URL;
const USERNAME = process.env.UI_SITE_USERNAME;
const PASSWORD = process.env.UI_SITE_PASSWORD;

let stepTimeout30 = { timeout: 30000 };
let stepTimeout10 = { timeout: 10000 };

// Capture accessibility tree and screenshot on failure

test('login_analysis_happy_path', async ({ page, context }) => {
  // Ensure necessary credentials are available
  await page.goto("https://dev.roost.ai/login");
  await page.locator('span.noAuth').click();
  // Belt-and-braces: wait for an authenticated UI element so we know the SPA has hydrated
  // (pick something that only renders for logged-in users — a user-menu avatar, the RoostGPT nav, etc.)
  await page.waitForTimeout(10000);

  // Wait for authentication to fully propagate and save the state
  await context.storageState({ path: '../.auth/storage-state.json' });
  console.log('✅ Storage state saved - other tests can now skip login!');

  // Auto-injected by Roost: save storage state for authenticated sessions
  try {
    await page.context().storageState({ path: '.auth/storage-state.json' });
    console.log('Roost: storage state saved via page.context()');
  } catch (__roostErr1) {
    try {
      await context.storageState({ path: '.auth/storage-state.json' });
      console.log('Roost: storage state saved via context');
    } catch (__roostErr2) {
      console.error('Roost: failed to save storage state', __roostErr1, __roostErr2);
      throw new Error('Roost: could not save storage state — ensure your test exposes `page` or `context`');
    }
  }

});