import { test, expect } from '@playwright/test';

test('Clone Virtual Environment', async ({ page }) => {
  // Step 1: Navigate to the RoostGPT Config page
  await page.goto('https://dev.roost.ai/gptCLIForm');
  await expect(page).toHaveURL('https://dev.roost.ai/gptCLIForm');

  // Step 2: Select an existing virtual environment from the list
  const environmentSelector = page.locator('tr[data-testid="environment-row"]'); // Table rows representing environments
  const environmentCount = await environmentSelector.count();
  expect(environmentCount).toBeGreaterThan(0); // Ensure there is at least one virtual environment

  const firstEnvironment = environmentSelector.first();
  await expect(firstEnvironment).toBeVisible(); // Verify the first environment is visible

  // Step 3: Click the Clone button associated with the selected virtual environment
  const cloneButton = page.locator('[data-testid="clone-environment-button"]');
  await cloneButton.click();

  // Step 4: Provide a unique name for the cloned environment in the pop-up input field
  const nameInput = page.locator('[data-testid="cloned-environment-name"]');
  await expect(nameInput).toBeVisible(); // Ensure the input field is visible
  const uniqueName = `Cloned-Environment-${Date.now()}`; // Generate a unique name
  await nameInput.fill(uniqueName);

  // Step 5: Click the Confirm Clone button to proceed
  const confirmButton = page.locator('button:text("Confirm Clone")');
  await expect(confirmButton).toBeVisible(); // Ensure the Confirm Clone button is visible
  await confirmButton.click();

  // Step 6: Verify that the cloned environment appears in the environment list
  const clonedEnvironmentRow = page.locator(`tr:has-text("${uniqueName}")`);
  await expect(clonedEnvironmentRow).toBeVisible(); // Ensure the cloned environment is visible in the list

  // Step 7: Check if the cloned environment inherits all configurations from the original environment
  // This step assumes configurations are displayed in specific columns or sections
  const originalEnvironmentConfig = await firstEnvironment.locator('.config-column').textContent();
  const clonedEnvironmentConfig = await clonedEnvironmentRow.locator('.config-column').textContent();
  expect(clonedEnvironmentConfig).toEqual(originalEnvironmentConfig); // Ensure configurations match
});