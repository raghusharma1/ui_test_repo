from .base_page import BasePage
from utils.locators import resource_id


class DashboardPage(BasePage):
    _MENU_BUTTON = resource_id("dashboard_menu_button")
    _GREETING_TEXT = resource_id("dashboard_greeting_text") # For is_loaded verification

    def is_loaded(self, timeout=10):
        return self.is_visible(self._GREETING_TEXT, timeout)

    def tap_menu_button(self):
        self.tap(self._MENU_BUTTON)
        return self
