import { test, expect } from '@playwright/test';

test('Verify Navigation to Contact Us Page', async ({ page }) => {
  // Step 1: Navigate to the main page
  const homePageUrl = 'https://atid.store';
  await page.goto(homePageUrl);

  // Step 2: Locate the 'CONTACT US' navigation link in the main menu using its stable selector and click on it
  const contactUsLinkSelector = "//a[@href='https://atid.store/contact-us/' and contains(@class, 'menu-link')]";
  const contactUsPageUrl = 'https://atid.store/contact-us/';

  // Ensure the link is visible and accessible
  const contactUsLink = page.locator(contactUsLinkSelector);
  await expect(contactUsLink).toBeVisible();
  await expect(contactUsLink).toHaveText('CONTACT US');

  // Click the 'CONTACT US' link
  await contactUsLink.click();

  // Step 3: Verify the browser redirects to the Contact Us page
  await page.waitForURL(contactUsPageUrl);
  await expect(page).toHaveURL(contactUsPageUrl);

  // Step 4: Ensure the page title matches 'Contact Us'
  await expect(page).toHaveTitle('Contact Us');

  // Step 5: Verify the presence of the contact form on the page
  const contactFormSelector = 'form#contact-form'; // Assuming a stable selector for the form
  const contactForm = page.locator(contactFormSelector);
  await expect(contactForm).toBeVisible();

  console.log('Test passed: Navigation to Contact Us page and its accessibility verified successfully.');
});