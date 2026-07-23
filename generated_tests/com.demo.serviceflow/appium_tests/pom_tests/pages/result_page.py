from .base_page import BasePage
from utils.locators import resource_id, text_exact, text_contains, accessibility_id, xpath


class ResultPage(BasePage):
    _TITLE_TEXT = resource_id("result_title_text")
    _MESSAGE_TEXT = resource_id("result_message_text")
    _RETRY_BUTTON = resource_id("result_retry_button")
    _ICON_IMAGE = resource_id("result_icon_image")
    _BACK_HOME_BUTTON = resource_id("result_back_home_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._TITLE_TEXT, timeout)

    def get_result_title(self):
        return self.get_text(self._TITLE_TEXT)

    def get_result_message(self):
        return self.get_text(self._MESSAGE_TEXT)

    def is_retry_button_visible(self, timeout=5):
        return self.is_visible(self._RETRY_BUTTON, timeout)

    def get_icon_content_description(self):
        return self.wait_for_element(self._ICON_IMAGE).get_attribute("content-desc")

    def tap_back_to_home_button(self):
        self.tap(self._BACK_HOME_BUTTON)
        return self
