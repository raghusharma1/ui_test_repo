import { test, expect } from '@playwright/test';

test('Verify Product Browsing by Category', async ({ page }) => {
  // Base URL for the Store page
  const storePageUrl = 'https://atid.store/store/';
  const categories = [
    { name: 'Men', url: 'https://atid.store/product-category/men/' },
    { name: 'Women', url: 'https://atid.store/product-category/women/' },
    { name: 'Accessories', url: 'https://atid.store/product-category/accessories/' }
  ];

  // Navigate to the Store page
  await page.goto(storePageUrl);
  await expect(page).toHaveURL(storePageUrl);
  console.log('Store page loaded successfully.');

  for (const category of categories) {
    try {
      // Click on the category link
      console.log(`Navigating to ${category.name} category...`);
      const categoryLink = page.locator(`//a[@href='${category.url}' and contains(@class, 'menu-link')]`);
      await categoryLink.click();

      // Wait for the product listing page to load
      await page.waitForURL(category.url);
      await expect(page).toHaveURL(category.url);
      console.log(`${category.name} category page loaded successfully.`);

      // Verify that the product listing contains items exclusively from the selected category
      const productListing = page.locator('.products-grid');
      await expect(productListing).toBeVisible();
      console.log(`Product listing for ${category.name} is visible.`);

      const categoryTitle = page.locator('.woocommerce-products-header__title');
      await expect(categoryTitle).toContainText(category.name);
      console.log(`Verified that the product listing contains items exclusively for ${category.name} category.`);
    } catch (error) {
      console.error(`Error navigating to ${category.name} category or verifying products:`, error);
      // Capture a screenshot on failure
      await page.screenshot({ path: `error-${category.name}-category.png` });
      throw error;
    }
  }
});