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

const BASE_URL = process.env.BASE_URL || 'https://hub.docker.com/';

test('Search for \'nginx\' Repository and View Tags - E2E Workflow', async ({ page }) => {
  try {
    // Step 1: Navigate to Docker Hub Homepage
    await page.goto(BASE_URL);
    await expect(page).toHaveURL('https://hub.docker.com/');

    // Step 2: Enter 'nginx' into the main search field
    // Captured selectors:
    //   1. input[placeholder='Search'] (confidence: 95%, strategy: attribute, unique: true)
    //   2. [data-testid='header-search'] (confidence: 90%, strategy: attribute, unique: true)
    const searchInput = page.locator("input[placeholder='Search']");
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill('nginx');

    // Step 3: Submit the search by pressing Enter
    // Captured selectors:
    //   1. input[placeholder='Search'] (confidence: 95%, strategy: attribute, unique: true)
    await searchInput.press('Enter');
    await page.waitForURL('**/search?q=nginx');
    await expect(page).toHaveURL(/.*search\?q=nginx/);

    // Step 4: Click on the official 'nginx' repository link
    // Captured selectors:
    //   1. a[href='_nginx'] (confidence: 90%, strategy: attribute, unique: true)
    //   2. div:has-text('Docker Official Image') >> a:has-text('nginx') (confidence: 85%, strategy: css, unique: true)
    await page.locator("a[href='_nginx']").click();
    await page.waitForURL('**/_/nginx');
    await expect(page).toHaveURL(/.*\/_\/nginx/);

    // Step 5: Click on the 'Tags' tab on the repository page
    // Captured selectors:
    //   1. a:has-text('Tags') (confidence: 95%, strategy: text, unique: true)
    //   2. [data-testid='tags-tab'] (confidence: 90%, strategy: attribute, unique: true)
    await page.locator("a:has-text('Tags')").click();
    await page.waitForURL('**/_/nginx/tags');
    await expect(page).toHaveURL(/.*\/_\/nginx\/tags/);

    // Step 6: Verify that a list of image tags is visible
    // Captured selectors:
    //   1. div[data-testid='tagRow'] (confidence: 90%, strategy: attribute, unique: false)
    const firstTagRow = page.locator("div[data-testid='tagRow']").first();
    await expect(firstTagRow).toBeVisible({ timeout: 10000 });

  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});