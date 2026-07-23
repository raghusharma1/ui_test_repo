from .base_page import BasePage
from utils.locators import resource_id, text_exact, xpath


class ReminderPopupPage(BasePage):
    _LATER_BUTTON = resource_id("popup_reminder_later_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._LATER_BUTTON, timeout)

    def tap_later_button(self):
        self.tap(self._LATER_BUTTON)
        return self
