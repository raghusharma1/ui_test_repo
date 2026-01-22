import { BasePage } from './BasePage.js';

/**
 * Represents the Success Page shown after completing a workflow.
 */
class SuccessPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);

    // Locators
    /**
     * @description The main heading on the success page. This is an assumed selector.
     * @type {import('@playwright/test').Locator}
     */
    this.successHeading = page.getByRole('heading', { name: 'הפעולה בוצעה בהצלחה' });
  }

  /**
   * Checks if the success message heading is visible.
   * @returns {Promise<boolean>} True if the success heading is visible, false otherwise.
   */
  async isSuccessMessageVisible() {
    return this.successHeading.isVisible();
  }

  /**
   * Gets the text of the main success heading.
   * @returns {Promise<string|null>} The text content of the success heading.
   */
  async getSuccessMessage() {
    return this.successHeading.textContent();
  }
}

export { SuccessPage };