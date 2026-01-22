import { expect } from '@playwright/test';

/**
 * Represents the base page object containing common functionalities
 * inherited by all other page objects.
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
   * Waits for the page to be in a stable state, typically after navigation or major actions.
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
   * Awaits a specific response from the network.
   * Useful for waiting on API calls to complete after an action.
   * @param {string} url The URL of the network request to wait for.
   * @returns {Promise<import('@playwright/test').Response>} The response object.
   */
  async waitForResponse(url) {
    return await this.page.waitForResponse(url);
  }
}

export { BasePage };