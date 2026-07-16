from .base_page import BasePage
from utils.locators import resource_id


class MenuPage(BasePage):
    _INCREASE_LIMIT_BUTTON = resource_id("menu_action_increase_limit_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._INCREASE_LIMIT_BUTTON, timeout)

    def tap_increase_limit_button(self):
        self.tap(self._INCREASE_LIMIT_BUTTON)
        return self
