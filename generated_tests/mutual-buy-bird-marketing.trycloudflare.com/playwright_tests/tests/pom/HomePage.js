import { BasePage } from './BasePage.js';

/**
 * Represents the Home Page of the application.
 * Encapsulates all interactions and elements available on the home page.
 */
class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);

    // Locators
    /**
     * @description Link to start the process of viewing card details.
     * @type {import('@playwright/test').Locator}
     * All selectors:
     * 1. page.getByTestId('home-view-cards-button').getByText('צפייה בפרטי כרטיס')
     * 2. page.getByText('צפייה בפרטי כרטיס')
     * 3. page.locator('[data-testid="home-view-cards-button"]').locator('div')
     * 4. page.locator('div').filter({ hasText: /^צפייה בפרטי כרטיס$/ })
     */
    this.viewCardDetailsLink = page.getByTestId('home-view-cards-button').getByText('צפייה בפרטי כרטיס');
  }

  /**
   * Clicks the 'View card details' link to navigate to the card selection page.
   * @returns {Promise<import('./CardsPage.js').CardsPage>} An instance of the CardsPage.
   */
  async clickViewCardDetailsLink() {
    await this.viewCardDetailsLink.click();
    await this.waitForNavigation('**/#/cards');
    const { CardsPage } = await import('./CardsPage.js');
    return new CardsPage(this.page);
  }

  /**
   * Navigates to the home page of the application.
   * @param {string} baseUrl - The base URL of the application.
   */
  async visit(baseUrl) {
    await this.navigate(baseUrl);
    await this.waitForPageLoad();
  }
}

export { HomePage };