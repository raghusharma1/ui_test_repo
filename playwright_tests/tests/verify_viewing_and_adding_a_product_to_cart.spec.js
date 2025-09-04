import { test, expect } from '@playwright/test';

test('Verify Viewing and Adding a Product to Cart', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('https://atid.store/');
  await expect(page).toHaveURL('https://atid.store/');
  console.log('Navigated to homepage.');

  // Step 2: Scroll to the Featured Products section
  await page.locator('text=Featured Products').scrollIntoViewIfNeeded();
  console.log('Scrolled to Featured Products section.');

  // Step 3: Click on the product link 'ATID Yellow Shoes'
  const productLink = page.locator("//a[@href='https://atid.store/product/atid-yellow-shoes/' and contains(@class, 'woocommerce-LoopProduct-link')]");
  await expect(productLink).toBeVisible();
  await productLink.click();
  console.log('Clicked on ATID Yellow Shoes product link.');

  // Step 4: Verify the product detail page loads with correct product information
  await expect(page).toHaveURL('https://atid.store/product/atid-yellow-shoes/');
  console.log('Product detail page loaded.');

  // Assert product details (name, price, description, images)
  const productName = page.locator('.product_title');
  const productPrice = page.locator('.price');
  const productDescription = page.locator('.woocommerce-product-details__short-description');
  const productImages = page.locator('.woocommerce-product-gallery__image');
  await expect(productName).toContainText('ATID Yellow Shoes');
  await expect(productPrice).toBeVisible();
  await expect(productDescription).toBeVisible();
  await expect(productImages).toBeVisible();
  console.log('Verified product details: name, price, description, and images.');

  // Step 5: Check if the 'Add to Cart' button is visible and enabled
  const addToCartButton = page.locator("//button[normalize-space()='Add to cart']");
  await expect(addToCartButton).toBeVisible();
  await expect(addToCartButton).toBeEnabled();
  console.log("'Add to Cart' button is visible and enabled.");

  // Step 6: Click on the 'Add to Cart' button
  await addToCartButton.click();
  console.log("Clicked 'Add to Cart' button.");

  // Step 7: Verify a confirmation message or UI update indicates the product has been added to the cart
  const cartConfirmation = page.locator('.woocommerce-message');
  await expect(cartConfirmation).toBeVisible();
  await expect(cartConfirmation).toContainText('“ATID Yellow Shoes” has been added to your cart.');
  console.log('Verified confirmation message that product was added to cart.');

  // Step 8: Navigate to the Cart page by clicking the cart icon in the header
  const cartIcon = page.locator("//a[@href='https://atid.store/cart-2/' and contains(@class, 'cart-container')]");
  await expect(cartIcon).toBeVisible();
  await cartIcon.click();
  await expect(page).toHaveURL('https://atid.store/cart-2/');
  console.log('Navigated to Cart page.');

  // Verify the product is visible in the cart
  const cartProduct = page.locator('.cart_item');
  await expect(cartProduct).toContainText('ATID Yellow Shoes');
  console.log('Verified that the product is in the cart.');
});