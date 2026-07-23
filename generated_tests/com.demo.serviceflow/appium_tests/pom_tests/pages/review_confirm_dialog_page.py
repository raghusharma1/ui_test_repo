from .base_page import BasePage
from utils.locators import resource_id, text_exact, xpath


class ReviewConfirmDialogPage(BasePage):
    _CONFIRM_SUBMIT_BUTTON = resource_id("review_confirm_submit_button")
    _CONFIRM_DIALOG = resource_id("review_confirm_dialog") # Assuming this is the container for the dialog

    def is_loaded(self, timeout=10):
        return self.is_visible(self._CONFIRM_DIALOG, timeout)

    def tap_confirm_submit_button(self):
        self.tap(self._CONFIRM_SUBMIT_BUTTON)
        return self
