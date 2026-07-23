from .base_page import BasePage
from utils.locators import resource_id, text_exact, text_contains, xpath


class LimitEntryPage(BasePage):
    _REQUESTED_LIMIT_INPUT = resource_id("limit_entry_value_input")
    _SELECTED_CARD_TEXT = resource_id("limit_entry_selected_card_text")
    _CURRENT_LIMIT_TEXT = resource_id("limit_entry_current_limit_text")
    _AVAILABLE_LIMIT_TEXT = resource_id("limit_entry_available_limit_text")
    _CONTINUE_BUTTON = resource_id("limit_entry_continue_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._REQUESTED_LIMIT_INPUT, timeout)

    def enter_requested_limit(self, limit):
        self.type_text(self._REQUESTED_LIMIT_INPUT, limit)
        return self

    def get_selected_card_text(self):
        return self.get_text(self._SELECTED_CARD_TEXT)

    def get_current_limit_text(self):
        return self.get_text(self._CURRENT_LIMIT_TEXT)

    def get_available_limit_text(self):
        return self.get_text(self._AVAILABLE_LIMIT_TEXT)

    def tap_continue_button(self):
        self.tap(self._CONTINUE_BUTTON)
        return self
