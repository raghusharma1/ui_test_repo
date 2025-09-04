import { test, expect } from '@playwright/test';

test('Verify Price Filter Functionality', async ({ page }) => {
  // Step 1: Navigate to the Store page
  const storePageURL = 'https://atid.store/store/';
  await page.goto(storePageURL);

  // Step 2: Verify the Store page loaded correctly
  await expect(page).toHaveURL(storePageURL);
  console.log('Navigated to Store page.');

  // Step 3: Locate the price filter section
  const minPriceField = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[1]/following-sibling::input');
  const maxPriceField = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[2]/following-sibling::input');
  const filterButton = page.locator('//button[normalize-space()="FILTER"]');

  // Ensure the price filter section is visible
  await expect(minPriceField).toBeVisible();
  await expect(maxPriceField).toBeVisible();
  await expect(filterButton).toBeVisible();
  console.log('Price filter section located.');

  // Step 4: Enter '50' in the 'Min price' field
  await minPriceField.fill('50');
  console.log('Entered 50 in Min price field.');

  // Step 5: Enter '150' in the 'Max price' field
  await maxPriceField.fill('150');
  console.log('Entered 150 in Max price field.');

  // Step 6: Click the 'FILTER' button
  await filterButton.click();
  console.log('Clicked FILTER button.');

  // Step 7: Wait for the page to refresh with filtered results
  await page.waitForNavigation();
  console.log('Page refreshed with filtered results.');

  // Step 8: Verify that all displayed products have prices between 50 and 150
  const productPrices = page.locator('.price'); // Assuming '.price' is the selector for product prices
  const productCount = await productPrices.count();

  if (productCount === 0) {
    throw new Error('No products found after filtering.');
  }

  for (let i = 0; i < productCount; i++) {
    const priceText = await productPrices.nth(i).innerText();
    const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, '')); // Extract numeric value from price text

    if (priceValue < 50 || priceValue > 150) {
      throw new Error(`Product price ${priceValue} is outside the range 50-150.`);
    }
  }
  console.log('All displayed products have prices within the range 50-150.');

  // Step 9: Adjust the filter to a different range and repeat the verification
  await minPriceField.fill('200');
  console.log('Entered 200 in Min price field.');

  await maxPriceField.fill('300');
  console.log('Entered 300 in Max price field.');

  await filterButton.click();
  console.log('Clicked FILTER button for new range.');

  await page.waitForNavigation();
  console.log('Page refreshed with filtered results for new range.');

  const updatedProductPrices = page.locator('.price');
  const updatedProductCount = await updatedProductPrices.count();

  if (updatedProductCount === 0) {
    console.log('No products found for the new price range.');
  } else {
    for (let i = 0; i < updatedProductCount; i++) {
      const updatedPriceText = await updatedProductPrices.nth(i).innerText();
      const updatedPriceValue = parseFloat(updatedPriceText.replace(/[^0-9.]/g, ''));

      if (updatedPriceValue < 200 || updatedPriceValue > 300) {
        throw new Error(`Product price ${updatedPriceValue} is outside the range 200-300.`);
      }
    }
    console.log('All displayed products have prices within the range 200-300.');
  }
});