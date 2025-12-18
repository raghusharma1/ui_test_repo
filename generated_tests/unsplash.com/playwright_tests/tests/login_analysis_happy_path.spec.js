import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Capture accessibility tree and DOM snapshot on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();

      const domSnapshot = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*'))
          .filter(el => {
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            return rect.width > 0 && rect.height > 0 &&
                   style.display !== 'none' &&
                   style.visibility !== 'hidden' &&
                   parseFloat(style.opacity || '1') > 0.05;
          })
          .map(el => {
            const style = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
              tag: el.tagName.toLowerCase(),
              id: el.id || null,
              classes: el.className || null,
              text: (el.innerText || el.textContent || '').trim().substring(0, 100),
              value: (el as any).value || null,
              role: el.getAttribute('role') || null,
              ariaLabel: el.getAttribute('aria-label') || null,
              type: (el as any).type || null,
              href: (el as any).href || null,
              cursor: style.cursor,
              display: style.display,
              hasOnclick: !!(el as any).onclick || el.hasAttribute('onclick'),
              parent: {
                tag: el.parentElement?.tagName?.toLowerCase(),
                classes: el.parentElement?.className || null
              },
              position: {
                x: Math.round(rect.x),
                y: Math.round(rect.y),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              }
            };
          });
      });

      const fileName = path.basename(testInfo.file)
        .replace('.auth.spec.js', '')
        .replace('.noauth.spec.js', '')
        .replace('.spec.js', '');
      const dirOfTest = path.dirname(testInfo.file);
      const stateFile = path.join(dirOfTest, '..', `.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({
        accessibility_tree: accessibilityTree,
        dom_snapshot: domSnapshot,
        element_count: domSnapshot.length,
        url: page.url()
      }, null, 2));
    } catch (e) {
      // Silent fail - do not disrupt test flow
    }
  }
});

test.setTimeout(120000);

test('login_analysis_happy_path', async ({ page, context }) => {
  try {
    // Step 1: Navigate to the Unsplash login page
    // Use LOGIN_URL for navigating to the login page itself, fallback to BASE_URL
    const initialLoginUrl = process.env.LOGIN_URL || process.env.BASE_URL;
    if (!initialLoginUrl) {
      throw new Error('LOGIN_URL or BASE_URL must be set in environment to navigate to the login page.');
    }
    await page.goto(initialLoginUrl);
    await page.waitForLoadState('networkidle');

    // Verify page URL contains '/login'
    const expectedLoginUrl = process.env.LOGIN_URL || ((process.env.BASE_URL || '') + 'login');
    await expect(page).toHaveURL(expectedLoginUrl);

    // Step 2: Enter email into the Email field using UI_SITE_USERNAME
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
    //  10. page.locator('input[name="email"]') (confidence: 87%, strategy: name_attribute, unique: true)
    //  11. page.locator('input.baseInput-Pp_oVW.textM-yZhvJa') >> nth=0 (confidence: 80%, strategy: css_combined_classes, near_unique: false)
    //  12. page.locator('input.baseInput-Pp_oVW') >> nth=0 (confidence: 78%, strategy: css_stable_class, near_unique: false)
    //  13. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div/div/div[1]/form/label[1]/input') (confidence: 50%, strategy: xpath, unique: true)
    const USERNAME = process.env.UI_SITE_USERNAME;
    if (!USERNAME) {
      throw new Error('UI_SITE_USERNAME is not set in environment. Please provide a valid username/email in .env.');
    }
    const emailInput = page.getByRole('textbox', { name: 'Email' }); // Using primary (highest confidence, role-based)
    await emailInput.waitFor({ state: 'visible', timeout: 60000 });
    await emailInput.fill(USERNAME);

    // Step 3: Enter password into the Password field using UI_SITE_PASSWORD
    // Captured selectors:
    //   1. page.getByRole('textbox', { name: 'Password Forgot your password?' }) (confidence: 99%, strategy: roost_primary, unique: true)
    //   2. page.locator('input[type="password"][name="password"]') (confidence: 89%, strategy: css_combined, unique: true)
    //   3. page.locator('input[type="password"]') (confidence: 88%, strategy: input_type, unique: true)
    //   4. page.locator('input[name="password"]') (confidence: 87%, strategy: name_attribute, unique: true)
    //   5. page.locator('input.baseInput-Pp_oVW.textM-yZhvJa') >> nth=1 (confidence: 80%, strategy: css_combined_classes, near_unique: false)
    //   6. page.locator('input.baseInput-Pp_oVW') >> nth=1 (confidence: 78%, strategy: css_stable_class, near_unique: false)
    //   7. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div/div/div[1]/form/label[2]/input') (confidence: 50%, strategy: xpath, unique: true)
    const PASSWORD = process.env.UI_SITE_PASSWORD;
    if (!PASSWORD) {
      throw new Error('UI_SITE_PASSWORD is not set in environment. Please provide a valid password in .env.');
    }
    const passwordInput = page.getByRole('textbox', { name: 'Password Forgot your password?' }); // Using primary (highest confidence, role-based)
    await passwordInput.waitFor({ state: 'visible', timeout: 60000 });
    await passwordInput.fill(PASSWORD);

    // Step 4: Click the Login button to submit the credentials
    // Captured selectors:
    //   1. page.getByRole('button', { name: 'Login' }) (confidence: 99%, strategy: roost_primary, unique: true)
    //   2. page.locator('[data-testid="login-route"]').getByRole('button', { name: 'Login' }) (confidence: 98%, strategy: parent_testid_role, unique: true)
    //   3. page.locator('form[action*="nlog?referrer_locale=en-US"]').getByRole('button', { name: 'Login' }) (confidence: 97%, strategy: form_action_role, unique: true)
    //   4. page.getByTestId('login-route').locator('[value="Login"]') (confidence: 95%, strategy: parent_testid_value, unique: true)
    //   5. page.getByRole('button', { name: 'Login' }) (confidence: 95%, strategy: role_name, unique: true)
    //   6. page.locator('button[value="Login"]') (confidence: 89%, strategy: css_tag_value, unique: true)
    //   7. page.getByText('Login') >> nth=1 (confidence: 88%, strategy: text, near_unique: false)
    //   8. page.locator('.baseWithShadowInteractive-y9IO60[value="Login"]') (confidence: 87%, strategy: css_class_value, unique: true)
    //   9. page.locator('[value="Login"]') (confidence: 85%, strategy: css_value, unique: true)
    //  10. page.locator('button.reset-WfcG4c.base-WybTAX') >> nth=1 (confidence: 80%, strategy: css_combined_classes, near_unique: false)
    //  11. page.locator('button.reset-WfcG4c') >> nth=1 (confidence: 78%, strategy: css_stable_class, near_unique: false)
    //  12. page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^Login$/ }) (confidence: 75%, strategy: button_filter_exact, unique: true)
    //  13. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div/div/div[1]/form/button') (confidence: 50%, strategy: xpath, unique: true)
    const loginButton = page.getByRole('button', { name: 'Login' }); // Using primary (highest confidence, role-based)
    await loginButton.waitFor({ state: 'visible', timeout: 60000 });
    await loginButton.click();

    // Step 5: Verify the login succeeded by confirming URL indicates authenticated state
    const baseForAuth = process.env.BASE_URL || process.env.BASE_HOST_URL || 'https://unsplash.com/';
    const normalizedBase = baseForAuth.endsWith('/') ? baseForAuth : `${baseForAuth}/`;
    const expectedAuthenticatedUrl = `${normalizedBase}?flash=alreadyLoggedIn`;
    await page.waitForURL(expectedAuthenticatedUrl, { timeout: 60000 });
    await expect(page).toHaveURL(expectedAuthenticatedUrl);

    // Wait for authentication to fully propagate
    await page.waitForLoadState('networkidle');
    // await page.waitForTimeout(30000);  // Allow time for auth state to be set

    // Save authenticated state for other tests to reuse
    await context.storageState({ path: '../.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');
  } catch (error) {
    // Re-throw to let Playwright mark the test as failed, while afterEach hooks capture diagnostics
    throw error;
  }
});