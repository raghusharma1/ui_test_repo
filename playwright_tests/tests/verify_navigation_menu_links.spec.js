import { test, expect } from '@playwright/test';

test('Verify Navigation Menu Links', async ({ page }) => {
  // Step 1: Navigate to the cart page
  await page.goto('https://atid.store/cart-2/');
  await expect(page).toHaveURL('https://atid.store/cart-2/');

  // Step 2: Locate the 'Men' link and click it
  const menLink = page.locator("//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]");
  await expect(menLink).toBeVisible();
  await menLink.click();

  // Step 3: Verify redirection to the Men's category page
  await page.waitForURL('https://atid.store/product-category/men/');
  await expect(page).toHaveURL('https://atid.store/product-category/men/');

  // Step 4: Navigate back to the cart page
  await page.goto('https://atid.store/cart-2/');
  await expect(page).toHaveURL('https://atid.store/cart-2/');

  // Step 5: Locate the 'Women' link and click it
  const womenLink = page.locator("//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]");
  await expect(womenLink).toBeVisible();
  await womenLink.click();

  // Step 6: Verify redirection to the Women's category page
  await page.waitForURL('https://atid.store/product-category/women/');
  await expect(page).toHaveURL('https://atid.store/product-category/women/');

  // Step 7: Navigate back to the cart page
  await page.goto('https://atid.store/cart-2/');
  await expect(page).toHaveURL('https://atid.store/cart-2/');

  // Step 8: Locate the 'Accessories' link and click it
  const accessoriesLink = page.locator("//a[@href='https://atid.store/product-category/accessories/' and contains(@class, 'menu-link')]");
  await expect(accessoriesLink).toBeVisible();
  await accessoriesLink.click();

  // Step 9: Verify redirection to the Accessories category page
  await page.waitForURL('https://atid.store/product-category/accessories/');
  await expect(page).toHaveURL('https://atid.store/product-category/accessories/');
});