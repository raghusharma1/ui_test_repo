from .base_page import BasePage
from utils.locators import resource_id, text_exact, xpath


class LoginPage(BasePage):
    _USERNAME_INPUT = resource_id("login_username_input")
    _PASSWORD_INPUT = resource_id("login_password_input")
    _LOGIN_BUTTON = resource_id("login_submit_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._LOGIN_BUTTON, timeout)

    def clear_username(self):
        self.clear_text(self._USERNAME_INPUT)
        return self

    def enter_username(self, username):
        self.type_text(self._USERNAME_INPUT, username)
        return self

    def enter_password(self, password):
        self.type_text(self._PASSWORD_INPUT, password)
        return self

    def tap_login_button(self):
        self.tap(self._LOGIN_BUTTON)
        return self
