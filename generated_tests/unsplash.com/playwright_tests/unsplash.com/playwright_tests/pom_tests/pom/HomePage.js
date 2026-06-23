import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Navigates to the Unsplash homepage.
   * @returns {Promise<this>}
   */
  async navigateToHomePage() {
    // Selector: page.goto('https://unsplash.com', { waitUntil: 'domcontentloaded' })
    await this.page.goto('https://unsplash.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    return this;
  }
}