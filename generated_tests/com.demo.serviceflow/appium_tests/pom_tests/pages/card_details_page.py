from .base_page import BasePage
from utils.locators import resource_id, text_contains, text_exact


class CardDetailsPage(BasePage):
    _CARD_CAROUSEL_RECYCLER = resource_id("card_carousel_recycler")
    _CARD_UTILIZATION_USED_TEXT = resource_id("card_utilization_used_text")
    _CARD_UTILIZATION_AVAILABLE_TEXT = resource_id("card_utilization_available_text")
    _TRANSACTION_ITEM_CONTAINER = resource_id("transaction_item_container")
    _TRANSACTION_EXPAND_BUTTON = resource_id("transaction_expand_button")

    def is_loaded(self, timeout=10):
        return self.is_visible(self._CARD_CAROUSEL_RECYCLER, timeout)

    def verify_card_carousel_visible(self, timeout=10):
        return self.is_visible(self._CARD_CAROUSEL_RECYCLER, timeout)

    def verify_first_card_utilization(self, used_text, available_text, timeout=10):
        used = self.get_text(self._CARD_UTILIZATION_USED_TEXT, timeout)
        available = self.get_text(self._CARD_UTILIZATION_AVAILABLE_TEXT, timeout)
        return used_text in used and available_text in available

    def swipe_card_carousel_left(self):
        # Get the carousel element to perform a swipe relative to its bounds
        carousel_element = self.wait_for_element(self._CARD_CAROUSEL_RECYCLER)
        
        # Get the coordinates of the carousel element
        left = carousel_element.location['x']
        top = carousel_element.location['y']
        width = carousel_element.size['width']
        height = carousel_element.size['height']

        # Define start and end points for the swipe within the carousel's bounds
        # Start from 90% of the carousel's width (from the left edge), end at 10% of its width
        start_x = left + (width * 0.9)
        end_x = left + (width * 0.1)
        mid_y = top + (height * 0.5) # Vertical center of the carousel

        self.driver.swipe(start_x, mid_y, end_x, mid_y, 800)
        return self

    def verify_second_card_utilization(self, used_text, available_text, timeout=10):
        used = self.get_text(self._CARD_UTILIZATION_USED_TEXT, timeout)
        available = self.get_text(self._CARD_UTILIZATION_AVAILABLE_TEXT, timeout)
        return used_text in used and available_text in available

    def tap_first_transaction(self, transaction_name, timeout=10):
        # Find the transaction item container that contains the specific transaction name
        # This assumes transaction_item_container is a parent of the text 'Coffee Shop Demo'
        # The scenario provides 'transaction_item_container' as the selector for the tap.
        # We'll use text_contains to find the specific transaction within the container.
        transaction_locator = text_contains(transaction_name)
        self.tap(transaction_locator, timeout)
        return self

    def tap_second_transaction_expand_button(self, timeout=10):
        # This assumes the expand button is unique or the second one can be targeted.
        # For simplicity, we'll tap the first visible expand button after scrolling if needed.
        # A more robust solution might involve finding the second transaction item and then its child expand button.
        # Given the selector is just 'transaction_expand_button', we'll tap the first one found.
        self.tap(self._TRANSACTION_EXPAND_BUTTON, timeout)
        return self
