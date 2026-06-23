import { expect } from '@playwright/test';

class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to a specified URL.
   * @param {string} url - The URL to navigate to.
   * @param {object} [options] - Options for page.goto(), e.g., { waitUntil: 'domcontentloaded' }.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async navigate(url, options = { waitUntil: 'domcontentloaded', timeout: 60000 }) {
    await this.page.goto(url, options);
    return this;
  }

  /**
   * Saves the browser's storage state for authenticated sessions.
   * @param {import('@playwright/test').BrowserContext} context - The Playwright browser context.
   * @param {string} filePath - The path where the storage state should be saved.
   * @returns {Promise<void>}
   */
  async saveAuthState(context, filePath = '.auth/storage-state.json') {
    await context.storageState({ path: filePath });
    console.log(`✅ Storage state saved to: ${filePath}`);
  }

  /**
   * A generic wait for a specified duration. Use sparingly; prefer explicit waits for elements.
   * @param {number} milliseconds - The number of milliseconds to wait.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async waitForDuration(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
    return this;
  }
}

export { BasePage };