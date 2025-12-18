import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.setTimeout(120000);

test('login_analysis_happy_path', async ({ page, context }) => {
  // Step 1: Navigate to login page
  // Use LOGIN_URL if set, otherwise BASE_URL
  await page.goto(process.env.LOGIN_URL || process.env.BASE_URL);

  // Step 1: Enter registered email address into the Email field on the login form.
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
  //  11. page.locator('input.baseInput-Pp_oVW.textM-yZhvJa') (confidence: 80%, strategy: css_combined_classes, unique: false)
  //  12. page.locator('input.baseInput-Pp_oVW') (confidence: 78%, strategy: css_stable_class, unique: false)
  //  13. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div/div/div[1]/form/label[1]/input') (confidence: 50%, strategy: xpath, unique: true)
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.UI_SITE_USERNAME);

  // Step 2: Enter corresponding password into the Password field on the login form.
  // Captured selectors:
  //   1. page.getByRole('textbox', { name: 'Password Forgot your password?' }) (confidence: 99%, strategy: roost_primary, unique: true)
  //   2. page.locator('input[type="password"][name="password"]') (confidence: 89%, strategy: css_combined, unique: true)
  //   3. page.locator('input[type="password"]') (confidence: 88%, strategy: input_type, unique: true)
  //   4. page.locator('input[name="password"]') (confidence: 87%, strategy: name_attribute, unique: true)
  //   5. page.locator('input.baseInput-Pp_oVW.textM-yZhvJa') (confidence: 80%, strategy: css_combined_classes, unique: false)
  //   6. page.locator('input.baseInput-Pp_oVW') (confidence: 78%, strategy: css_stable_class, unique: false)
  //   7. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div/div/div[1]/form/label[2]/input') (confidence: 50%, strategy: xpath, unique: true)
  await page.getByRole('textbox', { name: 'Password Forgot your password?' }).fill(process.env.UI_SITE_PASSWORD);

  // Step 3: Click the Login button to submit the credentials for authentication.
  // Captured selectors:
  //   1. page.getByRole('button', { name: 'Login' }) (confidence: 99%, strategy: roost_primary, unique: true)
  //   2. page.locator('[data-testid="login-route"]').getByRole('button', { name: 'Login' }) (confidence: 98%, strategy: parent_testid_role, unique: true)
  //   3. page.locator('form[action*="nlog?referrer_locale=en-US"]').getByRole('button', { name: 'Login' }) (confidence: 97%, strategy: form_action_role, unique: true)
  //   4. page.getByTestId('login-route').locator('[value="Login"]') (confidence: 95%, strategy: parent_testid_value, unique: true)
  //   5. page.getByRole('button', { name: 'Login' }) (confidence: 95%, strategy: role_name, unique: true)
  //   6. page.locator('button[value="Login"]') (confidence: 89%, strategy: css_tag_value, unique: true)
  //   7. page.getByText('Login') (confidence: 88%, strategy: text, unique: false)
  //   8. page.locator('.baseWithShadowInteractive-y9IO60[value="Login"]') (confidence: 87%, strategy: css_class_value, unique: true)
  //   9. page.locator('[value="Login"]') (confidence: 85%, strategy: css_value, unique: true)
  //  10. page.locator('button.reset-WfcG4c.base-WybTAX') (confidence: 80%, strategy: css_combined_classes, unique: false)
  //  11. page.locator('button.reset-WfcG4c') (confidence: 78%, strategy: css_stable_class, unique: false)
  //  12. page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^Login$/ }) (confidence: 75%, strategy: button_filter_exact, unique: true)
  //  13. page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div/div/div[1]/form/button') (confidence: 50%, strategy: xpath, unique: true)
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 4: Verify that upon successful login, the user is redirected to the Unsplash homepage.
  await page.waitForURL(process.env.BASE_URL || 'https://unsplash.com/', { timeout: 60000 });
  await expect(page).toHaveURL(process.env.BASE_URL || 'https://unsplash.com/');
  
  // Wait for authentication to fully propagate
  await page.waitForLoadState('networkidle');
  // await page.waitForTimeout(30000);  // Allow time for auth state to be set

  // Save authenticated state for other tests to reuse
  await context.storageState({ path: '../.auth/storage-state.json' });
  console.log('✅ Storage state saved - other tests can now skip login!');
});

// Capture accessibility tree and visible DOM info on failure for iteration system
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();
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
    } catch (e) {}
  }
});