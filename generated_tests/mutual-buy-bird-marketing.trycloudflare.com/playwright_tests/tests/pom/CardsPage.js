import { BasePage } from './BasePage.js';

/**
 * Represents the Card Selection Page.
 * This page allows the user to select a credit card to view its details.
 */
class CardsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);

    // Locators
    /**
     * @description The first credit card image in the selection list.
     * @type {import('@playwright/test').Locator}
     * All selectors:
     * 1. page.locator('.card-image').first()
     * 2. page.locator('div.mastercard')
     * 3. page.locator('.mastercard')
     * 4. page.locator('div.card-image.mastercard')
     * 5. page.locator('[data-testid="card-item-1425"]').locator('div')
     */
    this.firstCreditCardImage = page.locator('.card-image').first();

    /**
     * @description The 'Continue' button to proceed after selecting a card.
     * @type {import('@playwright/test').Locator}
     * All selectors:
     * 1. page.getByTestId('continue-button')
     * 2. page.getByRole('button', { name: 'המשך' })
     * 3. page.getByText('המשך')
     * 4. page.locator('#root').getByRole('button', { name: 'המשך' })
     * 5. page.locator('button.btn.btn-primary')
     */
    this.continueButton = page.getByTestId('continue-button');
  }

  /**
   * Selects the first available credit card from the list.
   * @returns {Promise<this>} The current instance of the CardsPage for chaining.
   */
  async selectFirstCreditCard() {
    await this.firstCreditCardImage.click();
    return this;
  }

  /**
   * Clicks the 'Continue' button to move to the card preview page.
   * @returns {Promise<import('./CardsPreviewPage.js').CardsPreviewPage>} An instance of the CardsPreviewPage.
   */
  async clickContinueButton() {
    await this.continueButton.click();
    await this.waitForNavigation('**/#/cards/preview');
    const { CardsPreviewPage } = await import('./CardsPreviewPage.js');
    return new CardsPreviewPage(this.page);
  }

  /**
   * A composite action to select the first card and click continue.
   * @returns {Promise<import('./CardsPreviewPage.js').CardsPreviewPage>} An instance of the CardsPreviewPage.
   */
  async selectFirstCardAndContinue() {
    await this.selectFirstCreditCard();
    return this.clickContinueButton();
  }
}

export { CardsPage };