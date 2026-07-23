from .base_page import BasePage
from utils.locators import resource_id, text_exact, text_contains, xpath


class CardSelectorPage(BasePage):
    _CARD_SELECTOR_RECYCLER = resource_id("card_selector_recycler")
    _CARD_ITEM_CONTAINER = resource_id("card_selector_card_item_container") # This is for the first card item

    def is_loaded(self, timeout=10):
        return self.is_visible(self._CARD_SELECTOR_RECYCLER, timeout)

    def count_card_items(self):
        container = self.wait_for_element(self._CARD_SELECTOR_RECYCLER)
        # Count specific card item elements within the container
        return len(container.find_elements(*self._CARD_ITEM_CONTAINER))

    def tap_first_card_item(self):
        self.tap(self._CARD_ITEM_CONTAINER)
        return self
