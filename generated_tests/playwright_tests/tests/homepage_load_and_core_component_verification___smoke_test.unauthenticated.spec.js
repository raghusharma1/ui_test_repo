import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(1000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      // UNIVERSAL SOLUTION: Capture complete DOM snapshot (like Chrome DevTools)
      // AI analyzes actual DOM instead of relying on pattern matching
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
              classes: el.className || null,  // EXACT full class string
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
      // Remove .spec.js and optional .authenticated/.unauthenticated prefixes
      const fileName = path.basename(testInfo.file)
        .replace('.authenticated.spec.js', '')
        .replace('.unauthenticated.spec.js', '')
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

const BASE_URL = process.env.BASE_URL || 'https://atid.store'; // NO trailing slash

test('Homepage Load and Core Component Verification - Smoke Test', async ({ page }) => {
  try {
    // Step 1: Navigate to the ATID Store homepage
    // This step ensures the site is online and the initial page loads successfully.
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });

    // Verification for Step 1: Check URL and page title
    // Using a regex for the URL to gracefully handle an optional trailing slash.
    await expect(page).toHaveURL(new RegExp(`^${BASE_URL}/?$`));
    await expect(page).toHaveTitle(/ATID Store/);

    // Step 2: Verify the presence of the main header and navigation
    // This confirms that the core structural elements of the page have rendered correctly.
    // The selector '#masthead' is used as it's a stable ID for the site's header container.
    const header = page.locator('#masthead');
    await expect(header).toBeVisible({ timeout: 10000 });

    // Verify the site logo is visible within the header.
    const logo = header.locator('.site-branding img');
    await expect(logo).toBeVisible();

    // Verify that the primary navigation menu has loaded at least three links.
    // This is crucial for user navigation and confirms the menu component is functional.
    const navLinks = header.locator('#ast-hf-menu-1 > li');
    const navLinkCount = await navLinks.count();
    expect(navLinkCount).toBeGreaterThanOrEqual(3);

  } catch (error) {
    console.error('An error occurred during the homepage smoke test:', error);
    // Re-throw the error to ensure the test is marked as failed.
    throw error;
  }
});