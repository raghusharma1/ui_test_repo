import { test, expect } from '@playwright/test';

test('Configure Test Settings and Save', async ({ page }) => {
  const baseUrl = 'https://dev.roost.ai';

  // Step 1: Navigate to the 'RoostGPT Config' page from the navigation menu.
  await page.goto(baseUrl);
  const roostGPTConfigNav = page.locator("//a[@href='/gptCLIForm' and contains(@class, 'nav-link')]");
  await expect(roostGPTConfigNav).toBeVisible();
  await roostGPTConfigNav.click();
  await page.waitForURL('https://dev.roost.ai/gptCLIForm');
  await expect(page).toHaveURL('https://dev.roost.ai/gptCLIForm');

  // Step 2: Type 'Sample Test' into the test name input field.
  const testNameInput = page.locator('[data-testid="test-name-input"]');
  await expect(testNameInput).toBeVisible();
  await testNameInput.fill('Sample Test');

  // Step 3: Select 'Cloud Git' as the git type by ensuring the 'Cloud Git' radio button is selected.
  const cloudGitRadioButton = page.locator('[data-testid="cloud-git-type-radio-button-selected"]');
  await expect(cloudGitRadioButton).toHaveAttribute('checked', 'true');

  // Step 4: Type a valid OpenAI API token into the OpenAI token input field.
  const openAiTokenInput = page.locator('[data-testid="openai-token"]');
  await expect(openAiTokenInput).toBeVisible();
  await openAiTokenInput.fill('sk-test-1234567890abcdef');

  // Step 5: Click the OpenAI token unmask icon to verify the token entry.
  const unmaskIcon = page.locator('[data-testid="openai-token-unMask-icon"]');
  await expect(unmaskIcon).toBeVisible();
  await unmaskIcon.click();
  await expect(openAiTokenInput).toHaveAttribute('type', 'text'); // Verify unmasked

  // Step 6: Click the 'Save Configuration' button to save the test settings.
  const saveButton = page.locator('button:has-text("Save Configuration")');
  await expect(saveButton).toBeVisible();
  await saveButton.click();

  // Step 7: Verify that a confirmation message is displayed indicating successful save.
  const confirmationMessage = page.locator('text=Configuration saved successfully');
  await expect(confirmationMessage).toBeVisible();
  await expect(confirmationMessage).toContainText('Configuration saved successfully');
});