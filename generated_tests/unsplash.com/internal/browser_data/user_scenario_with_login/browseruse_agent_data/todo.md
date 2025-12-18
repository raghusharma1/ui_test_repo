# Scenario Execution TODO - Unsplash Wallpapers while logged in

Feature: Open a wallpaper from the Wallpapers tab while logged in

Background:
- [ ] Given the Unsplash website is open at the homepage with the top header and left sidebar visible
  - Classification: [UI_FLOW_CHANGE]
  - Validation: URL is https://unsplash.com/ (or its homepage), header and left sidebar visible
  - Guardrails: Retry navigation up to 2 times; if fails, mark edge invalid in nav_graph and RESTART from homepage
- [ ] And the top header search field labeled "Search photos and illustrations" and the category navigation bar beneath it are visible
  - Classification: [UI_FLOW_CHANGE] (asserting visibility of major UI sections)
  - Validation: Top header search field visible; category navigation bar under it visible
  - Guardrails: If not visible, wait, retry checks; if page failed to load, restart scenario

Scenario: Confirm logged-in state, navigate to Wallpapers, and open a wallpaper
- [ ] When the user views the homepage header and left sidebar
  - Classification: [UI_FLOW_CHANGE] (verification of loaded UI)
  - Validation: Header and left sidebar present
  - Guardrails: If not present, restart after marking path invalid
- [ ] Then the left sidebar profile avatar button at the bottom is visible
  - Classification: [UI_FLOW_CHANGE] (assert logged-in UI element)
  - Validation: Avatar button at bottom of left sidebar visible
  - Guardrails: Retry visibility check; if not found, restart
- [ ] And the top header action button "Submit an image" on the right side is visible
  - Classification: [UI_FLOW_CHANGE]
  - Validation: "Submit an image" button visible in top header right
  - Guardrails: Retry visibility check; if not found, restart

- [ ] When the user clicks the "Wallpapers" tab in the top navigation category bar directly under the top header search field
  - Classification: [UI_FLOW_CHANGE]
  - Validation: Identify "Wallpapers" tab; capture_stable_selector(index=TabIndex, action="click") then click
  - Guardrails: Retry click up to 2 times with waits; if fails, mark edge invalid and RESTART
- [ ] Then the Wallpapers page loads with the main heading "Wallpapers" visible in the primary content area
  - Classification: [UI_FLOW_CHANGE]
  - Validation: Main heading "Wallpapers" visible
  - Guardrails: Wait for SPA; if not visible after retries, restart
- [ ] And the "Wallpapers" tab in the top navigation category bar is highlighted as selected
  - Classification: [UI_FLOW_CHANGE]
  - Validation: Tab shows selected/active state
  - Guardrails: If mismatch, retry and restart if necessary
- [ ] And the "Submit to Wallpapers" button beneath the "Wallpapers" heading is visible
  - Classification: [UI_FLOW_CHANGE]
  - Validation: Button visible under heading
  - Guardrails: Retry visibility; restart if page failed
- [ ] And the URL contains "/t/wallpapers"
  - Classification: [UI_FLOW_CHANGE]
  - Validation: URL path includes /t/wallpapers
  - Guardrails: If not, restart navigation to tab
- [ ] And the image grid of wallpapers under the "Wallpapers" heading is visible
  - Classification: [UI_FLOW_CHANGE]
  - Validation: Grid visible
  - Guardrails: Wait for content; retry; restart if not loaded

- [ ] When the user clicks the first wallpaper image card within the image grid under the "Wallpapers" heading
  - Classification: [UI_FLOW_CHANGE]
  - Validation: Identify first card; capture_stable_selector(index=CardIndex, action="click") then click
  - Guardrails: Retry click; if fails, mark edge invalid and RESTART
- [ ] Then the selected wallpaper opens successfully
  - Classification: [UI_FLOW_CHANGE]
  - Validation: Navigation to wallpaper detail page, image visible, correct container present
  - Guardrails: If failure, restart from homepage

Notes:
- No form inputs in this scenario; atomic input rules acknowledged, but not applicable here.
- No file uploads in this scenario.
- After UI flow changes (navigation/clicks), allow time for SPA rendering and check visible messages or state changes.

