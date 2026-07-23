from .base_page import BasePage
from utils.locators import resource_id, text_exact, xpath


class AgreementPage(BasePage):
    _AGREEMENT_CHECKBOX = resource_id("agreement_checkbox")
    _CONTINUE_BUTTON = resource_id("agreement_continue_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._AGREEMENT_CHECKBOX, timeout)

    def tap_agreement_checkbox(self):
        self.tap(self._AGREEMENT_CHECKBOX)
        return self

    def tap_continue_button(self):
        self.tap(self._CONTINUE_BUTTON)
        return self
