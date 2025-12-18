import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();

      // Also capture visible interactive elements for quick reference
      const visibleElements = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(
          'button, a, input, select, textarea, ' +
          '[role], [onclick], ' +
          'div[class*="btn"], div[class*="button"], ' +
          'span[class*="btn"], span[onclick], ' +
          '[data-testid], [aria-label]'
        ))
          .filter(el => {
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            return rect.width > 0 && rect.height > 0 &&
                   style.display !== 'none' &&
                   style.visibility !== 'hidden' &&
                   style.opacity !== '0';
          })
          .map(el => ({
            tag: el.tagName.toLowerCase(),
            text: (el.innerText || '').trim().substring(0, 80),
            role: el.getAttribute('role'),
            className: el.className || null,
            onclick: el.onclick ? 'has-handler' : null
          }));
      });

      const fileName = path.basename(testInfo.file)
        .replace('.auth.spec.js', '')
        .replace('.noauth.spec.js', '')
        .replace('.spec.js', '');
      const stateFile = path.join(__dirname, `../.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({
        accessibility_tree: accessibilityTree,
        visible_elements: visibleElements,
        element_count: visibleElements.length,
        url: page.url()
      }, null, 2));
    } catch (e) {
      // Silent fail - don't break test
    }
  }
});

test.setTimeout(120000);

test('login_analysis_happy_path', async ({ page, context }) => {
  try {
    // Validate required environment variables for login
    const LOGIN_URL = process.env.LOGIN_URL;
    const BASE_URL = process.env.BASE_URL;
    const USERNAME = process.env.UI_SITE_USERNAME;
    const PASSWORD = process.env.UI_SITE_PASSWORD;

    if (!LOGIN_URL && !BASE_URL) {
      throw new Error('LOGIN_URL or BASE_URL must be set in environment to navigate to the login page.');
    }
    if (!USERNAME) {
      throw new Error('UI_SITE_USERNAME is not set in environment. Please provide a valid username/email.');
    }
    if (!PASSWORD) {
      throw new Error('UI_SITE_PASSWORD is not set in environment. Please provide a valid password.');
    }

    // Step 0: Navigate to the login page (MANDATORY for login tests)
    await page.goto(LOGIN_URL || BASE_URL);
    await page.waitForLoadState('domcontentloaded');
    // Verify we are on the login page URL before interacting
    await expect(page).toHaveURL(process.env.LOGIN_URL || (process.env.BASE_URL ? process.env.BASE_URL + 'login' : undefined));

    // Step 1: Enter email into the Unsplash login form
    // Captured selectors:
    //   1. page.getByRole('textbox', { name: 'Email' }) (confidence: 99%, strategy: roost_primary, unique: true)
    //   2. page.locator('[data-testid="login-route"]').getByRole('textbox', { name: 'Email' }) (confidence: 98%, strategy: parent_testid_role, unique: true)
    //   3. page.locator('form[action*="nlog?referrer_locale=en-US"]').getByRole('textbox', { name: 'Email' }) (confidence: 97%, strategy: form_action_role, unique: true)
    //   4. page.getByRole('textbox', { name: 'Email' }) (confidence: 95%, strategy: role_name, unique: true)
    //   5. page.getByLabel('Email') (confidence: 93%, strategy: label_text, unique: true)
    //   6. page.getByLabel('Email', { exact: true }) (confidence: 92%, strategy: label_text_exact, unique: true)
    //   7. page.getByLabel('Email') (confidence: 90%, strategy: label, unique: true)
    //   8. page.locator('input[type="email"][name="email"]') (confidence: 89%, strategy: css_combined, unique: true)
    //   9. page.locator('input[type="email"]') (confidence: 88%, strategy: input_type, unique: true)
    //   10. page.locator('input[name="email"]') (confidence: 87%, strategy: name_attribute, unique: true)
    //   11. page.locator('input.baseInput-Pp_oVW.textM-yZhvJa') (confidence: 80%, strategy: css_combined_classes, unique: false, warning: Matches 2 elements)
    //   12. page.locator('input.baseInput-Pp_oVW') (confidence: 78%, strategy: css_stable_class, unique: false, warning: Matches 2 elements)
    //   13. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div/div/div[1]/form/label[1]/input') (confidence: 50%, strategy: xpath, unique: true)
    await page.getByRole('textbox', { name: 'Email' }).fill(USERNAME);

    // Step 2: Enter password into the Unsplash login form
    // Captured selectors:
    //   1. page.getByRole('textbox', { name: 'Password Forgot your password?' }) (confidence: 99%, strategy: roost_primary, unique: true)
    //   2. page.locator('input[type="password"][name="password"]') (confidence: 89%, strategy: css_combined, unique: true)
    //   3. page.locator('input[type="password"]') (confidence: 88%, strategy: input_type, unique: true)
    //   4. page.locator('input[name="password"]') (confidence: 87%, strategy: name_attribute, unique: true)
    //   5. page.locator('input.baseInput-Pp_oVW.textM-yZhvJa') >> nth=1 (confidence: 80%, strategy: css_combined_classes, near_unique)
    //   6. page.locator('input.baseInput-Pp_oVW') >> nth=1 (confidence: 78%, strategy: css_stable_class, near_unique)
    //   7. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div/div/div[1]/form/label[2]/input') (confidence: 50%, strategy: xpath, unique: true)
    await page.getByRole('textbox', { name: 'Password Forgot your password?' }).fill(PASSWORD);

    // Step 3: Click the Login button to submit credentials
    // Captured selectors:
    //   1. page.getByRole('button', { name: 'Login' }) (confidence: 99%, strategy: roost_primary, unique: true)
    //   2. page.locator('[data-testid="login-route"]').getByRole('button', { name: 'Login' }) (confidence: 98%, strategy: parent_testid_role, unique: true)
    //   3. page.locator('form[action*="nlog?referrer_locale=en-US"]').getByRole('button', { name: 'Login' }) (confidence: 97%, strategy: form_action_role, unique: true)
    //   4. page.getByTestId('login-route').locator('[value="Login"]') (confidence: 95%, strategy: parent_testid_value, unique: true)
    //   5. page.getByRole('button', { name: 'Login' }) (confidence: 95%, strategy: role_name, unique: true)
    //   6. page.locator('button[value="Login"]') (confidence: 89%, strategy: css_tag_value, unique: true)
    //   7. page.getByText('Login') >> nth=1 (confidence: 88%, strategy: text, near_unique)
    //   8. page.locator('.baseWithShadowInteractive-y9IO60[value="Login"]') (confidence: 87%, strategy: css_class_value, unique: true)
    //   9. page.locator('[value="Login"]') (confidence: 85%, strategy: css_value, unique: true)
    //   10. page.locator('button.reset-WfcG4c.base-WybTAX') >> nth=1 (confidence: 80%, strategy: css_combined_classes, near_unique)
    //   11. page.locator('button.reset-WfcG4c') >> nth=1 (confidence: 78%, strategy: css_stable_class, near_unique)
    //   12. page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^Login$/ }) (confidence: 75%, strategy: button_filter_exact, unique: true)
    //   13. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div/div/div[1]/form/button') (confidence: 50%, strategy: xpath, unique: true)
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for the redirect to authenticated state (URL should change from /login to /)
    if (BASE_URL) {
      await page.waitForURL(BASE_URL, { timeout: 60000 });
      await expect(page).toHaveURL(BASE_URL);
    } else {
      // Fallback to host root if BASE_URL is not set
      const rootUrl = (process.env.BASE_HOST_URL || process.env.LOGIN_HOST_URL || 'https://unsplash.com') + '/';
      await page.waitForURL(rootUrl, { timeout: 60000 });
      await expect(page).toHaveURL(rootUrl);
    }

    // Final verification accomplished; now save authenticated storage state (MANDATORY)
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: '../.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');
  } catch (error) {
    console.error('Login workflow failed:', error);
    throw error;
  }
});