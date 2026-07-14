import { BasePage } from './BasePage.js';
import { WallpapersTopicPage } from './WallpapersTopicPage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.wallpapersCategoryLink = page.getByRole('link', { name: 'Wallpapers' });
  }

  /**
   * Navigates to the Unsplash homepage
   */
  async goto() {
    await this.page.goto('https://unsplash.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  /**
   * Clicks on the 'Wallpapers' category link in the navigation
   * @returns {WallpapersTopicPage}
   */
  async clickWallpapersCategory() {
    await this.wallpapersCategoryLink.click({ timeout: 30000 });
    return new WallpapersTopicPage(this.page);
  }
}
