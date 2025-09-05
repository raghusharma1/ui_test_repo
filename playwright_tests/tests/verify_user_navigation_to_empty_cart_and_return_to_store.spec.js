import { test, expect } from '@playwright/test';

test('Verify User Navigation to Empty Cart and Return to Store', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('https://atid.store');
  await expect(page).toHaveURL('https://atid.store');
  console.log('Navigated to the homepage.');

  // Step 2: Click on the 'Cart' link in the main navigation menu
  try {
    const cartLink = page.locator("//a[@href='https://atid.store/cart-2/' and contains(@class, 'menu-link')]");
    await expect(cartLink).toBeVisible(); // Ensure the 'Cart' link is visible
    await cartLink.click();
    console.log('Clicked on the "Cart" link in the navigation menu.');
  } catch (error) {
    console.error('Failed to click on the "Cart" link:', error);
    throw error;
  }

  // Step 3: Verify that the cart page loads successfully
  await page.waitForURL('https://atid.store/cart-2/');
  await expect(page).toHaveURL('https://atid.store/cart-2/');
  console.log('Cart page loaded successfully.');

  // Step 4: Assert that the empty cart message is visible on the page
  try {
    const emptyCartMessage = page.locator('text=Your cart is currently empty'); // Adjust text as per actual message
    await expect(emptyCartMessage).toBeVisible();
    console.log('Verified that the empty cart message is visible.');
  } catch (error) {
    console.error('Failed to locate the empty cart message:', error);
    throw error;
  }

  // Step 5: Locate and click the 'RETURN TO SHOP' button
  try {
    const returnToShopButton = page.locator("//a[@href='https://atid.store/store/' and contains(@class, 'button')]");
    await expect(returnToShopButton).toBeVisible(); // Ensure the button is visible
    await returnToShopButton.click();
    console.log('Clicked the "RETURN TO SHOP" button.');
  } catch (error) {
    console.error('Failed to click on the "RETURN TO SHOP" button:', error);
    throw error;
  }

  // Step 6: Verify that the user is redirected to the store page
  await page.waitForURL('https://atid.store/store/');
  await expect(page).toHaveURL('https://atid.store/store/');
  console.log('Successfully redirected to the store page.');
});