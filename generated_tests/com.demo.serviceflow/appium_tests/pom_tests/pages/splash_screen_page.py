from .base_page import BasePage
from utils.locators import resource_id, text_exact


class SplashScreenPage(BasePage):
    _SPLASH_TITLE_TEXT = text_exact("Welcome to Demo ServiceFlow")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._SPLASH_TITLE_TEXT, timeout)
