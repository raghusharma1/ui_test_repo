import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage.js';

const LOGIN_URL = process.env.LOGIN_URL || process.env.BASE_URL;
const UI_SITE_USERNAME = process.env.UI_SITE_USERNAME; // Not used by current POM/script, but declared as per requirements
const UI_SITE_PASSWORD = process.env.UI_SITE_PASSWORD; // Not used by current POM/script, but declared as per requirements

test('login_analysis_happy_path', async ({ page, context }) => {
  const loginPage = new LoginPage(page);

  // Perform the full login flow using the LoginPage POM's performLoginFlow method,
  // which encapsulates navigation, clicking 'noAuth', waiting for SPA hydration,
  // and saving the authentication state, replicating the original script's logic.
  await loginPage.performLoginFlow(LOGIN_URL, context, '.auth/storage-state.json');

  // No specific assertions are present in the original script beyond waiting for hydration.
  // The 'waitForSPAPropagation' method within performLoginFlow addresses this.
  // The storage state is saved by the performLoginFlow method, which also logs its success.
});