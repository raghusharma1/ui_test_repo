import { BasePage } from './BasePage.js';

/**
 * @class LoginPage
 * @description Represents the login page and its interactions.
 * This page object encapsulates all selectors and methods related to the login form.
 * Note: The input data suggested 'HomePage' for the login context, which has been corrected to 'LoginPage'
 * based on the URL pattern ('/#/login') and user actions (entering credentials).
 */
class LoginPage extends BasePage {
  /**
   * @constructor
   * @param {import('@playwright/test').Page} page - The Playwright page instance.
   */
  constructor(page) {
    super(page);
    this.url = '/#/login';

    // Locators for the login form elements
    // Selector options:
    // - page.getByTestId('username-input')
    // - page.getByPlaceholder('הזן קוד משתמש')
    // - page.getByRole('heading', { name: 'כניסה לחשבונך' }).locator('..').getByPlaceholder('הזן קוד משתמש')
    // - page.locator('input.form-input').first()
    // - page.locator('xpath=html/body/div/div/div[2]/div[2]/form/div[1]/input')
    this.usernameInput = page.getByTestId('username-input');

    // Selector options:
    // - page.getByTestId('password-input')
    // - page.locator('input[type="password"]')
    // - page.getByPlaceholder('הזן סיסמה')
    // - page.getByRole('heading', { name: 'כניסה לחשבונך' }).locator('..').getByPlaceholder('הזן סיסמה')
    // - page.locator('input.form-input').nth(1)
    this.passwordInput = page.getByTestId('password-input');

    // Selector options:
    // - page.getByTestId('login-button')
    // - page.getByRole('button', { name: 'כניסה' }).first()
    // - page.locator('button.login-btn')
    // - page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^כניסה$/ })
    // - page.locator('xpath=html/body/div[1]/div/div[2]/div[2]/form/button')
    this.loginButton = page.getByTestId('login-button');
  }

  /**
   * Navigates to the login page.
   * @param {string} baseUrl - The base URL of the application.
   * @returns {Promise<this>}
   */
  async navigateTo(baseUrl) {
    await this.navigate(`${baseUrl}${this.url}`);
    return this;
  }

  /**
   * Enters the username into the username input field.
   * @param {string} username - The username to enter.
   * @returns {Promise<this>} The instance of the LoginPage for chaining.
   */
  async enterUsername(username) {
    await this.usernameInput.fill(username);
    return this;
  }

  /**
   * Enters the password into the password input field.
   * @param {string} password - The password to enter.
   * @returns {Promise<this>} The instance of the LoginPage for chaining.
   */
  async enterPassword(password) {
    await this.passwordInput.fill(password);
    return this;
  }

  /**
   * Clicks the login button and waits for navigation to the home page.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new instance of the HomePage.
   */
  async submitLogin() {
    await this.loginButton.click();
    await this.page.waitForURL('**/home', { timeout: 10000 });
    const { HomePage } = await import('./HomePage.js');
    return new HomePage(this.page);
  }

  /**
   * A high-level service method to perform a full login sequence.
   * @param {string} username - The username to use for login.
   * @param {string} password - The password to use for login.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new instance of the HomePage after successful login.
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    return this.submitLogin();
  }
}

export { LoginPage };