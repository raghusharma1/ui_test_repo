import { BasePage } from './BasePage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors from the provided script
    this.noAuthSpan = page.locator('span.noAuth');
  }

  /**
   * Navigates to the login page.
   * @param {string} url - The specific login URL.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async goTo(url) {
    await this.navigate(url, { timeout: 30000 });
    return this;
  }

  /**
   * Clicks the 'noAuth' span element.
   * The script implies this action might initiate an authentication flow or bypass an initial auth screen.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async clickNoAuthSpan() {
    await this.noAuthSpan.click({ timeout: 30000 });
    return this;
  }

  /**
   * Waits for a specific duration, as per the original script's requirement to
   * "wait for an authenticated UI element so we know the SPA has hydrated".
   * This method uses a fixed timeout, which ideally should be replaced with
   * a wait for a specific UI element to appear for better robustness.
   * @param {number} milliseconds - The duration to wait (e.g., 10000 for 10 seconds).
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async waitForSPAPropagation(milliseconds = 10000) {
    console.log(`Waiting for ${milliseconds}ms for SPA hydration and authentication propagation.`);
    await this.waitForDuration(milliseconds);
    return this;
  }

  /**
   * Executes the full login process as described in the provided script.
   * Navigates, interacts with the 'noAuth' span, waits for propagation, and saves auth state.
   * @param {string} loginUrl - The URL of the login page.
   * @param {import('@playwright/test').BrowserContext} context - The Playwright browser context.
   * @param {string} [authStatePath='../.auth/storage-state.json'] - Path to save the storage state.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async performLoginFlow(loginUrl, context, authStatePath = '../.auth/storage-state.json') {
    await this.goTo(loginUrl);
    await this.clickNoAuthSpan();
    await this.waitForSPAPropagation(); // Hardcoded 10 seconds as per script
    await this.saveAuthState(context, authStatePath);
    return this;
  }
}

export { LoginPage };