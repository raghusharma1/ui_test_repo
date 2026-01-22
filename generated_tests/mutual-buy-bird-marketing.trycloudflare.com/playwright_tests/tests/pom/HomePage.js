import { BasePage } from './BasePage.js';

class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators
    // Alternatives:
    // 1. page.getByText('צפייה בפרטי כרטיס')
    // 2. page.locator('[data-testid="home-view-cards-button"]').locator('div')
    // 3. page.locator('div').filter({ hasText: /^צפייה בפרטי כרטיס$/ })
    this.viewCardDetailsButton = page.getByTestId('home-view-cards-button').getByText('צפייה בפרטי כרטיס');
  }

  /**
   * Clicks the 'View card details' button to navigate to the card selection page.
   * @returns {Promise<import('./CardsPage.js').CardsPage>} An instance of the CardsPage.
   */
  async viewCardDetails() {
    await this.viewCardDetailsButton.click();
    const { CardsPage } = await import('./CardsPage.js');
    return new CardsPage(this.page);
  }
}

export { HomePage };