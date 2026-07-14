export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to a specific URL
   * @param {string} url 
   */
  async navigate(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  /**
   * Waits for the page URL to match a pattern
   * @param {string|RegExp} urlPattern 
   */
  async waitForURL(urlPattern) {
    await this.page.waitForURL(urlPattern, { timeout: 60000 });
  }
}
