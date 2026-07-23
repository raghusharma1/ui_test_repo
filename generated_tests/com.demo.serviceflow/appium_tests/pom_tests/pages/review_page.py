from .base_page import BasePage
from utils.locators import resource_id, text_exact, text_contains, xpath


class ReviewPage(BasePage):
    _SELECTED_CARD_VALUE_TEXT = resource_id("review_selected_card_value_text")
    _REQUESTED_LIMIT_VALUE_TEXT = resource_id("review_requested_limit_value_text")
    _AGREEMENT_STATUS_TEXT = resource_id("review_agreement_status_text")
    _SUBMIT_BUTTON = resource_id("review_submit_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._SUBMIT_BUTTON, timeout)

    def get_selected_card_value(self):
        return self.get_text(self._SELECTED_CARD_VALUE_TEXT)

    def get_requested_limit_value(self):
        return self.get_text(self._REQUESTED_LIMIT_VALUE_TEXT)

    def get_agreement_status(self):
        return self.get_text(self._AGREEMENT_STATUS_TEXT)

    def tap_submit_button(self):
        self.tap(self._SUBMIT_BUTTON)
        return self
