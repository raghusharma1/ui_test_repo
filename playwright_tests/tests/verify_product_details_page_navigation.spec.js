import { test, expect } from '@playwright/test';

test('Verify Product Details Page Navigation', async ({ page }) => {
  // Step 1: Navigate to the homepage
  const homepageUrl = 'https://atid.store';
  await page.goto(homepageUrl);

  // Verify that the homepage is loaded correctly
  await expect(page).toHaveURL(homepageUrl);

  // Step 2: Find the product titled 'ATID Yellow Shoes'
  const productLinkSelector = "//a[@href='https://atid.store/product/atid-yellow-shoes/' and contains(@class, 'ast-loop-product__link')]";

  // Ensure the product link is visible on the page
  const productLink = page.locator(productLinkSelector);
  await expect(productLink).toBeVisible();

  // Step 3: Click on the product title
  await productLink.click();

  // Step 4: Verify that the page navigates to the product details page
  const productDetailsUrl = 'https://atid.store/product/atid-yellow-shoes/';
  await page.waitForURL(productDetailsUrl);
  await expect(page).toHaveURL(productDetailsUrl);

  // Step 5: Verify that the product details page displays the product's name, price, and description
  const productNameSelector = 'h1.product_title.entry-title';
  const productPriceSelector = 'p.price';
  const productDescriptionSelector = 'div.woocommerce-product-details__short-description';

  // Assert that the product name is displayed
  const productName = page.locator(productNameSelector);
  await expect(productName).toBeVisible();
  await expect(productName).toContainText('ATID Yellow Shoes');

  // Assert that the product price is displayed
  const productPrice = page.locator(productPriceSelector);
  await expect(productPrice).toBeVisible();

  // Assert that the product description is displayed
  const productDescription = page.locator(productDescriptionSelector);
  await expect(productDescription).toBeVisible();

  // Optional: Print success message to console for debugging
  console.log('Product details page verified successfully.');
});