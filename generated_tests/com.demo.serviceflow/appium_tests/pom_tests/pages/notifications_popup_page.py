from .base_page import BasePage
from utils.locators import resource_id, text_exact, xpath


class NotificationsPopupPage(BasePage):
    _NOT_NOW_BUTTON = resource_id("popup_notifications_not_now_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._NOT_NOW_BUTTON, timeout)

    def tap_not_now_button(self):
        self.tap(self._NOT_NOW_BUTTON)
        return self
