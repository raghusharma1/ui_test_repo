import { BasePage } from './BasePage.js';

/**
 * Represents the Login Page of the application.
 * Encapsulates all interactions and elements of the login form.
 */
class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page The Playwright page object.
   */
  constructor(page) {
    super(page);

    // Selectors are defined as class properties for encapsulation.
    
    // --- Locators ---
    
    /** @type {import('@playwright/test').Locator} Username Input Field */
    // Alternatives:
    // - page.getByPlaceholder('הזן קוד משתמש')
    // - page.getByRole('heading', { name: 'כניסה לחשבונך' }).locator('..').getByPlaceholder('הזן קוד משתמש')
    // - page.locator('input.form-input').first()
    this.usernameInput = page.getByTestId('username-input');

    /** @type {import('@playwright/test').Locator} Password Input Field */
    // Alternatives:
    // - page.locator('input[type="password"]')
    // - page.getByPlaceholder('הזן סיסמה')
    // - page.getByRole('heading', { name: 'כניסה לחשבונך' }).locator('..').getByPlaceholder('הזן סיסמה')
    // - page.locator('input.form-input').nth(1)
    this.passwordInput = page.getByTestId('password-input');

    /** @type {import('@playwright/test').Locator} Login Button */
    // Alternatives:
    // - page.getByRole('button', { name: 'כניסה' }).first()
    // - page.locator('button.login-btn')
    // - page.locator('button, input[type="submit"], input[type="button"]').filter({ hasText: /^כניסה$/ })
    this.loginButton = page.getByTestId('login-button');
  }

  // --- Public Service Methods ---

  /**
   * Navigates to the login page.
   * @param {string} [baseUrl='/'] The base URL of the site.
   * @returns {Promise<this>}
   */
  async navigateTo(baseUrl = '/') {
    await this.navigate(`${baseUrl}#/login`);
    await this.usernameInput.waitFor({ state: 'visible' });
    return this;
  }

  /**
   * Enters the username into the corresponding input field.
   * @param {string} username The username to enter.
   * @returns {Promise<this>}
   */
  async enterUsername(username) {
    await this.usernameInput.fill(username);
    return this;
  }

  /**
   * Enters the password into the corresponding input field.
   * @param {string} password The password to enter.
   * @returns {Promise<this>}
   */
  async enterPassword(password) {
    await this.passwordInput.fill(password);
    return this;
  }

  /**
   * Clicks the login button to submit the form.
   * This action causes navigation to the Home Page.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new instance of the HomePage.
   */
  async clickLogin() {
    await this.loginButton.click();
    const { HomePage } = await import('./HomePage.js');
    const homePage = new HomePage(this.page);
    await homePage.expectToBeOnHomePage();
    return homePage;
  }

  /**
   * A comprehensive business-level method to log in a user.
   * @param {string} username The user's username.
   * @param {string} password The user's password.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new instance of the HomePage.
   */
  async loginAs(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    return this.clickLogin();
  }
}

export { LoginPage };