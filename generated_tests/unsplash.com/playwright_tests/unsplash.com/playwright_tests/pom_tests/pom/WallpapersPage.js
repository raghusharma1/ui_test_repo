import { BasePage } from './BasePage.js';

export class WallpapersPage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Navigate to the Wallpapers category page
   * @returns {Promise<WallpapersPage>}
   */
  async navigateToWallpapers() {
    await this.page.goto('https://unsplash.com/t/wallpapers', { 
      timeout: 60000 
    });
    return this;
  }
}
