import { test, expect } from '@playwright/test';

test('Verify Navigation to "Store" Page from Empty Cart', async ({ page }) => {
  // Step 1: Navigate to the Cart page
  const cartPageUrl = 'https://atid.store/cart-2/';
  await page.goto(cartPageUrl);

  // Step 2: Verify the Cart page loaded successfully
  await expect(page).toHaveURL(cartPageUrl);

  // Step 3: Locate the 'Return to Shop' button using the provided selector
  const returnToShopButton = page.locator("//a[@href='https://atid.store/store/' and contains(@class, 'button')]");
  await expect(returnToShopButton).toBeVisible(); // Verify button is visible
  await expect(returnToShopButton).toBeEnabled(); // Verify button is enabled

  // Step 4: Click on the 'Return to Shop' button
  await returnToShopButton.click();

  // Step 5: Wait for navigation to the Store page
  const storePageUrl = 'https://atid.store/store/';
  await page.waitForURL(storePageUrl);

  // Step 6: Verify the user is redirected to the Store page
  await expect(page).toHaveURL(storePageUrl);

  // Step 7: Check that the Store page displays product categories and listings
  const productCategories = page.locator('.product-categories, .products');
  await expect(productCategories).toBeVisible();

  // Additional Accessibility Verification: Ensure the 'Return to Shop' button is keyboard accessible
  await returnToShopButton.evaluate((button) => {
    if (!button.hasAttribute('tabindex') || button.getAttribute('tabindex') !== '0') {
      throw new Error('Button is not keyboard accessible');
    }
  });

  console.log('Test completed successfully: Navigation to the Store page verified.');
});