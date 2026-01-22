import { BasePage } from './BasePage.js';

/**
 * Represents the Card Details Page.
 * This page displays the full credit card information after successful verification.
 */
class CardsDetailsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);

    // Locators
    /**
     * @description The 'Finish' button to complete the workflow.
     * @type {import('@playwright/test').Locator}
     * All selectors:
     * 1. page.getByRole('button', { name: 'סיום' })
     * 2. page.getByText('סיום')
     * 3. page.locator('#root').getByRole('button', { name: 'סיום' })
     * 4. page.locator('button.btn.btn-secondary')
     * 5. page.locator('button.btn')
     */
    this.finishButton = page.getByRole('button', { name: 'סיום' });

    // Note: Locators for card number, CVV, and expiry date would be added here
    // for test verification, e.g., this.cardNumber = page.getByTestId('card-number');
  }

  /**
   * Clicks the 'Finish' button to conclude the process and navigate to the success page.
   * @returns {Promise<import('./SuccessPage.js').SuccessPage>} An instance of the SuccessPage.
   */
  async clickFinishButton() {
    await this.finishButton.click();
    await this.waitForNavigation('**/#/success');
    const { SuccessPage } = await import('./SuccessPage.js');
    return new SuccessPage(this.page);
  }

  /**
   * Retrieves the text of a displayed card detail (example).
   * In a real scenario, you would have specific locators for each piece of data.
   * @param {string} dataTestId - The data-testid of the element to retrieve text from.
   * @returns {Promise<string|null>} The text content of the element.
   */
  async getCardDetail(dataTestId) {
    return this.page.getByTestId(dataTestId).textContent();
  }
}

export { CardsDetailsPage };