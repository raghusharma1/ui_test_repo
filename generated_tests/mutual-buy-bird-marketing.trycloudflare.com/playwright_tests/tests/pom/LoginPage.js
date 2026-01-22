import { BasePage } from './BasePage.js';

/**
 * Represents the Login Page.
 * Encapsulates all selectors and actions related to the login functionality.
 */
class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page The Playwright page object.
   */
  constructor(page) {
    super(page);

    // --- Selectors ---
    /** @private */
    // Main selector: page.getByTestId('username-input')
    // Alt 1: page.getByPlaceholder('הזן קוד משתמש')
    // Alt 2: page.getByRole('heading', { name: 'כניסה לחשבונך' }).locator('..').getByPlaceholder('הזן קוד משתמש')
    // Alt 3: page.locator('input.form-input').first()
    this.usernameInput = page.getByTestId('username-input');

    /** @private */
    // Main selector: page.getByTestId('password-input')
    // Alt 1: page.locator('input[type="password"]')
    // Alt 2: page.getByPlaceholder('הזן סיסמה')
    // Alt 3: page.getByRole('heading', { name: 'כניסה לחשבונך' }).locator('..').getByPlaceholder('הזן סיסמה')
    // Alt 4: page.locator('input.form-input').nth(1)
    this.passwordInput = page.getByTestId('password-input');

    /** @private */
    // Main selector: page.getByTestId('login-button')
    // Alt 1: page.getByRole('button', { name: 'כניסה' }).first()
    // Alt 2: page.locator('button.login-btn')
    // Alt 3: page.locator('button, input[type=\"submit\"], input[type=\"button\"]').filter({ hasText: /^כניסה$/ })
    this.loginButton = page.getByTestId('login-button');
  }

  // --- Service Methods ---

  /**
   * Navigates to the login page.
   * @param {string} baseUrl The base URL of the application.
   */
  async navigateTo(baseUrl) {
    await this.navigate(`${baseUrl}/#/login`);
    return this;
  }

  /**
   * Enters the username into the username input field.
   * @param {string} username The username to enter.
   * @returns {Promise<this>} The current LoginPage instance for chaining.
   */
  async enterUsername(username) {
    await this.usernameInput.fill(username);
    return this;
  }

  /**
   * Enters the password into the password input field.
   * @param {string} password The password to enter.
   * @returns {Promise<this>} The current LoginPage instance for chaining.
   */
  async enterPassword(password) {
    await this.passwordInput.fill(password);
    return this;
  }

  /**
   * Clicks the login button and waits for navigation to the home page.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new HomePage instance.
   */
  async clickLogin() {
    await this.loginButton.click();
    // Using dynamic import to prevent circular dependency issues
    // between LoginPage and HomePage.
    const { HomePage } = await import('./HomePage.js');
    const homePage = new HomePage(this.page);
    await homePage.expectToBeOnHomePage();
    return homePage;
  }

  /**
   * A complete login service method that enters credentials and submits the form.
   * @param {string} username The username to enter.
   * @param {string} password The password to enter.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new HomePage instance after successful login.
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    return this.clickLogin();
  }
}

export { LoginPage };