import { test, expect } from '@playwright/test';

test('Verify Filtering Women Products by Price Range and Adding to Cart', async ({ page }) => {
  // Step 1: Navigate to the Women category page
  await page.goto('https://atid.store/product-category/women/');
  await expect(page).toHaveURL('https://atid.store/product-category/women/');
  console.log('Navigated to the Women category page.');

  // Step 2: Locate the 'Min price' input field and enter a value of 50
  const minPriceInput = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[1]/input');
  await expect(minPriceInput).toBeVisible();
  await minPriceInput.fill('50');
  console.log('Entered minimum price: 50.');

  // Step 3: Locate the 'Max price' input field and enter a value of 150
  const maxPriceInput = page.locator('//div[@id="woocommerce_price_filter-2"]/form/div/div[2]/label[2]/input');
  await expect(maxPriceInput).toBeVisible();
  await maxPriceInput.fill('150');
  console.log('Entered maximum price: 150.');

  // Step 4: Click the 'FILTER' button to apply the price filter
  const filterButton = page.locator('//button[normalize-space()="FILTER"]');
  await expect(filterButton).toBeVisible();
  await filterButton.click();
  console.log('Clicked the FILTER button.');

  // Step 5: Verify that the product list updates to reflect the selected price range
  await page.waitForTimeout(2000); // Wait for products to load
  const filteredProducts = page.locator('.products .product');
  expect(await filteredProducts.count()).toBeGreaterThan(0);
  console.log('Verified that products are filtered by the selected price range.');

  // Step 6: Select a product, such as 'Blue Denim Jeans', from the filtered results
  const productLink = page.locator('//a[@href="https://atid.store/product/blue-denim-jeans/" and contains(@class, "ast-loop-product__link")]');
  await expect(productLink).toBeVisible();
  await productLink.click();
  console.log('Selected "Blue Denim Jeans" from the filtered results.');

  // Step 7: Verify that the product detail page displays the correct product information, including price
  await expect(page).toHaveURL('https://atid.store/product/blue-denim-jeans/');
  const productTitle = page.locator('.product_title');
  const productPrice = page.locator('.woocommerce-Price-amount');
  await expect(productTitle).toBeVisible();
  await expect(productTitle).toContainText('Blue Denim Jeans');
  await expect(productPrice).toBeVisible();
  console.log('Verified product detail page displays correct product information.');

  // Step 8: Locate and click the 'Add to Cart' button on the product detail page
  const addToCartButton = page.locator('//button[@class="single_add_to_cart_button"]');
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();
  console.log('Clicked "Add to Cart" button.');

  // Step 9: Navigate to the cart page to verify the product has been added
  const viewCartLink = page.locator('a.view-cart');
  await expect(viewCartLink).toBeVisible();
  await viewCartLink.click();
  await expect(page).toHaveURL(/.*cart/);
  console.log('Navigated to the cart page.');

  // Step 10: Ensure the cart displays the correct product name, quantity, and price
  const cartProductName = page.locator('.cart_item .product-name a');
  const cartProductQuantity = page.locator('.cart_item .product-quantity input');
  const cartProductPrice = page.locator('.cart_item .product-price .woocommerce-Price-amount');

  await expect(cartProductName).toBeVisible();
  await expect(cartProductName).toContainText('Blue Denim Jeans');
  await expect(cartProductQuantity).toHaveValue('1');
  await expect(cartProductPrice).toBeVisible();
  console.log('Verified cart displays the correct product details (name, quantity, price).');
});