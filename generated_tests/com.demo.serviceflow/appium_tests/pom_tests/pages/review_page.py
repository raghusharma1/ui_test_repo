from .base_page import BasePage
from utils.locators import resource_id


class ReviewPage(BasePage):
    _SUBMIT_BUTTON = resource_id("review_submit_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._SUBMIT_BUTTON, timeout)

    def tap_submit_button(self):
        self.tap(self._SUBMIT_BUTTON)
        return self
