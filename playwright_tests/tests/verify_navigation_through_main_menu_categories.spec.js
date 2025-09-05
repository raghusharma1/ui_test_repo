import { test, expect } from '@playwright/test';

test('Verify Navigation Through Main Menu Categories', async ({ page }) => {
  // Step 1: Navigate to 'https://atid.store'.
  await page.goto('https://atid.store');
  await expect(page).toHaveURL('https://atid.store');

  // Step 2: Click on the 'MEN' menu link.
  const menMenuLink = page.locator("//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]");
  await menMenuLink.click();

  // Step 3: Verify that the page navigates to 'https://atid.store/product-category/men/'.
  await page.waitForURL('https://atid.store/product-category/men/');
  await expect(page).toHaveURL('https://atid.store/product-category/men/');

  // Step 4: Click on the 'WOMEN' menu link.
  const womenMenuLink = page.locator("//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]");
  await womenMenuLink.click();

  // Step 5: Verify that the page navigates to 'https://atid.store/product-category/women/'.
  await page.waitForURL('https://atid.store/product-category/women/');
  await expect(page).toHaveURL('https://atid.store/product-category/women/');

  // Step 6: Click on the 'ACCESSORIES' menu link.
  const accessoriesMenuLink = page.locator("//a[@href='https://atid.store/product-category/accessories/' and contains(@class, 'menu-link')]");
  await accessoriesMenuLink.click();

  // Step 7: Verify that the page navigates to 'https://atid.store/product-category/accessories/'.
  await page.waitForURL('https://atid.store/product-category/accessories/');
  await expect(page).toHaveURL('https://atid.store/product-category/accessories/');
});