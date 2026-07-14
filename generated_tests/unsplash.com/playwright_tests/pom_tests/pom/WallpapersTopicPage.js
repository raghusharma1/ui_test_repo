import { BasePage } from './BasePage.js';

export class WallpapersTopicPage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Clicks on a specific wallpaper by its name/alt text
   * @param {string} wallpaperName
   * @returns {this}
   */
  async selectSpecificWallpaper(wallpaperName) {
    // Use the provided wallpaper name to find the link
    const selector = this.page.getByRole('link', { name: wallpaperName });
    await selector.click({ timeout: 30000 });
    return this;
  }
}
