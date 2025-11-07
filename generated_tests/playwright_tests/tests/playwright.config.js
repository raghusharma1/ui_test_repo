
// @ts-check
import { defineConfig, devices } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

/**
 * @see https://playwright.dev/docs/test-configuration
 * 
 * This configuration automatically reuses authentication session:
 * 1. login_analysis_happy_path.spec.js saves session to .auth/storage-state.json
 * 2. All other tests automatically load this session (no login needed!)
 * 3. Login tests always run with fresh browser
 */

// Check if storage state file exists
const storageStatePath = path.join(__dirname, '.auth/storage-state.json');
const storageStateExists = fs.existsSync(storageStatePath);

module.exports = defineConfig({
  testDir: "./.",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  
  use: {
    trace: "on-first-retry",
    launchOptions: {
      args: [
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage",
        "--no-sandbox",
      ],
    },
    // Do NOT set storageState here globally
    // Each project will specify its own storage state needs
  },

  projects: [
    // ==========================================
    // LOGIN TEST - Always runs with fresh browser
    // ==========================================
    {
      name: 'login-test',
      testMatch: /login.*\.spec\.js/,
      use: { 
        ...devices["Desktop Chrome"],
        // No storageState - fresh browser for login
      },
    },
    
    // ==========================================
    // AUTHENTICATED TESTS - Need login (use storage state)
    // ==========================================
    {
      name: 'chromium-authenticated',
      testMatch: /.*\.authenticated\.spec\.js/,
      use: { 
        ...devices["Desktop Chrome"],
        // Only set storage state if file exists
        ...(storageStateExists ? { storageState: storageStatePath } : {})
      },
    },
    
    // ==========================================
    // UNAUTHENTICATED TESTS - Public pages (no login)
    // ==========================================
    {
      name: 'chromium-unauthenticated',
      testMatch: /.*\.unauthenticated\.spec\.js/,
      use: { 
        ...devices["Desktop Chrome"],
        // No storageState - fresh browser for public pages
      },
    },
    
    // // ==========================================
    // // FIREFOX BROWSER
    // // ==========================================
    // {
    //   name: 'firefox-authenticated',
    //   testMatch: /.*\.authenticated\.spec\.js/,
    //   use: { 
    //     ...devices["Desktop Firefox"],
    //     storageState: '.auth/storage-state.json',
    //   },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'firefox-unauthenticated',
    //   testMatch: /.*\.unauthenticated\.spec\.js/,
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: 'firefox-login-tests',
    //   testMatch: /login.*\.spec\.js/,
    //   use: { ...devices["Desktop Firefox"] },
    // },
    
    // // ==========================================
    // // WEBKIT (Safari) BROWSER
    // // ==========================================
    // {
    //   name: 'webkit-authenticated',
    //   testMatch: /.*\.authenticated\.spec\.js/,
    //   use: { 
    //     ...devices["Desktop Safari"],
    //     storageState: '.auth/storage-state.json',
    //   },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'webkit-unauthenticated',
    //   testMatch: /.*\.unauthenticated\.spec\.js/,
    //   use: { ...devices["Desktop Safari"] },
    // },
    // {
    //   name: 'webkit-login-tests',
    //   testMatch: /login.*\.spec\.js/,
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
});
