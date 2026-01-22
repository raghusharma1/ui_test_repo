import { BasePage } from './BasePage.js';

/**
 * Represents the One-Time Password (OTP) Verification Page.
 * This page requires the user to enter an OTP to proceed.
 */
class CardsOtpPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);

    // Locators
    /**
     * @description The 'Continue' button to verify the entered OTP.
     * @type {import('@playwright/test').Locator}
     */
    this.verifyOtpButton = page.getByTestId('verify-otp-button');
  }

  /**
   * Enters the One-Time Password by filling each digit into its respective input field.
   * @param {string} otpCode - The 6-digit OTP code.
   * @returns {Promise<this>} The current instance of the CardsOtpPage for chaining.
   */
  async enterOtp(otpCode) {
    if (!otpCode || otpCode.length !== 6) {
      throw new Error('A 6-digit OTP code is required.');
    }
    const digits = otpCode.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.page.getByTestId(`otp-input-${i}`).fill(digits[i]);
    }
    return this;
  }

  /**
   * Clicks the 'Continue' button to submit the OTP for verification.
   * @returns {Promise<import('./CardsDetailsPage.js').CardsDetailsPage>} An instance of the CardsDetailsPage.
   */
  async clickVerifyOtpButton() {
    await this.verifyOtpButton.click();
    await this.waitForNavigation('**/#/cards/details');
    const { CardsDetailsPage } = await import('./CardsDetailsPage.js');
    return new CardsDetailsPage(this.page);
  }

  /**
   * A composite action to enter the OTP and submit it.
   * @param {string} otpCode - The 6-digit OTP code.
   * @returns {Promise<import('./CardsDetailsPage.js').CardsDetailsPage>} An instance of the CardsDetailsPage.
   */
  async submitOtp(otpCode) {
    await this.enterOtp(otpCode);
    return this.clickVerifyOtpButton();
  }
}

export { CardsOtpPage };
