import { test, expect } from '@playwright/test';

test('Verify Filtering Accessories by Price Range', async ({ page }) => {
  // Step 1: Navigate to the Accessories category page
  const accessoriesPageUrl = 'https://atid.store/product-category/accessories/';
  await page.goto(accessoriesPageUrl);
  await expect(page).toHaveURL(accessoriesPageUrl);
  console.log('Navigated to Accessories category page.');

  // Step 2: Locate the price filter section
  const minPriceSelector = '//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[1]';
  const maxPriceSelector = '//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[2]';
  const filterButtonSelector = '//button[normalize-space()="FILTER"]';
  
  const minPriceField = page.locator(minPriceSelector);
  const maxPriceField = page.locator(maxPriceSelector);
  const filterButton = page.locator(filterButtonSelector);

  await expect(minPriceField).toBeVisible();
  await expect(maxPriceField).toBeVisible();
  await expect(filterButton).toBeVisible();
  console.log('Located price filter section.');

  // Step 3: Input the minimum price in the 'Min price' field
  const minPriceValue = '20'; // Specify the minimum price value
  await minPriceField.fill(minPriceValue);
  console.log(`Entered minimum price: ${minPriceValue}`);

  // Step 4: Input the maximum price in the 'Max price' field
  const maxPriceValue = '100'; // Specify the maximum price value
  await maxPriceField.fill(maxPriceValue);
  console.log(`Entered maximum price: ${maxPriceValue}`);

  // Step 5: Click the 'FILTER' button
  await filterButton.click();
  console.log('Clicked the FILTER button.');

  // Step 6: Verify that the page reloads or updates dynamically
  await page.waitForNavigation(); // Wait for navigation or dynamic update
  await expect(page).toHaveURL(accessoriesPageUrl); // Ensure page remains on the Accessories category
  console.log('Page reloaded or updated dynamically.');

  // Step 7: Scroll through the list of filtered products
  const productListSelector = '.products'; // Use a robust selector for the list of products
  const productItems = page.locator(`${productListSelector} .product`);
  
  await expect(productListSelector).toBeVisible();
  const productCount = await productItems.count();
  console.log(`Found ${productCount} products in the filtered list.`);
  
  // If there are no products, log and exit early
  if (productCount === 0) {
    console.log('No products found within the specified price range.');
    return;
  }

  // Step 8: Click on a product to view its details
  const firstProduct = productItems.nth(0); // Select the first product in the list
  await firstProduct.click();
  console.log('Clicked on the first product to view its details.');

  // Step 9: Verify that the product price falls within the specified range
  const productPriceSelector = '.price'; // Use a robust selector for the product price
  const productPriceElement = page.locator(productPriceSelector);

  await expect(productPriceElement).toBeVisible();
  const productPriceText = await productPriceElement.innerText();
  const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, '')); // Extract the numeric price value
  
  expect(productPrice).toBeGreaterThanOrEqual(parseFloat(minPriceValue));
  expect(productPrice).toBeLessThanOrEqual(parseFloat(maxPriceValue));
  console.log(`Verified product price (${productPrice}) is within the range ${minPriceValue} - ${maxPriceValue}.`);
});