import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { HomePage } from './pom/HomePage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_HOST_URL = process.env.BASE_HOST_URL;
const BASE_URL = process.env.BASE_URL;

let stepTimeout30 = { timeout: 30000 };

test('Discovered Workflow: Unsplash Wallpaper Click (1) -- Partial', { tag: ['@smoke'] }, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  // The scenario indicates an 'Access Denied' error was observed, preventing further interaction.
  // No further actions or verifications are possible based on the scenario description.
});

