import { expect } from '@playwright/test';

/**
 * The base class for all Page Objects.
 * It provides common functionalities that can be used across different pages.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page The Playwright page object.
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to the specified URL.
   * @param {string} url The URL to navigate to.
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Waits for the page to be in a stable state (network idle).
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Retrieves the title of the current page.
   * @returns {Promise<string>} The page title.
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Verifies that the current page URL matches the expected pattern.
   * @param {string|RegExp} urlPattern The expected URL pattern (string or RegExp).
   */
  async expectUrlToMatch(urlPattern) {
    await expect(this.page).toHaveURL(urlPattern);
  }
}

export { BasePage };