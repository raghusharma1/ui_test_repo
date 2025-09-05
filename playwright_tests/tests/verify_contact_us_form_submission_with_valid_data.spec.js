import { test, expect } from '@playwright/test';

test('Verify Contact Us Form Submission with Valid Data', async ({ page }) => {
  // Step 1: Navigate to the Contact Us page
  const contactUsPageUrl = 'https://atid.store/contact-us/';
  await page.goto(contactUsPageUrl);

  // Verify the page has loaded correctly
  await expect(page).toHaveURL(contactUsPageUrl);
  console.log('Navigated to the Contact Us page.');

  // Step 2: Fill out the Name field
  const nameSelector = '#wpforms-15-field_0';
  await page.locator(nameSelector).fill('John Doe');
  console.log('Filled the Name field with "John Doe".');

  // Step 3: Fill out the Email field
  const emailSelector = '#wpforms-15-field_4';
  await page.locator(emailSelector).fill('john.doe@example.com');
  console.log('Filled the Email field with "john.doe@example.com".');

  // Step 4: Fill out the Comment or Message field
  const messageSelector = '#wpforms-15-field_2';
  await page.locator(messageSelector).fill('I would like to inquire about bulk orders.');
  console.log('Filled the Comment or Message field with a valid message.');

  // Step 5: Click the SEND MESSAGE button
  const sendMessageButtonSelector = '#wpforms-submit-15';
  await page.locator(sendMessageButtonSelector).click();
  console.log('Clicked the SEND MESSAGE button.');

  // Step 6: Verify the success message
  try {
    // Wait for the success message to appear
    const successMessageLocator = page.locator('text=Thanks for contacting us! We will be in touch with you shortly.');
    await expect(successMessageLocator).toBeVisible();
    console.log('Success message is displayed, indicating the form submission was successful.');
  } catch (error) {
    console.error('Error: Success message was not displayed. Check if the form submission was processed correctly.', error);
    throw error;
  }

  // Optional: Verify API interactions (e.g., server response)
  // Uncomment and customize the following lines if API monitoring is required
  /*
  page.on('requestfinished', async (request) => {
    if (request.url().includes('wpforms/submit')) {
      const response = await request.response();
      if (response) {
        const status = response.status();
        console.log(`Form submission POST request finished with status: ${status}`);
        expect(status).toBe(200); // Ensure the server responded with HTTP 200
      }
    }
  });
  */

  // Optional: Monitor performance metrics (if required)
  /*
  const performanceMetrics = await page.evaluate(() => performance.timing);
  console.log('Performance metrics:', performanceMetrics);
  */
});