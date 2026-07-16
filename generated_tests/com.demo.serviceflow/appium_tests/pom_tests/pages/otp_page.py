from .base_page import BasePage
from utils.locators import resource_id


class OtpPage(BasePage):
    _OTP_DIGIT_1_INPUT = resource_id("otp_digit_1_input")
    _OTP_DIGIT_2_INPUT = resource_id("otp_digit_2_input")
    _OTP_DIGIT_3_INPUT = resource_id("otp_digit_3_input")
    _OTP_DIGIT_4_INPUT = resource_id("otp_digit_4_input")
    _OTP_DIGIT_5_INPUT = resource_id("otp_digit_5_input")
    _OTP_DIGIT_6_INPUT = resource_id("otp_digit_6_input")
    _VERIFY_BUTTON = resource_id("otp_verify_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._OTP_DIGIT_1_INPUT, timeout)

    def enter_otp(self, otp_code):
        if len(otp_code) != 6:
            raise ValueError("OTP code must be 6 digits long.")
        self.type_text(self._OTP_DIGIT_1_INPUT, otp_code[0])
        self.type_text(self._OTP_DIGIT_2_INPUT, otp_code[1])
        self.type_text(self._OTP_DIGIT_3_INPUT, otp_code[2])
        self.type_text(self._OTP_DIGIT_4_INPUT, otp_code[3])
        self.type_text(self._OTP_DIGIT_5_INPUT, otp_code[4])
        self.type_text(self._OTP_DIGIT_6_INPUT, otp_code[5])
        return self

    def tap_verify_button(self):
        self.tap(self._VERIFY_BUTTON)
        return self
