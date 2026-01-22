import { BasePage } from './BasePage.js';

class CardsPreviewPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators
    // Alternatives:
    // 1. page.getByRole('button', { name: /לצפייה בפרטי הכרטיס/ })
    // 2. page.getByText('לצפייה בפרטי הכרטיס')
    // 3. page.locator('#root').getByRole('button', { name: 'לצפייה בפרטי הכרטיס' })
    // 4. page.locator('button.btn.btn-primary')
    this.viewCardDetailsButton = page.getByTestId('view-card-details-button');
  }

  /**
   * Clicks the 'View card details' button to proceed to OTP verification.
   * @returns {Promise<import('./CardsOtpPage.js').CardsOtpPage>} An instance of the CardsOtpPage.
   */
  async proceedToOtpVerification() {
    await this.viewCardDetailsButton.click();
    const { CardsOtpPage } = await import('./CardsOtpPage.js');
    return new CardsOtpPage(this.page);
  }
}

export { CardsPreviewPage };