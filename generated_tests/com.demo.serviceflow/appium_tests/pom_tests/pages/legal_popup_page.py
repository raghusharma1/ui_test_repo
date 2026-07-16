from .base_page import BasePage
from utils.locators import resource_id


class LegalPopupPage(BasePage):
    _ACCEPT_BUTTON = resource_id("popup_legal_accept_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._ACCEPT_BUTTON, timeout)

    def tap_accept_button_if_visible(self):
        return self.tap_if_visible(self._ACCEPT_BUTTON)
