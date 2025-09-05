import { test, expect } from '@playwright/test';

test('Filter Products by Price Range', async ({ page }) => {
  // Step 1: Navigate to the store page
  const storePage = 'https://atid.store/store/';
  await page.goto(storePage);

  // Verify that the page has loaded correctly
  await expect(page).toHaveURL(storePage);

  // Step 2: Locate the 'Min price' and 'Max price' fields
  const minPriceField = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[1]/following-sibling::input');
  const maxPriceField = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[2]/following-sibling::input');

  // Verify that the fields are visible
  await expect(minPriceField).toBeVisible();
  await expect(maxPriceField).toBeVisible();

  // Step 3: Input a value of 50 in the 'Min price' field
  await minPriceField.fill('50');

  // Step 4: Input a value of 150 in the 'Max price' field
  await maxPriceField.fill('150');

  // Step 5: Click the 'FILTER' button to apply the price range filter
  const filterButton = page.locator('//button[normalize-space()="FILTER"]');
  await filterButton.click();

  // Step 6: Wait for the filtered products list to load
  await page.waitForTimeout(2000); // Allow some time for the filter operation to complete

  // Step 7: Verify that all displayed products have prices within the range of 50 to 150
  const productPrices = await page.locator('.price').allTextContents();

  // Convert the prices to numbers and validate they are within the specified range
  for (const priceText of productPrices) {
    const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // Extract numeric values from price strings
    expect(price).toBeGreaterThanOrEqual(50);
    expect(price).toBeLessThanOrEqual(150);
  }

  // Log a success message if all validations pass
  console.log('All displayed products have prices within the range of 50 to 150.');
});