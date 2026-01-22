import { expect } from '@playwright/test';

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to a specified URL.
   * @param {string} url - The URL to navigate to.
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Waits for the page to be fully loaded, including network activity to be idle.
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Gets the title of the current page.
   * @returns {Promise<string>} The page title.
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Gets the URL of the current page.
   * @returns {string} The current page URL.
   */
  getPageUrl() {
    return this.page.url();
  }
}

export { BasePage };