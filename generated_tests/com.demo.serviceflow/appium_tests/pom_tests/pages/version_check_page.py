from .base_page import BasePage
from utils.locators import resource_id, text_exact, xpath


class VersionCheckPage(BasePage):
    _NEXT_TIME_BUTTON = resource_id("version_check_next_time_button")
    _UPDATE_NOW_BUTTON = resource_id("com.demo.serviceflow:id/version_check_update_now_button") # Added this locator

    def is_loaded(self, timeout=10):
        # The scenario says to wait for NEXT TIME button, so we'll use that.
        # However, either button indicates the version check screen is loaded.
        return self.is_visible(self._NEXT_TIME_BUTTON, timeout) or self.is_visible(self._UPDATE_NOW_BUTTON, timeout)

    def tap_next_time_button(self):
        self.tap(self._NEXT_TIME_BUTTON)
        return self

    def tap_next_time_button_if_visible(self, timeout=10):
        """Taps the 'NEXT TIME' button if it's visible."""
        return self.tap_if_visible(self._NEXT_TIME_BUTTON, timeout)

    def tap_update_now_button_if_visible(self, timeout=10):
        """Taps the 'UPDATE NOW' button if it's visible."""
        return self.tap_if_visible(self._UPDATE_NOW_BUTTON, timeout)
