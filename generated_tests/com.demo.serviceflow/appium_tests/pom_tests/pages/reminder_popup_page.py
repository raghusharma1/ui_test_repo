from .base_page import BasePage
from utils.locators import resource_id, text_exact, xpath


class ReminderPopupPage(BasePage):
    _LATER_BUTTON = resource_id("popup_reminder_later_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._LATER_BUTTON, timeout)

    def tap_later_button(self):
        self.tap(self._LATER_BUTTON)
        return self

    def tap_reminder_later_button_if_visible(self, timeout=10):
        """Taps the 'LATER' button if it's visible."""
        return self.tap_if_visible(self._LATER_BUTTON, timeout)
