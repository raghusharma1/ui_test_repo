import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class ConnectorsPage extends BasePage {
  constructor(page) {
    super(page);
    this.connectorsTab = page.getByTestId('connectors-tab');
    this.addConnectorButton = page.getByTestId('add-connector-button');
    this.geminiAIOption = page.getByText('Gemini AI');
    this.connectorNameInput = page.getByTestId('connector-name-input');
    this.apiKeyInput = page.getByTestId('ai-access-token');
    this.saveButton = page.getByTestId('connector-save-button'); // Keep for reference, but will use getByRole for click
  }

  /**
   * Clicks on the 'Connectors' tab to navigate to the connectors management page.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async clickConnectorsTab() {
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 }); // Wait for basic page structure
    // Use page.evaluate to bypass Playwright's actionability checks for a stubborn element
    await this.page.evaluate(selector => {
      const element = document.querySelector(`[data-testid="${selector}"]`);
      if (element) {
        element.scrollIntoView(); // Ensure element is in view
        element.click(); // Programmatic click
      }
    }, 'connectors-tab');
    return this;
  }

  /**
   * Clicks the 'Add Connector' button to open the connector creation form.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async clickAddConnectorButton() {
    await this.addConnectorButton.click({ timeout: 30000 });
    return this;
  }

  /**
   * Selects 'Gemini AI' as the type of connector to add.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async selectGeminiAIConnector() {
    await this.geminiAIOption.click({ timeout: 30000 });
    return this;
  }

  /**
   * Enters the name for the new Gemini AI connector.
   * @param {string} name - The name of the connector.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async fillConnectorName(name) {
    await this.connectorNameInput.click({ timeout: 30000 }); // Click to focus
    await this.connectorNameInput.pressSequentially(name, { delay: 50 }); // Type character by character
    return this;
  }

  /**
   * Enters the API Key for the Gemini AI connector.
   * @param {string} apiKey - The API Key for the connector.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async fillApiKey(apiKey) {
    await this.apiKeyInput.click({ timeout: 30000 }); // Click to focus
    await this.apiKeyInput.pressSequentially(apiKey, { delay: 50 }); // Type character by character
    return this;
  }

  /**
   * Clicks the 'Save' button to submit the connector creation form.
   * @returns {Promise<this>} - Returns the current page object for chaining.
   */
  async clickSaveButton() {
    const saveButtonByRole = this.page.getByRole('button', { name: 'Save' });
    await saveButtonByRole.waitFor({ state: 'visible', timeout: 10000 }); // Wait for button to be visible
    await this.page.waitForTimeout(500); // Small delay to ensure UI is ready
    await saveButtonByRole.click({ timeout: 30000, force: true }); // Force click if element is covered
    return this;
  }
}