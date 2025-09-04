import { test, expect } from '@playwright/test';

test('Verify Filtering Products by Price Range', async ({ page }) => {
  // Step 1: Navigate to the main page and click on "MEN" link
  await page.goto('https://atid.store');
  await expect(page).toHaveURL('https://atid.store');
  const menLink = page.locator("//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]");
  await menLink.click();
  await page.waitForURL('https://atid.store/product-category/men/');
  await expect(page).toHaveURL('https://atid.store/product-category/men/');

  // Step 2: Scroll to the price filter section on the sidebar
  const priceFilterSection = page.locator("//div[@id='woocommerce_price_filter-2']");
  await priceFilterSection.scrollIntoViewIfNeeded();

  // Step 3: Enter a minimum price in the 'Min price' field
  const minPriceField = page.locator("//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]/following-sibling::input");
  await minPriceField.fill('50'); // Example: Minimum price set to 50

  // Step 4: Enter a maximum price in the 'Max price' field
  const maxPriceField = page.locator("//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]/following-sibling::input");
  await maxPriceField.fill('150'); // Example: Maximum price set to 150

  // Step 5: Click on the 'FILTER' button
  const filterButton = page.locator("//button[normalize-space()='FILTER']");
  await filterButton.click();

  // Step 6: Verify that the product list updates to show only products within the specified price range
  const productList = page.locator('.products > .product');
  await productList.first().waitFor(); // Wait for the product list to update

  // Assertion: Verify all visible products have prices within the specified range
  const productPrices = await productList.locator('.price span').allTextContents();
  for (const priceText of productPrices) {
    const price = parseFloat(priceText.replace(/[^0-9.]/g, '')); // Extract numeric price value
    expect(price).toBeGreaterThanOrEqual(50);
    expect(price).toBeLessThanOrEqual(150);
  }

  console.log('Verified that all products are within the specified price range.');

  // Edge case handling: No products available for the given price range
  if (await productList.count() === 0) {
    console.warn('No products available for the specified price range.');
  }

  // Edge case handling: Filter button unresponsive
  try {
    await filterButton.click();
    console.log('Filter button is responsive.');
  } catch (error) {
    console.error('Filter button is unresponsive:', error);
  }
});