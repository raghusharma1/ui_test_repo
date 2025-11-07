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

test('Homepage Load and Basic Verification - Sanity Test', async ({ page }) => {
  try {
    // Step 1: Navigate to the ATID Store homepage
    // This step confirms the server is responsive and the site is online.
    await page.goto(BASE_URL, { timeout: 15000 });

    // Wait for the network to be idle, ensuring all initial assets are loaded.
    await page.waitForLoadState('networkidle');

    // Verification 1: Check if the URL is correct.
    // Browsers might add a trailing slash, so we verify against the base URL followed by a slash.
    await expect(page).toHaveURL(BASE_URL + '/');

    // Verification 2: Check if the page title is correct.
    // Using a regex to allow for variations like 'ATID Store' or 'Home' as per the scenario.
    await expect(page).toHaveTitle(/ATID Store|Home/);
    
  } catch (error) {
    // Error Handling: If navigation or initial verification fails, throw a detailed error.
    // This helps diagnose if the site is down or if there's a fundamental loading issue.
    console.error(`Error during homepage load and verification: ${error.message}`);
    throw new Error(`CRITICAL: Homepage at ${BASE_URL} failed to load or basic verification failed. Error: ${error.message}`);
  }
});