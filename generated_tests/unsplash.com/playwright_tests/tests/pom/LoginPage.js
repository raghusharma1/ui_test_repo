import { BasePage } from './BasePage.js';

/**
 * @class LoginPage
 * @description Represents the Unsplash Login page and its functionalities.
 * Encapsulates all selectors and actions related to user login.
 */
class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - The Playwright page instance.
   */
  constructor(page) {
    super(page);

    // --- Locators ---

    // Email address input field.
    // Alt 1: page.locator('[data-testid="login-route"]').getByRole('textbox', { name: 'Email' })
    // Alt 2: page.getByLabel('Email')
    // Alt 3: page.locator('input[type="email"][name="email"]')
    // Alt 4: page.locator('input[name="email"]')
    this.emailInput = page.getByRole('textbox', { name: 'Email' });

    // Password input field.
    // Alt 1: page.locator('input[type="password"][name="password"]')
    // Alt 2: page.locator('input[type="password"]')
    // Alt 3: page.locator('input[name="password"]')
    // Alt 4: page.locator('input.baseInput-Pp_oVW').nth(1)
    this.passwordInput = page.getByRole('textbox', { name: 'Password Forgot your password?' });

    // Login button to submit the form.
    // Alt 1: page.locator('[data-testid="login-route"]').getByRole('button', { name: 'Login' })
    // Alt 2: page.locator('button[value="Login"]')
    // Alt 3: page.getByTestId('login-route').locator('[value="Login"]')
    // Alt 4: page.locator('form').getByRole('button', { name: 'Login' })
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  // --- Actions ---

  /**
   * Navigates directly to the login page.
   * @returns {Promise<this>}
   */
  async visit() {
    await this.navigate('https://unsplash.com/login');
    await this.emailInput.waitFor({ state: 'visible' });
    return this;
  }

  /**
   * Enters the user's email address into the email input field.
   * @param {string} email - The email address to enter.
   * @returns {Promise<this>}
   */
  async enterEmail(email) {
    await this.emailInput.fill(email);
    return this;
  }

  /**
   * Enters the user's password into the password input field.
   * @param {string} password - The password to enter.
   * @returns {Promise<this>}
   */
  async enterPassword(password) {
    await this.passwordInput.fill(password);
    return this;
  }

  /**
   * Clicks the login button to submit credentials and navigates to the Home page.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new instance of the HomePage.
   */
  async submitLogin() {
    await this.loginButton.click();
    // Use dynamic import to avoid circular dependencies between pages.
    const { HomePage } = await import('./HomePage.js');
    const homePage = new HomePage(this.page);
    await homePage.isLoaded(); // Wait for the destination page to confirm it's loaded
    return homePage;
  }

  /**
   * A high-level service method to perform a complete login action.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<import('./HomePage.js').HomePage>} A new instance of the HomePage.
   */
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    return this.submitLogin();
  }
}

export { LoginPage };