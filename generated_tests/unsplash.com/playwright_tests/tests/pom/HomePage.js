import { BasePage } from './BasePage.js';

/**
 * @class HomePage
 * @description Represents the Unsplash Home Page and its interactions.
 */
class HomePage extends BasePage {
  /**
   * @constructor
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);

    // --- Locators ---

    /**
     * @private
     * Locator for the 'Wallpapers' link in the main navigation bar.
     */
    this.wallpapersLink = page.getByRole('link', { name: 'Wallpapers' });
    // Alternative selectors:
    // page.getByText('Wallpapers')
    // page.locator('a').filter({ hasText: /^Wallpapers$/ })
    // page.locator('a').filter({ hasText: 'Wallpapers' })
    // page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div[1]/div/div/div/div/ul/li[2]/a')
  }

  // --- Actions ---

  /**
   * Clicks the 'Wallpapers' navigation link to go to the wallpapers gallery page.
   * @returns {Promise<import('./WallpapersPage.js').WallpapersPage>} A new WallpapersPage object.
   */
  async navigateToWallpapersPage() {
    await this.wallpapersLink.click();
    // This action causes navigation, so we import and return the next page object.
    const { WallpapersPage } = await import('./WallpapersPage.js');
    return new WallpapersPage(this.page);
  }

  /**
   * A convenience method to navigate to the website's base URL.
   * @param {string} [baseURL='https://unsplash.com/'] - The base URL to navigate to.
   * @returns {Promise<HomePage>}
   */
  async open(baseURL = 'https://unsplash.com/') {
    await this.navigate(baseURL);
    return this;
  }
}

export { HomePage };