import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Load the Unsplash homepage
   * @returns {Promise<HomePage>}
   */
  async navigateToHome() {
    await this.page.goto('https://unsplash.com', { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
    return this;
  }
}
