import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class PhotoDetailPage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Verifies that the current URL matches the expected photo detail URL pattern
   * @param {string|RegExp} expectedUrl 
   */
  async verifyPhotoUrl(expectedUrl) {
    await expect(this.page).toHaveURL(new RegExp(expectedUrl), { timeout: 30000 });
  }
}
