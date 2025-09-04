import { test, expect } from '@playwright/test';

test('Verify Accessibility Tools Functionality', async ({ page }) => {
  // Step 1: Navigate to https://atid.store/cart-2/
  const url = 'https://atid.store/cart-2/';
  await page.goto(url);

  // Verify page loaded correctly
  await expect(page).toHaveURL(url);

  // Step 2: Locate the 'Increase Text' button using its stable selector
  const increaseTextButton = page.locator("//a[@href='#' and contains(@class, 'pojo-a11y-toolbar-link') and text()='Increase Text']");

  // Verify the button is visible and enabled
  await expect(increaseTextButton).toBeVisible();
  await expect(increaseTextButton).toBeEnabled();

  // Step 3: Click on the 'Increase Text' button
  await increaseTextButton.click();

  // Step 4: Verify that the text size on the page increases
  // Assuming the text size on the body changes dynamically
  const bodyText = page.locator('body');
  const initialFontSize = await bodyText.evaluate(el => window.getComputedStyle(el).fontSize);

  // Re-click the button to increase text size further
  await increaseTextButton.click();
  const newFontSize = await bodyText.evaluate(el => window.getComputedStyle(el).fontSize);

  // Ensure the font size has increased
  expect(parseFloat(newFontSize)).toBeGreaterThan(parseFloat(initialFontSize));

  // Step 5: Locate the 'High Contrast' button using its stable selector
  const highContrastButton = page.locator("//a[@href='#' and contains(@class, 'pojo-a11y-toolbar-link') and text()='High Contrast']");

  // Verify the button is visible and enabled
  await expect(highContrastButton).toBeVisible();
  await expect(highContrastButton).toBeEnabled();

  // Step 6: Click on the 'High Contrast' button
  await highContrastButton.click();

  // Step 7: Verify that the page background and text colors switch to high-contrast mode
  // Assuming the high contrast mode applies a specific class or style
  const bodyBackgroundColor = await bodyText.evaluate(el => window.getComputedStyle(el).backgroundColor);
  const bodyColor = await bodyText.evaluate(el => window.getComputedStyle(el).color);

  // Expect high contrast colors (example: black background with white text)
  expect(bodyBackgroundColor).toBe('rgb(0, 0, 0)'); // Black background
  expect(bodyColor).toBe('rgb(255, 255, 255)'); // White text

  // Step 8: Check that the buttons remain functional after applying the changes
  // Re-click the 'Increase Text' button to ensure it still works
  const fontSizeBeforeSecondClick = await bodyText.evaluate(el => window.getComputedStyle(el).fontSize);
  await increaseTextButton.click();
  const fontSizeAfterSecondClick = await bodyText.evaluate(el => window.getComputedStyle(el).fontSize);

  // Ensure the font size has increased again
  expect(parseFloat(fontSizeAfterSecondClick)).toBeGreaterThan(parseFloat(fontSizeBeforeSecondClick));

  // Re-click the 'High Contrast' button to toggle the high contrast mode
  await highContrastButton.click();
  const bodyBackgroundColorAfterToggle = await bodyText.evaluate(el => window.getComputedStyle(el).backgroundColor);
  const bodyColorAfterToggle = await bodyText.evaluate(el => window.getComputedStyle(el).color);

  // Verify that high contrast mode has toggled off (example: back to default white background with black text)
  expect(bodyBackgroundColorAfterToggle).not.toBe('rgb(0, 0, 0)'); // No longer black background
  expect(bodyColorAfterToggle).not.toBe('rgb(255, 255, 255)'); // No longer white text

  // Step 9: Verify that the changes persist across page reloads
  // Reload the page
  await page.reload();

  // Verify the URL after reload
  await expect(page).toHaveURL(url);

  // Check if high contrast and increased text are still applied
  const reloadedBodyBackgroundColor = await bodyText.evaluate(el => window.getComputedStyle(el).backgroundColor);
  const reloadedFontSize = await bodyText.evaluate(el => window.getComputedStyle(el).fontSize);

  // Expect the high contrast mode to persist
  expect(reloadedBodyBackgroundColor).toBe('rgb(0, 0, 0)'); // Black background expected
  expect(parseFloat(reloadedFontSize)).toBeGreaterThan(parseFloat(initialFontSize)); // Text size remains increased
});