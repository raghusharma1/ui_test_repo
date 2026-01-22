import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

/**
 * Represents the Home Page, the main page after a successful login.
 * Encapsulates selectors and actions for the authenticated area.
 */
class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page The Playwright page object.
   */
  constructor(page) {
    super(page);
    
    // No specific interactive elements were captured for this page.
    // Selectors can be added here as more user journeys are defined.
  }

  /**
   * Verifies that the user has successfully navigated to the home page
   * by checking the URL pattern.
   * @returns {Promise<this>} The current HomePage instance for chaining.
   */
  async expectToBeOnHomePage() {
    // This regular expression checks if the URL path ends with '/home'
    await expect(this.page).toHaveURL(/.*\/#\/home/);
    return this;
  }

  /**
   * A placeholder method to check if the page appears to be loaded correctly.
   * In a real-world scenario, this would check for a key element on the page.
   * @param {string} welcomeSelector A selector for a unique welcome message or header.
   * @returns {Promise<boolean>} True if the welcome element is visible, false otherwise.
   */
  async isWelcomeMessageVisible(welcomeSelector = 'h1:has-text("Welcome")') {
    // Note: This is a placeholder selector. Update with a real one from your app.
    const welcomeElement = this.page.locator(welcomeSelector);
    return await welcomeElement.isVisible();
  }
}

export { HomePage };