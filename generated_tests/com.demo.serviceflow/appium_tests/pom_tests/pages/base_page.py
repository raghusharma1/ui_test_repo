"""Common wait/interaction primitives shared by every page object.

Static scaffold file — all synchronization (WebDriverWait) lives here so page
objects and tests never import wait machinery themselves. Subclasses declare
their locators as class constants (via `utils.locators` helpers) and expose
page-specific actions and `is_loaded()`-style checks on top of these
primitives.
"""
from appium.webdriver.common.appiumby import AppiumBy
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from utils.config import DEFAULT_TIMEOUT


class BasePage:

    def __init__(self, driver):
        self.driver = driver

    # ── Waits ──────────────────────────────────────────────────────────────

    def wait_for_element(self, locator, timeout=DEFAULT_TIMEOUT):
        return WebDriverWait(self.driver, timeout).until(EC.presence_of_element_located(locator))

    def is_visible(self, locator, timeout=DEFAULT_TIMEOUT):
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(locator))
            return True
        except TimeoutException:
            return False

    # ── Actions ────────────────────────────────────────────────────────────

    def tap(self, locator, timeout=DEFAULT_TIMEOUT):
        element = WebDriverWait(self.driver, timeout).until(EC.element_to_be_clickable(locator))
        element.click()

    def tap_if_visible(self, locator, timeout=DEFAULT_TIMEOUT):
        """Taps `locator` if it becomes visible within `timeout`; otherwise does nothing.

        Use this for optional UI - dismissible popups, a version-check screen the
        app may skip on a repeat launch - so the flow doesn't hang or fail waiting
        on something that might legitimately never appear.

        Returns:
            True if the element was found and tapped, False otherwise.
        """
        if self.is_visible(locator, timeout=timeout):
            self.tap(locator, timeout=timeout)
            return True
        return False

    def type_text(self, locator, text, timeout=DEFAULT_TIMEOUT):
        element = self.wait_for_element(locator, timeout=timeout)
        element.clear()
        element.send_keys(text)

    def clear_text(self, locator, timeout=DEFAULT_TIMEOUT):
        self.wait_for_element(locator, timeout=timeout).clear()

    def get_text(self, locator, timeout=DEFAULT_TIMEOUT):
        return self.wait_for_element(locator, timeout=timeout).text

    # ── Scrolling / swiping ────────────────────────────────────────────────

    def scroll_to_text(self, text):
        """Scrolls until an element with the exact text is in view (Android UiScrollable).

        Returns the element once visible.
        """
        escaped = text.replace("\\", "\\\\").replace('"', '\\"')
        return self.driver.find_element(
            AppiumBy.ANDROID_UIAUTOMATOR,
            "new UiScrollable(new UiSelector().scrollable(true))"
            f'.scrollIntoView(new UiSelector().text("{escaped}"))',
        )

    def swipe(self, start_x_pct, start_y_pct, end_x_pct, end_y_pct, duration_ms=800):
        """Swipes between two points given as fractions of the screen size (0.0-1.0)."""
        size = self.driver.get_window_size()
        self.driver.swipe(
            int(size["width"] * start_x_pct),
            int(size["height"] * start_y_pct),
            int(size["width"] * end_x_pct),
            int(size["height"] * end_y_pct),
            duration_ms,
        )
