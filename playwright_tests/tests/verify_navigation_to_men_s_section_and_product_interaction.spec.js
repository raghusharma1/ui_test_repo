import { test, expect } from '@playwright/test';

test('Verify Navigation to Men\'s Section and Product Interaction', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('https://atid.store');
  await expect(page).toHaveURL('https://atid.store');

  // Step 2: Locate and click on the 'MEN' navigation link in the main menu
  try {
    const menLink = page.locator("//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]");
    await expect(menLink).toBeVisible({ timeout: 5000 }); // Ensure the link is visible
    await menLink.click();
    console.log('Clicked on the "MEN" link in the main menu.');
  } catch (error) {
    console.error('Error locating or clicking the "MEN" link:', error);
    throw error; // Fail the test if this step fails
  }

  // Step 3: Verify that the page redirects to the Men's section
  await page.waitForURL('https://atid.store/product-category/men/');
  await expect(page).toHaveURL('https://atid.store/product-category/men/');
  console.log('Successfully navigated to the Men\'s section.');

  // Step 4: Scroll through the product listings to ensure all men's products are visible
  try {
    const products = page.locator('ul.products li.product');
    await expect(products).toHaveCountGreaterThan(0); // Ensure at least one product is visible
    await products.first().scrollIntoViewIfNeeded(); // Scroll to the first product
    console.log('Scrolled through the product listings, and products are visible.');
  } catch (error) {
    console.error('Error verifying or scrolling through products:', error);
    throw error; // Fail the test if no products are visible
  }

  // Step 5: Click on the product link for 'ATID Yellow Shoes'
  try {
    const yellowShoesLink = page.locator("//a[@href='https://atid.store/product/atid-yellow-shoes/' and contains(@class, 'ast-loop-product__link')]");
    await expect(yellowShoesLink).toBeVisible({ timeout: 5000 }); // Ensure the product link is visible
    await yellowShoesLink.click();
    console.log('Clicked on the "ATID Yellow Shoes" product link.');
  } catch (error) {
    console.error('Error locating or clicking the "ATID Yellow Shoes" product link:', error);
    throw error; // Fail the test if this step fails
  }

  // Step 6: Verify that the product detail page for 'ATID Yellow Shoes' is displayed
  await page.waitForURL('https://atid.store/product/atid-yellow-shoes/');
  await expect(page).toHaveURL('https://atid.store/product/atid-yellow-shoes/');
  console.log('Successfully navigated to the "ATID Yellow Shoes" product detail page.');

  // Step 7: Add the product to the cart by clicking on the 'Add to Cart' button
  try {
    const addToCartButton = page.locator('button.single_add_to_cart_button');
    await expect(addToCartButton).toBeVisible({ timeout: 5000 }); // Ensure the button is visible
    await addToCartButton.click();
    console.log('Clicked on the "Add to Cart" button.');
  } catch (error) {
    console.error('Error locating or clicking the "Add to Cart" button:', error);
    throw error; // Fail the test if this step fails
  }

  // Step 8: Verify that the cart updates and displays the added product
  try {
    const cartItemCount = page.locator('.cart-contents .count');
    await expect(cartItemCount).toContainText('1', { timeout: 5000 }); // Wait until the cart shows one item
    console.log('Cart successfully updated to show the added product.');
  } catch (error) {
    console.error('Error verifying the cart update:', error);
    throw error; // Fail the test if the cart does not update
  }
});