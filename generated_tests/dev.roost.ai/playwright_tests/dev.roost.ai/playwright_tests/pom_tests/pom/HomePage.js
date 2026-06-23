import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // No specific selectors for the homepage itself, as the first step is a navigation.
  }

  /**
   * Navigates to the RoostGPT shell homepage.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async navigateToHomepage() {
    // Changed waitUntil to 'networkidle' for more robust SPA loading.
    await this.navigate('https://dev.roost.ai', { waitUntil: 'networkidle', timeout: 60000 });
    return this;
  }
}
