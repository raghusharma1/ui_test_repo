import 'dotenv/config';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Define environment variables
const BASE_URL = process.env.BASE_URL || 'https://hub.docker.com/';

// Capture accessibility tree on failure for intelligent iteration
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      // Wait for any animations/modals to fully render
      await page.waitForTimeout(1000);
      
      const accessibilityTree = await page.accessibility.snapshot();
      
      const domSnapshot = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*'))
          .filter(el => {
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

test('Verify Successful Homepage Load and Core UI Elements - Smoke Test', async ({ page }) => {
  try {
    // Step 1: Navigate to the Docker Hub homepage
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Verification for Step 1: Confirm URL and page title
    await expect(page).toHaveURL(BASE_URL);
    await expect(page).toHaveTitle(/Docker Hub/);

    // Step 2: Verify presence of essential homepage elements
    // Since no selectors were provided, using robust, role-based selectors.
    
    // Verify the main search input field is visible
    const searchInput = page.getByPlaceholder('Search Docker Hub');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Verify the 'Sign In' button is visible
    const signInButton = page.getByRole('link', { name: 'Sign In' });
    await expect(signInButton).toBeVisible();

    // Verify the Docker logo is present in the header
    const dockerLogo = page.getByLabel('Docker Hub');
    await expect(dockerLogo).toBeVisible();

  } catch (error) {
    console.error('Test failed:', error);
    // Re-throw the error to ensure the test is marked as failed
    throw error;
  }
});