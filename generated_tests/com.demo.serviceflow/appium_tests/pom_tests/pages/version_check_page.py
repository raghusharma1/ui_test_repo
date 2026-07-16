from .base_page import BasePage
from utils.locators import resource_id, text_exact


class VersionCheckPage(BasePage):
    _NEXT_TIME_BUTTON = resource_id("version_check_next_time_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._NEXT_TIME_BUTTON, timeout)

    def tap_next_time_button(self):
        self.tap(self._NEXT_TIME_BUTTON)
        return self
