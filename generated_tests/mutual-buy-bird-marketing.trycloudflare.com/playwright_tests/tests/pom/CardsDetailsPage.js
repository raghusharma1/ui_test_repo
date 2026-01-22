import { BasePage } from './BasePage.js';

class CardsDetailsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators
    // Alternatives:
    // 1. page.getByText('סיום')
    // 2. page.locator('#root').getByRole('button', { name: 'סיום' })
    // 3. page.locator('button.btn.btn-secondary')
    // 4. page.locator('button.btn')
    this.finishButton = page.getByRole('button', { name: 'סיום' });
  }

  /**
   * Clicks the 'Finish' button to complete the flow.
   * @returns {Promise<import('./SuccessPage.js').SuccessPage>} An instance of the SuccessPage.
   */
  async finishViewingDetails() {
    await this.finishButton.click();
    const { SuccessPage } = await import('./SuccessPage.js');
    return new SuccessPage(this.page);
  }
}

export { CardsDetailsPage };