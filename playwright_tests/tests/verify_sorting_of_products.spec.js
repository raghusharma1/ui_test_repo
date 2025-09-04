import { test, expect } from '@playwright/test';

test('Verify Sorting of Products', async ({ page }) => {
  // Step 1: Navigate to the Men's category page using the main navigation menu
  await page.goto('https://atid.store');
  const mensCategoryLink = page.locator("//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]");
  await expect(mensCategoryLink).toBeVisible(); // Verify the link is visible
  await mensCategoryLink.click();
  await page.waitForURL('https://atid.store/product-category/men/'); // Ensure the page has fully loaded
  
  // Step 2: Locate the sorting dropdown menu
  const sortingDropdown = page.locator('select[aria-label="Shop order"]');
  await expect(sortingDropdown).toBeVisible(); // Verify the dropdown is visible

  // Step 3: Select 'Sort by price: low to high' from the dropdown
  await sortingDropdown.selectOption({ label: 'Sort by price: low to high' });
  await page.waitForTimeout(1000); // Give time for the sorting operation to reflect

  // Step 4: Verify that the product list updates accordingly
  // Assuming there are product prices visible, we verify they are sorted correctly
  const productPrices = await page.locator('.price').allTextContents();
  const numericPricesLowToHigh = productPrices.map(price => parseFloat(price.replace(/[$,]/g, '')));
  const isSortedLowToHigh = numericPricesLowToHigh.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
  expect(isSortedLowToHigh).toBeTruthy(); // Assert prices are sorted low to high

  // Step 5: Select 'Sort by price: high to low' from the dropdown
  await sortingDropdown.selectOption({ label: 'Sort by price: high to low' });
  await page.waitForTimeout(1000); // Give time for the sorting operation to reflect

  // Step 6: Verify that the product list updates accordingly
  const productPricesHighToLow = await page.locator('.price').allTextContents();
  const numericPricesHighToLow = productPricesHighToLow.map(price => parseFloat(price.replace(/[$,]/g, '')));
  const isSortedHighToLow = numericPricesHighToLow.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
  expect(isSortedHighToLow).toBeTruthy(); // Assert prices are sorted high to low
});