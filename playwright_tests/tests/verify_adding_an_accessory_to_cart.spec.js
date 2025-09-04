import { test, expect } from '@playwright/test';

test('Verify Adding an Accessory to Cart', async ({ page }) => {
  // Step 1: Navigate to the Accessories category page
  await page.goto('https://atid.store/product-category/accessories/');
  await expect(page).toHaveURL('https://atid.store/product-category/accessories/');
  console.log('Navigated to Accessories category page.');

  // Step 2: Scroll through the list of products
  await page.mouse.wheel(0, 500); // Scroll down
  console.log('Scrolled through the product list.');

  // Step 3: Click on a product to view its details
  const productLink = page.locator("//a[@href='https://atid.store/product/anchor-bracelet/' and contains(@class, 'woocommerce-LoopProduct-link')]");
  await productLink.click();
  console.log('Clicked on the product to view details.');

  // Step 4: Locate the 'Add to cart' button
  const addToCartButton = page.locator('//button[contains(@class, "single_add_to_cart_button")]');
  await expect(addToCartButton).toBeVisible();
  console.log("'Add to cart' button located.");

  // Step 5: Click the 'Add to cart' button
  await addToCartButton.click();
  await page.waitForTimeout(2000); // Wait for the cart update
  console.log("'Add to cart' button clicked.");

  // Step 6: Verify that the product is added to the cart
  const cartNotification = page.locator('//div[contains(@class, "woocommerce-message")]');
  await expect(cartNotification).toBeVisible();
  await expect(cartNotification).toContainText('has been added to your cart');
  console.log('Verified that the product was added to the cart.');

  // Step 7: Navigate to the cart page
  const cartLink = page.locator("//a[@href='https://atid.store/cart-2/' and contains(@class, 'cart-container')]");
  await cartLink.click();
  await page.waitForURL('https://atid.store/cart-2/');
  await expect(page).toHaveURL('https://atid.store/cart-2/');
  console.log('Navigated to the cart page.');

  // Step 8: Verify that the product appears in the cart
  const productInCart = page.locator('//td[@class="product-name"]//a[contains(text(), "Anchor Bracelet")]');
  await expect(productInCart).toBeVisible();
  console.log('Verified that the product appears in the cart.');

  // Step 9: Check the product quantity and price in the cart
  const productQuantity = page.locator('//input[@type="number" and @name="cart[fc9c3c8c8e6b7c4e7c3c3cf2b13a4a2e][qty]"]');
  await expect(productQuantity).toHaveValue('1'); // Ensure the quantity is 1
  console.log('Verified product quantity in the cart.');

  const productPrice = page.locator('//td[@class="product-subtotal"]//bdi');
  await expect(productPrice).toBeVisible();
  console.log('Verified product price in the cart.');

  console.log('Test completed successfully: Accessory added to cart and verified.');
});