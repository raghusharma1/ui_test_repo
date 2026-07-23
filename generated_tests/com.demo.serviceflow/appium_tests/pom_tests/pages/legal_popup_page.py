from .base_page import BasePage
from utils.locators import resource_id, text_exact, xpath


class LegalPopupPage(BasePage):
    _ACCEPT_BUTTON = resource_id("popup_legal_accept_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._ACCEPT_BUTTON, timeout)

    def tap_accept_button(self):
        self.tap(self._ACCEPT_BUTTON)
        return self
