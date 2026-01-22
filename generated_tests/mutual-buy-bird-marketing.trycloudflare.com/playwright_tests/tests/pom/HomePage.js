import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

/**
 * Represents the Home Page, the main page after a successful login.
 */
class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page The Playwright page object.
   */
  constructor(page) {
    super(page);

    // --- Locators ---
    // At present, no interactions were captured on the home page,
    // so locators are not defined. They can be added here as needed.
    // Example: this.welcomeMessage = page.getByRole('heading', { name: /Welcome/ });
  }

  // --- Public Service Methods ---

  /**
   * Verifies that the user has successfully navigated to the home page
   * by checking for a unique URL pattern.
   * @returns {Promise<this>}
   */
  async expectToBeOnHomePage() {
    await expect(this.page).toHaveURL(/.*\/#\/home/);
    await this.page.waitForLoadState('networkidle');
    return this;
  }
  
  /**
   * Checks if a key element of the home page is visible, confirming a successful load.
   * This is a placeholder for a real element check.
   * @param {string} elementSelector - A selector for an element unique to the Home Page.
   * @returns {Promise<boolean>}
   */
  async isLoaded(elementSelector) {
    // In a real scenario, you'd have a reliable selector for the home page.
    // For now, this is a placeholder. Example:
    // const mainContent = this.page.locator('#main-content');
    // return await mainContent.isVisible();
    if (elementSelector) {
        return await this.page.locator(elementSelector).isVisible();
    }
    // As a fallback, we rely on the URL check from expectToBeOnHomePage.
    return this.page.url().includes('/#/home');
  }
}

export { HomePage };