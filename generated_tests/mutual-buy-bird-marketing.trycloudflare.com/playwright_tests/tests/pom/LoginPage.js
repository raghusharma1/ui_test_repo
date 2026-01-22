import { BasePage } from './BasePage.js';

/**
 * Represents the Login Page and its interactions.
 * The initial page for user authentication.
 */
class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page The Playwright page object.
   */
  constructor(page) {
    super(page);

    // Locators for the Login page elements
    // ---

    /**
     * @private
     * The username input field.
     * Alternative Selectors:
     * - page.getByPlaceholder('הזן קוד משתמש')
     * - page.locator('input.form-input').first()
     * - page.getByRole('heading', { name: 'כניסה לחשבונך' }).locator('..').getByPlaceholder('הזן קוד משתמש')
     */
    this.usernameInput = page.getByTestId('username-input');

    /**
     * @private
     * The password input field.
     * Alternative Selectors:
     * - page.locator('input[type="password"]')
     * - page.getByPlaceholder('הזן סיסמה')
     * - page.locator('input.form-input').nth(1)
     */
    this.passwordInput = page.getByTestId('password-input');

    /**
     * @private
     * The login submission button.
     * Alternative Selectors:
     * - page.getByRole('button', { name: 'כניסה' }).first()
     * - page.locator('button.login-btn')
     * - page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^כניסה$/ })
     */
    this.loginButton = page.getByTestId('login-button');
  }

  // --- Page Service Methods ---

  /**
   * Enters the given username into the username field.
   * @param {string} username The username to enter.
   * @returns {Promise<this>} The current LoginPage instance for chaining.
   */
  async enterUsername(username) {
    await this.usernameInput.fill(username);
    return this;
  }

  /**
   * Enters the given password into the password field.
   * @param {string} password The password to enter.
   * @returns {Promise<this>} The current LoginPage instance for chaining.
   */
  async enterPassword(password) {
    await this.passwordInput.fill(password);
    return this;
  }

  /**
   * Clicks the login button to submit the credentials.
   * This action is expected to navigate to the HomePage.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new HomePage instance.
   */
  async clickLogin() {
    await this.loginButton.click();
    // Use dynamic import to prevent circular dependency issues
    const { HomePage } = await import('./HomePage.js');
    return new HomePage(this.page);
  }

  /**
   * A high-level service method to perform a complete login action.
   * @param {string} username The username for login.
   * @param {string} password The password for login.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new HomePage instance after successful login.
   */
  async loginAs(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    return this.clickLogin();
  }
}

export { LoginPage };