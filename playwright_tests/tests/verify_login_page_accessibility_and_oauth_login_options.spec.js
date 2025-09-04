import { test, expect } from '@playwright/test';

test('Verify Login Page Accessibility and OAuth Login Options', async ({ page }) => {
  // Step 1: Navigate to the login page
  const loginPageURL = 'https://dev.roost.ai/login';
  await page.goto(loginPageURL);

  // Step 2: Verify the page loaded correctly
  await expect(page).toHaveURL(loginPageURL);

  // Step 3: Verify the presence of the main brand logo link
  const brandLogo = page.locator("//a[@href='/' and contains(@class, 'brand-logo-container')]");
  await expect(brandLogo).toBeVisible();
  console.log('Verified main brand logo is visible.');

  // Step 4: Define OAuth login button selectors and expected redirection URLs
  const oauthProviders = [
    {
      name: 'Google',
      selector: "//a[@href='https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&response_type=token&client_id=985988082020-h5fipp07abkqn9qer08dtc6ve33dan9i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'google')]",
      expectedURL: 'https://accounts.google.com/',
    },
    {
      name: 'GitHub',
      selector: "//a[@href='https://github.com/login/oauth/authorize?scope=user%3Aemail&client_id=0fc11ea1f52d5e2a8dcf&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'git')]",
      expectedURL: 'https://github.com/login',
    },
    {
      name: 'Azure',
      selector: "//a[@href='https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&scope=user.read&state=azure&client_id=946156a9-5142-4469-b79f-bdcc9e76cf7f&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'azure')]",
      expectedURL: 'https://login.microsoftonline.com/',
    },
    {
      name: 'Okta',
      selector: "//a[@href='https://dev-53854943.okta.com/oauth2/default/v1/authorize?response_type=code&scope=openid%20profile%20email%20address&state=okta&client_id=0oa3x8katznHWlHeD5d7&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'okta')]",
      expectedURL: 'https://dev-53854943.okta.com/',
    },
    {
      name: 'Auth0',
      selector: "//a[@href='https://dev-mhrflm8cktpvkqq5.us.auth0.com/authorize?response_type=code&scope=openid%20profile%20email&state=auth0&client_id=1IoDt4wUDOKHcpnYKCaNVhG4XWl3jJHR&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'auth0')]",
      expectedURL: 'https://dev-mhrflm8cktpvkqq5.us.auth0.com/',
    },
    {
      name: 'PingFederate',
      selector: "//a[@href='https://ping.tryroost.link/as/authorization.oauth2?response_type=code&scope=openid%20profile%20email&state=pingFederate&client_id=roost-dev&redirect_uri=https%3A%2F%2Fdev.roost.ai%2Flogin' and contains(@class, 'pingFederate')]",
      expectedURL: 'https://ping.tryroost.link/',
    },
  ];

  // Step 5: Iterate through each OAuth login option, click, verify redirection, and return to login page
  for (const provider of oauthProviders) {
    const oauthButton = page.locator(provider.selector);
    await expect(oauthButton).toBeVisible();
    await expect(oauthButton).toBeEnabled();
    console.log(`Verified ${provider.name} login button is visible and enabled.`);

    // Click on the button and verify redirection
    await oauthButton.click();
    await page.waitForURL((url) => url.startsWith(provider.expectedURL), { timeout: 10000 });
    console.log(`Redirected to ${provider.name} authentication page successfully.`);

    // Return to the login page
    await page.goto(loginPageURL);
    await expect(page).toHaveURL(loginPageURL);
    console.log(`Returned to the login page after testing ${provider.name} OAuth login.`);
  }

  // Final Step: Confirm all OAuth buttons have been tested and are functional
  console.log('All OAuth login options are verified and functional.');
});