from .base_page import BasePage
from utils.locators import resource_id, text_exact, text_contains, xpath


class DashboardPage(BasePage):
    _MENU_BUTTON = resource_id("dashboard_menu_button")
    _GREETING_TEXT = resource_id("dashboard_greeting_text")
    _RECENT_LIST = resource_id("dashboard_recent_list")
    _RECENT_LIST_ITEM = resource_id("dashboard_recent_item_card")
    _CARDS_TAB = resource_id("dashboard_tab_cards_view")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._MENU_BUTTON, timeout)

    def tap_menu_button(self):
        self.tap(self._MENU_BUTTON)
        return self

    def get_greeting_text(self):
        return self.get_text(self._GREETING_TEXT)

    def verify_dashboard_greeting(self, expected_greeting, timeout=10):
        actual_greeting = self.get_text(self._GREETING_TEXT, timeout)
        return expected_greeting in actual_greeting

    def count_recent_list_items(self):
        container = self.wait_for_element(self._RECENT_LIST)
        return len(container.find_elements(*self._RECENT_LIST_ITEM))

    def tap_cards_tab(self, timeout=10):
        self.tap(self._CARDS_TAB, timeout)
        return self
