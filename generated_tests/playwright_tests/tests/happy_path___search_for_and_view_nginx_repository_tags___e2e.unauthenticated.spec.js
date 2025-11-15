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

const BASE_URL = process.env.BASE_URL || 'https://hub.docker.com';

test('Happy Path - Search for and View Nginx Repository Tags - E2E Workflow', async ({ page }) => {
  try {
    // Step 1: Navigate to the Docker Hub homepage
    await page.goto(BASE_URL + '/');
    await expect(page).toHaveURL(new RegExp(`^${BASE_URL}/?$`));

    // Step 2: Enter 'nginx' into the main search field
    // Captured selectors:
    //   1. input[placeholder='Search Docker Hub'] (confidence: 90%, strategy: attribute, unique: true)
    //   2. input[type='search'] (confidence: 80%, strategy: attribute, unique: true)
    await page.locator("input[placeholder='Search Docker Hub']").fill('nginx');

    // Step 3: Submit the search by clicking the search button
    // Captured selectors:
    //   1. button[type='submit'] (confidence: 88%, strategy: attribute, unique: true)
    //   2. button:has-text('Search') (confidence: 85%, strategy: text, unique: true)
    await page.locator("button[type='submit']").click();
    await page.waitForURL('**/search?q=nginx');
    await expect(page).toHaveURL(/.*search\?q=nginx/);

    // Step 4: Click on the official 'nginx' repository link
    // Captured selectors:
    //   1. a[href='/_/nginx'] (confidence: 95%, strategy: attribute, unique: true)
    //   2. div:has(span:text('Docker Official Image')) >> a:has-text('nginx') (confidence: 90%, strategy: css, unique: true)
    await page.locator("a[href='/_/nginx']").click();
    await page.waitForURL('**/_/nginx');
    await expect(page).toHaveURL(/.*\/_\/nginx/);

    // Step 5: Navigate to the 'Tags' tab on the repository page
    // Captured selectors:
    //   1. a[href$='/tags'] (confidence: 92%, strategy: attribute, unique: true)
    //   2. [role='tab']:has-text('Tags') (confidence: 88%, strategy: role, unique: true)
    await page.locator("a[href$='/tags']").click();
    await page.waitForURL('**/_/nginx/tags');
    await expect(page).toHaveURL(/.*\/_\/nginx\/tags/);

    // Step 6: Verify that a list of image tags is displayed
    // Captured selectors:
    //   1. div[data-testid='tag-row'] (confidence: 90%, strategy: attribute, unique: false)
    //   2. div:has(a:text('latest')) (confidence: 85%, strategy: css, unique: true)
    await expect(page.locator("div[data-testid='tag-row']").first()).toBeVisible({ timeout: 10000 });

  } catch (error) {
    console.error('Test failed with error:', error);
    throw error;
  }
});