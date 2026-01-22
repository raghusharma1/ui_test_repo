import 'dotenv/config';
import { test, expect } from '@playwright/test';
test.setTimeout(120000);

test('login_analysis_happy_path', async ({ page, context }) => {
  try {
    // Navigate to the login page
    await page.goto(process.env.LOGIN_URL || process.env.BASE_URL);

    // Step 1: Enter username into the user code input field.
    // Captured selectors:
    //   1. page.getByTestId('username-input') (confidence: 99%, strategy: roost_primary, unique: true)
    //   2. page.getByTestId('username-input') (confidence: 100%, strategy: testid, unique: true)
    //   3. page.getByPlaceholder('הזן קוד משתמש') (confidence: 85%, strategy: placeholder, unique: true)
    //   4. page.getByRole('heading', { name: 'כניסה לחשבונך' }).locator('..').getByPlaceholder('הזן קוד משתמש') (confidence: 84%, strategy: heading_context_placeholder, unique: true)
    //   5. page.locator('input.form-input') (confidence: 78%, strategy: css_stable_class, unique: false)
    //   6. page.locator('xpath=html/body/div/div/div[2]/div[2]/form/div[1]/input') (confidence: 50%, strategy: xpath, unique: true)
    await page.getByTestId('username-input').fill(process.env.UI_SITE_USERNAME);

    // Step 2: Enter password into the password input field.
    // Captured selectors:
    //   1. page.getByTestId('password-input') (confidence: 99%, strategy: roost_primary, unique: true)
    //   2. page.getByTestId('password-input') (confidence: 100%, strategy: testid, unique: true)
    //   3. page.locator('input[type="password"]') (confidence: 88%, strategy: input_type, unique: true)
    //   4. page.getByPlaceholder('הזן סיסמה') (confidence: 85%, strategy: placeholder, unique: true)
    //   5. page.getByRole('heading', { name: 'כניסה לחשבונך' }).locator('..').getByPlaceholder('הזן סיסמה') (confidence: 84%, strategy: heading_context_placeholder, unique: true)
    //   6. page.locator('input.form-input') (confidence: 78%, strategy: css_stable_class, unique: false)
    //   7. page.locator('xpath=html/body/div[1]/div/div[2]/div[2]/form/div[2]/input') (confidence: 50%, strategy: xpath, unique: true)
    await page.getByTestId('password-input').fill(process.env.UI_SITE_PASSWORD);

    // Step 3: Click the login button to submit credentials.
    // Captured selectors:
    //   1. page.getByTestId('login-button') (confidence: 99%, strategy: roost_primary, unique: true)
    //   2. page.getByTestId('login-button') (confidence: 100%, strategy: testid, unique: true)
    //   3. page.getByRole('button', { name: 'כניסה' }) (confidence: 95%, strategy: role_name, unique: false)
    //   4. page.getByText('כניסה') (confidence: 78%, strategy: text, unique: false)
    //   5. page.locator('#root').getByRole('button', { name: 'כניסה' }) (confidence: 82%, strategy: parent_id_role, unique: false)
    //   6. page.locator('button.login-btn') (confidence: 78%, strategy: css_stable_class, unique: true)
    //   7. page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^כניסה$/ }) (confidence: 75%, strategy: button_filter_exact, unique: true)
    //   8. page.locator('xpath=html/body/div[1]/div/div[2]/div[2]/form/button') (confidence: 50%, strategy: xpath, unique: true)
    await page.getByTestId('login-button').click();

    // Step 4: Verify successful login by checking the URL has navigated to the home page.
    const expectedUrl = `${process.env.LOGIN_HOST_URL || process.env.BASE_HOST_URL}/#/home`;
    await page.waitForURL(expectedUrl, { timeout: 30000 });
    await expect(page).toHaveURL(expectedUrl);

    // Wait for authentication to fully propagate
    await page.waitForLoadState('networkidle');
    
    // Save authenticated state for other tests to reuse
    await context.storageState({ path: '../.auth/storage-state.json' });
    console.log('✅ Storage state saved - other tests can now skip login!');

  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});