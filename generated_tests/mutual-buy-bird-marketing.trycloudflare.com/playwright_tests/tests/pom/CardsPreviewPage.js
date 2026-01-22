import { BasePage } from './BasePage.js';

/**
 * Represents the Card Preview Page.
 * This page shows a preview of the selected card and requires confirmation to proceed.
 */
class CardsPreviewPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);

    // Locators
    /**
     * @description The 'View card details' confirmation button.
     * @type {import('@playwright/test').Locator}
     * All selectors:
     * 1. page.getByTestId('view-card-details-button')
     * 2. page.getByRole('button', { name: /לצפייה בפרטי הכרטיס/ })
     * 3. page.getByText('לצפייה בפרטי הכרטיס')
     * 4. page.locator('#root').getByRole('button', { name: 'לצפייה בפרטי הכרטיס' })
     * 5. page.locator('button.btn.btn-primary')
     */
    this.confirmViewDetailsButton = page.getByTestId('view-card-details-button');
  }

  /**
   * Clicks the 'View card details' button to trigger OTP verification.
   * @returns {Promise<import('./CardsOtpPage.js').CardsOtpPage>} An instance of the CardsOtpPage.
   */
  async clickConfirmViewDetailsButton() {
    await this.confirmViewDetailsButton.click();
    await this.waitForNavigation('**/#/cards/otp');
    const { CardsOtpPage } = await import('./CardsOtpPage.js');
    return new CardsOtpPage(this.page);
  }
}

export { CardsPreviewPage };