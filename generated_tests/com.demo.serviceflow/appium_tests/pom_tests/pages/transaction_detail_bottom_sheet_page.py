from .base_page import BasePage
from utils.locators import resource_id, text_contains


class TransactionDetailBottomSheetPage(BasePage):
    _TRANSACTION_DETAIL_BOTTOM_SHEET = resource_id("transaction_detail_bottom_sheet")
    _TRANSACTION_DETAIL_CLOSE_BUTTON = resource_id("transaction_detail_close_button")
    _MERCHANT_NAME_TEXT = resource_id("transaction_detail_merchant_name_text") # Assuming this ID exists for verification
    _AMOUNT_TEXT = resource_id("transaction_detail_amount_text") # Assuming this ID exists for verification
    _DATE_TEXT = resource_id("transaction_detail_date_text") # Assuming this ID exists for verification
    _REFERENCE_TEXT = resource_id("transaction_detail_reference_text") # Assuming this ID exists for verification

    def is_loaded(self, timeout=10):
        return self.is_visible(self._TRANSACTION_DETAIL_BOTTOM_SHEET, timeout)

    def verify_transaction_detail_bottom_sheet(self, merchant_name, amount, date, reference, timeout=10):
        # Check if the bottom sheet itself is visible
        if not self.is_visible(self._TRANSACTION_DETAIL_BOTTOM_SHEET, timeout):
            return False

        # Check for the presence of key texts within the bottom sheet
        # Using text_contains for resilience as per instructions
        merchant_visible = self.is_visible(text_contains(merchant_name))
        amount_visible = self.is_visible(text_contains(amount))
        date_visible = self.is_visible(text_contains(date))
        reference_visible = self.is_visible(text_contains(reference))

        return merchant_visible and amount_visible and date_visible and reference_visible

    def close_transaction_detail_bottom_sheet(self, timeout=10):
        self.tap(self._TRANSACTION_DETAIL_CLOSE_BUTTON, timeout)
        return self
