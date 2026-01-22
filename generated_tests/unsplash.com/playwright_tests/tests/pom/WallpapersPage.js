import { BasePage } from './BasePage.js';

/**
 * @class WallpapersPage
 * @description Represents the Wallpapers gallery page and its interactions.
 */
class WallpapersPage extends BasePage {
  /**
   * @constructor
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);

    // --- Locators ---

    /**
     * @private
     * Locator for a specific wallpaper link, identified by its accessible name (alt text).
     * This is an example locator based on the captured interaction.
     * A more robust approach is to use the generic method `selectWallpaperByTitle`.
     */
    this.abstractPinkWallpaperLink = page.getByRole('link', { name: 'Abstract pink and purple' });
    // Alternative selectors:
    // page.locator('a.photoInfoLink-mG0SPO[href*="-texture-ghYgiyVb9N4"]')
    // page.locator('a[href*="abstract-pink-and-purple-marbled-texture-ghYgiyVb9N4"]')
    // page.locator('xpath=html/body/div[2]/div/div/div/div[2]/div[2]/div[3]/div[3]/div/div/div[1]/figure[1]/div[1]/div/a')
  }

  // --- Actions ---

  /**
   * Clicks on the specific "Abstract pink and purple" wallpaper to view its details.
   * @returns {Promise<import('./PhotoDetailsPage.js').PhotoDetailsPage>} A new PhotoDetailsPage object.
   */
  async selectAbstractPinkWallpaper() {
    await this.abstractPinkWallpaperLink.click();
    // This action causes navigation, so we import and return the next page object.
    const { PhotoDetailsPage } = await import('./PhotoDetailsPage.js');
    return new PhotoDetailsPage(this.page);
  }

  /**
   * A more generic and reusable method to select any wallpaper by its title or accessible name.
   * @param {string} wallpaperTitle - The accessible name (alt text) of the wallpaper image link to click.
   * @returns {Promise<import('./PhotoDetailsPage.js').PhotoDetailsPage>} A new PhotoDetailsPage object.
   */
  async selectWallpaperByTitle(wallpaperTitle) {
    await this.page.getByRole('link', { name: wallpaperTitle }).click();
    const { PhotoDetailsPage } = await import('./PhotoDetailsPage.js');
    return new PhotoDetailsPage(this.page);
  }
}

export { WallpapersPage };