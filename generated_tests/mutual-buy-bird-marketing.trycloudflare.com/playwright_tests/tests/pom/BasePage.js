import { expect } from '@playwright/test';

/**
 * Represents the base page for all other page objects.
 * It contains common functionalities that can be shared across the application pages.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to the specified URL.
   * @param {string} url - The URL to navigate to.
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Waits for the page to be in the 'networkidle' state.
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Retrieves the title of the current page.
   * @returns {Promise<string>} The title of the page.
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Waits for a specific navigation to occur after an action.
   * @param {string | RegExp} urlPattern - The URL pattern to wait for.
   */
  async waitForNavigation(urlPattern) {
    await this.page.waitForURL(urlPattern);
  }
}

export { BasePage };