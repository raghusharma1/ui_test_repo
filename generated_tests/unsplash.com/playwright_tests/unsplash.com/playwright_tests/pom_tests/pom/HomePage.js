import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Navigates to the Unsplash homepage.
   * @returns {Promise<HomePage>} The current HomePage instance for chaining.
   */
  async navigateToHomepage() {
    // Selector: page.goto('https://unsplash.com', { waitUntil: 'domcontentloaded' })
    await this.page.goto('https://unsplash.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }
}