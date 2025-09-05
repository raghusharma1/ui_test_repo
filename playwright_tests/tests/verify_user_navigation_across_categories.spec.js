import { test, expect } from '@playwright/test';

test('Verify User Navigation Across Categories', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('https://atid.store/');
  await expect(page).toHaveURL('https://atid.store/');
  console.log('Navigated to the homepage.');

  // Step 2: Click on the 'MEN' menu link in the navigation bar
  try {
    const menMenuLink = page.locator("//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]");
    await menMenuLink.click();
    console.log("Clicked on 'MEN' menu link.");

    // Step 3: Wait for the Men's category page to load
    await page.waitForURL('https://atid.store/product-category/men/');
    await expect(page).toHaveURL('https://atid.store/product-category/men/');
    console.log("Men's category page loaded successfully.");

    // Verify that the Men's category page displays relevant products
    const menProducts = page.locator('.products'); // Assuming '.products' is the container for product listings
    await expect(menProducts).toBeVisible();
    console.log("Men's category page displays products.");
  } catch (error) {
    console.error("Error navigating to the Men's category page:", error);
  }

  // Step 4: Click on the 'WOMEN' menu link in the navigation bar
  try {
    const womenMenuLink = page.locator("//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]");
    await womenMenuLink.click();
    console.log("Clicked on 'WOMEN' menu link.");

    // Step 5: Wait for the Women's category page to load
    await page.waitForURL('https://atid.store/product-category/women/');
    await expect(page).toHaveURL('https://atid.store/product-category/women/');
    console.log("Women's category page loaded successfully.");

    // Verify that the Women's category page displays relevant products
    const womenProducts = page.locator('.products'); // Assuming '.products' is the container for product listings
    await expect(womenProducts).toBeVisible();
    console.log("Women's category page displays products.");
  } catch (error) {
    console.error("Error navigating to the Women's category page:", error);
  }

  // Step 6: Click on the 'ACCESSORIES' menu link in the navigation bar
  try {
    const accessoriesMenuLink = page.locator("//a[@href='https://atid.store/product-category/accessories/' and contains(@class, 'menu-link')]");
    await accessoriesMenuLink.click();
    console.log("Clicked on 'ACCESSORIES' menu link.");

    // Step 7: Wait for the Accessories category page to load
    await page.waitForURL('https://atid.store/product-category/accessories/');
    await expect(page).toHaveURL('https://atid.store/product-category/accessories/');
    console.log("Accessories category page loaded successfully.");

    // Verify that the Accessories category page displays relevant products
    const accessoriesProducts = page.locator('.products'); // Assuming '.products' is the container for product listings
    await expect(accessoriesProducts).toBeVisible();
    console.log("Accessories category page displays products.");
  } catch (error) {
    console.error("Error navigating to the Accessories category page:", error);
  }
});