import { BasePage } from './BasePage.js';

class CardsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators
    // Alternatives:
    // 1. page.locator('div.card-item')
    // 2. page.locator('div').filter({ hasText: 'סוג כרטיסמאסטרקארדמספר כרטיס1425בעל הכרטיסישראל ישראלי' })
    this.cardItem1425 = page.getByTestId('card-item-1425');

    // Alternatives:
    // 1. page.getByRole('button', { name: 'המשך' })
    // 2. page.getByText('המשך')
    // 3. page.locator('#root').getByRole('button', { name: 'המשך' })
    // 4. page.locator('button.btn.btn-primary')
    this.continueButton = page.getByTestId('continue-button');
  }

  /**
   * Selects the Mastercard ending in 1425.
   * @returns {Promise<this>} The current instance of CardsPage for chaining.
   */
  async selectCardByNumber1425() {
    await this.cardItem1425.click();
    return this;
  }
  
  /**
   * A more generic method to select a card based on its last digits (or unique identifier in the test-id).
   * @param {string|number} cardNumber - The unique number of the card to select.
   * @returns {Promise<this>} The current instance of CardsPage for chaining.
   */
  async selectCard(cardNumber) {
    await this.page.getByTestId(`card-item-${cardNumber}`).click();
    return this;
  }

  /**
   * Clicks the 'Continue' button to proceed to the preview page.
   * @returns {Promise<import('./CardsPreviewPage.js').CardsPreviewPage>} An instance of the CardsPreviewPage.
   */
  async clickContinue() {
    await this.continueButton.click();
    const { CardsPreviewPage } = await import('./CardsPreviewPage.js');
    return new CardsPreviewPage(this.page);
  }

  /**
   * Service method to select a card and continue in one step.
   * @param {string|number} cardNumber - The unique number of the card to select.
   * @returns {Promise<import('./CardsPreviewPage.js').CardsPreviewPage>} An instance of the CardsPreviewPage.
   */
  async selectCardAndContinue(cardNumber) {
    await this.selectCard(cardNumber);
    return this.clickContinue();
  }
}

export { CardsPage };