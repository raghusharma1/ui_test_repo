import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Capture accessibility tree and DOM snapshot on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const accessibilityTree = await page.accessibility.snapshot();
      const domSnapshot = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*'))
          .filter(el => {
            // Only visible elements
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            return rect.width > 0 && rect.height > 0 &&
                   style.display !== 'none' &&
                   style.visibility !== 'hidden' &&
                   parseFloat(style.opacity) > 0.05;
          })
          .map(el => {
            const style = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
              tag: el.tagName.toLowerCase(),
              id: el.id || null,
              classes: el.className || null,
              text: (el.innerText || el.textContent || '').trim().substring(0, 100),
              value: el.value || null,
              role: el.getAttribute('role') || null,
              ariaLabel: el.getAttribute('aria-label') || null,
              type: el.type || null,
              href: el.href || null,
              cursor: style.cursor,
              display: style.display,
              hasOnclick: !!el.onclick || el.hasAttribute('onclick'),
              parent: {
                tag: el.parentElement?.tagName?.toLowerCase(),
                classes: el.parentElement?.className || null
              },
              position: {
                x: Math.round(rect.x),
                y: Math.round(rect.y),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              }
            };
          });
      });
      const fileName = path.basename(testInfo.file)
        .replace('.auth.spec.js', '')
        .replace('.noauth.spec.js', '')
        .replace('.spec.js', '');
      const stateFile = path.join(__dirname, `../.accessibility_state_${fileName}.json`);
      fs.writeFileSync(stateFile, JSON.stringify({
        accessibility_tree: accessibilityTree,
        dom_snapshot: domSnapshot,
        element_count: domSnapshot.length,
        url: page.url()
      }, null, 2));
    } catch (e) {}
  }
});

test.setTimeout(120000);

// This test documents a login failure; the agent did not reach or interact with a login workflow.
test.skip('login_analysis_happy_path - should document incomplete exploration and blank page (login failure)', async ({ page }) => {
  // Critical scenario: No actionable login interactions captured; flow stopped before reaching authentication

  // Step 1: Attempt to navigate to the site login page (as intended by scenario)
  // Using process.env.LOGIN_URL for navigation; fallback to process.env.BASE_URL if undefined
  // Since scenario observed a blank state, navigation is attempted but we expect it NOT to succeed

  await page.goto(process.env.LOGIN_URL || process.env.BASE_URL);

  // No captured selectors, no steps, no interactions

  // Verify that no login form is present, and agent remains on blank page
  // Expect to remain on about:blank or page with no interactive login elements

  // Assertion: The page did not reach the expected login UI; no session established
  // Since detailed_steps are empty, only document the outcome

  // Check if page is blank or shows an empty DOM tree
  const bodyText = await page.evaluate(() => document.body && document.body.innerText ? document.body.innerText.trim() : '');
  const isBlank = bodyText.length === 0;

  expect(isBlank).toBe(true); // Expect a blank or empty page

  // Optionally confirm that URL did NOT change to a successful login page
  const currentUrl = page.url();
  // Unsplash login page is https://unsplash.com/login
  expect(currentUrl === 'about:blank' || currentUrl === '' || currentUrl === (process.env.LOGIN_URL || process.env.BASE_URL)).toBe(true);

  // No authentication or user session should be established, no cookies, no navigation away from blank page

  // The test captures this incomplete state to aid debugging of agent/page failures
  // End of the documented failed flow
});