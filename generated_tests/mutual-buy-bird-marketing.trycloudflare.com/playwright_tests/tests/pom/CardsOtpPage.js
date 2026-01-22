import { BasePage } from './BasePage.js';

class CardsOtpPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators
    this.otpInput0 = page.getByTestId('otp-input-0');
    this.otpInput1 = page.getByTestId('otp-input-1');
    this.otpInput2 = page.getByTestId('otp-input-2');
    this.otpInput3 = page.getByTestId('otp-input-3');
    this.otpInput4 = page.getByTestId('otp-input-4');
    this.otpInput5 = page.getByTestId('otp-input-5');
    this.otpInputs = [this.otpInput0, this.otpInput1, this.otpInput2, this.otpInput3, this.otpInput4, this.otpInput5];

    // Alternatives:
    // 1. page.getByRole('button', { name: 'המשך' })
    // 2. page.getByText('המשך')
    // 3. page.locator('#root').getByRole('button', { name: 'המשך' })
    // 4. page.locator('button.btn.btn-primary')
    this.verifyOtpButton = page.getByTestId('verify-otp-button');
  }

  /**
   * Enters the complete OTP code.
   * Assumes the application auto-focuses to the next input.
   * If not, a more robust implementation would click each input.
   * @param {string} otpCode - The OTP code as a string (e.g., "123456").
   * @returns {Promise<this>} The current instance of CardsOtpPage for chaining.
   */
  async enterOtp(otpCode) {
    const digits = otpCode.split('');
    for (let i = 0; i < digits.length; i++) {
        if(this.otpInputs[i]) {
            await this.otpInputs[i].fill(digits[i]);
        }
    }
    return this;
  }

  /**
   * Clicks the 'Verify' button after entering the OTP.
   * @returns {Promise<import('./CardsDetailsPage.js').CardsDetailsPage>} An instance of the CardsDetailsPage.
   */
  async submitOtp() {
    await this.verifyOtpButton.click();
    const { CardsDetailsPage } = await import('./CardsDetailsPage.js');
    return new CardsDetailsPage(this.page);
  }

  /**
   * Service method to enter and submit the OTP in one action.
   * @param {string} otpCode - The OTP code as a string.
   * @returns {Promise<import('./CardsDetailsPage.js').CardsDetailsPage>} An instance of the CardsDetailsPage.
   */
  async enterAndSubmitOtp(otpCode) {
    await this.enterOtp(otpCode);
    return this.submitOtp();
  }
}

export { CardsOtpPage };