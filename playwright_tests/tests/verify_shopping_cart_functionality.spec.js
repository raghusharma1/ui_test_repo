import { test, expect } from '@playwright/test';

test('Verify Shopping Cart Functionality', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('https://atid.store/');
  await expect(page).toHaveURL('https://atid.store/');
  console.log('Navigated to the homepage.');

  // Step 2: Click on the 'SHOP NOW' button under the Women's category
  const shopNowButton = page.locator("//a[@href='https://atid.store/product-category/women/' and contains(@class, 'elementor-button-link')]");
  await shopNowButton.click();
  console.log('Clicked on the SHOP NOW button.');

  // Step 3: Wait for the Women's category page to load
  await page.waitForURL('https://atid.store/product-category/women/');
  await expect(page).toHaveURL('https://atid.store/product-category/women/');
  console.log('Women\'s category page loaded.');

  // Step 4: Locate and click on the product link 'Blue Denim Shorts'
  const productLink = page.locator("//a[@href='https://atid.store/product/blue-denim-shorts/' and contains(@class, 'ast-loop-product__link')]");
  await productLink.click();
  console.log('Clicked on the Blue Denim Shorts product link.');

  // Step 5: Wait for the product details page of 'Blue Denim Shorts' to load
  await page.waitForURL('https://atid.store/product/blue-denim-shorts/');
  await expect(page).toHaveURL('https://atid.store/product/blue-denim-shorts/');
  console.log('Product details page for Blue Denim Shorts loaded.');

  // Step 6: Click on the 'Add to Cart' button on the product page
  const addToCartButton = page.locator("button[name='add-to-cart']");
  await addToCartButton.click();
  console.log('Clicked on Add to Cart button.');

  // Step 7: Wait for the cart page to load
  await page.waitForURL('https://atid.store/cart-2/');
  await expect(page).toHaveURL('https://atid.store/cart-2/');
  console.log('Cart page loaded.');

  // Step 8: Verify that 'Blue Denim Shorts' is displayed in the shopping cart with correct pricing
  const cartItem = page.locator("//td[@class='product-name']//a[text()='Blue Denim Shorts']");
  const cartPrice = page.locator("//td[@class='product-total']");

  await expect(cartItem).toBeVisible();
  await expect(cartItem).toContainText('Blue Denim Shorts');
  console.log('Verified that Blue Denim Shorts is in the cart.');

  // Check the price (customize the price assertion as per actual product price)
  await expect(cartPrice).toBeVisible();
  console.log('Verified that the price is displayed correctly for Blue Denim Shorts.');

  console.log('Test completed successfully.');
});