# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 15
- **Application Base URL**: https://atid.store
- **Generated On**: 2025-09-04 21:30:03

## Scenarios

### 1. Verify Product Browsing in Men's Category
_Ensure the user can browse and navigate through products listed in the Men's category._

**Complexity**: medium | **Priority**: normal | **Risk Level**: medium
**Tags**: accessibility, api-integration, auto-generated, navigation, performance, ui-test
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: medium

**Type**: navigation
**Pages Involved:**
- https://atid.store/product-category/men/

#### Steps:
- Navigate to the Men's category page using the main navigation menu.
- Verify the page title contains 'Men'.
- Scroll through the product listings to view available items.
- Click on the 'ATID Blue Shoes' product link.
- Verify that the product details page for 'ATID Blue Shoes' loads successfully.

#### Selectors Used:
- **Type**: link, **Text**: 'MEN', **Selector**: `//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: link, **Text**: 'ATID Blue Shoes', **Selector**: `//a[@href='https://atid.store/product/atid-blue-shoes/' and contains(@class, 'ast-loop-product__link')]`, **Action**: click

#### Expected Results:
- The Men's category page is successfully loaded.
- The user can view a list of products in the Men's category.
- Navigating to a product details page displays the correct product information.

---

### 2. Verify Filtering Products by Price Range
_Validate that the filtering functionality by price range works as expected on the Men's category page._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, filter, mobile, performance, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: medium

**Type**: filter
**Pages Involved:**
- https://atid.store/product-category/men/

#### Steps:
- Navigate to the Men's category page using the main navigation menu.
- Scroll to the price filter section on the sidebar.
- Enter a minimum price in the 'Min price' field.
- Enter a maximum price in the 'Max price' field.
- Click on the 'FILTER' button.
- Verify that the product list updates to show only products within the specified price range.

#### Selectors Used:
- **Type**: link, **Text**: 'MEN', **Selector**: `//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: label, **Text**: 'Min price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]`, **Action**: type
- **Type**: label, **Text**: 'Max price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]`, **Action**: type
- **Type**: button, **Text**: 'FILTER', **Selector**: `//button[normalize-space()="FILTER"]`, **Action**: click

#### Expected Results:
- The product list updates to match the specified price range.
- Only products within the range are displayed.

---

### 3. Verify Sorting of Products
_Check if products in the Men's category can be sorted by various criteria such as price, popularity, and rating._

**Complexity**: medium | **Priority**: normal | **Risk Level**: medium
**Tags**: accessibility, api-integration, auto-generated, drag-and-drop, performance, sort, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: medium

**Type**: sort
**Pages Involved:**
- https://atid.store/product-category/men/

#### Steps:
- Navigate to the Men's category page using the main navigation menu.
- Locate the sorting dropdown menu.
- Select 'Sort by price: low to high' from the dropdown.
- Verify that the product list updates accordingly.
- Select 'Sort by price: high to low' from the dropdown.
- Verify that the product list updates accordingly.

#### Selectors Used:
- **Type**: link, **Text**: 'MEN', **Selector**: `//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: select, **Text**: 'Default sorting
Sort by popularity
Sort by average rating
Sort by latest
Sort by price: low to high
Sort by price: high to low', **Selector**: `select[aria-label="Shop order"]`, **Action**: select

#### Expected Results:
- Products are sorted correctly based on the selected criteria.

---

### 4. Verify Viewing and Adding a Product to Cart
_This scenario tests a user's ability to view detailed product information and add the product to the shopping cart._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, e-commerce, error-handling, form-submission, payment-flow, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: e-commerce
**Pages Involved:**
- https://atid.store/
- https://atid.store/product/atid-yellow-shoes/

#### Steps:
- Navigate to the homepage (https://atid.store/).
- Scroll to the Featured Products section.
- Click on the product link 'ATID Yellow Shoes'.
- Verify the product detail page loads with correct product information such as name, price, description, and images.
- Check if the 'Add to Cart' button is visible and enabled.
- Click on the 'Add to Cart' button.
- Verify a confirmation message or UI update indicates the product has been added to the cart.
- Navigate to the Cart page by clicking the cart icon in the header.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://atid.store/product/atid-yellow-shoes/' and contains(@class, 'woocommerce-LoopProduct-link')]`, **Action**: click
- **Type**: button, **Text**: 'Add to Cart', **Selector**: `//button[normalize-space()="Add to cart"]`, **Action**: click
- **Type**: a, **Text**: 'Cart', **Selector**: `//a[@href='https://atid.store/cart-2/' and contains(@class, 'cart-container')]`, **Action**: click

#### Expected Results:
- The product detail page should display correct information.
- The 'Add to Cart' button should function correctly.
- The product should be added to the cart and visible on the Cart page.

---

### 5. Search for a Product Using the Search Bar
_This scenario tests the functionality of the search bar to locate specific products._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, form-submission, mobile, performance, search, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: search
**Pages Involved:**
- https://atid.store/

#### Steps:
- Navigate to the homepage (https://atid.store/).
- Locate the search bar in the header.
- Click on the search bar to activate it.
- Type the product name 'Dark Brown Jeans' into the search bar.
- Press Enter to initiate the search.
- Verify the search results page loads with relevant products matching the query.
- Locate the product 'Dark Brown Jeans' in the search results.
- Click on the product link to view its detailed page.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://atid.store/' and contains(@class, 'custom-logo-link')]`, **Action**: click
- **Type**: input, **Text**: '', **Selector**: `//input[@type='search' and @placeholder='Search']`, **Action**: type
- **Type**: a, **Text**: 'Dark Brown Jeans', **Selector**: `//a[@href='https://atid.store/product/dark-brown-jeans/' and contains(@class, 'ast-loop-product__link')]`, **Action**: click

#### Expected Results:
- The search results page should display products matching the query.
- The 'Dark Brown Jeans' product should be clickable and lead to its detailed page.

---

### 6. Navigate to a Category Page and View Products
_This scenario tests navigation to a specific product category and browsing the listed products._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, navigation, network-resilience, performance, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: high

**Type**: navigation
**Pages Involved:**
- https://atid.store/
- https://atid.store/product-category/women/

#### Steps:
- Navigate to the homepage (https://atid.store/).
- Locate the category link 'Women' in the header menu.
- Click on the 'Women' category link.
- Verify the 'Women' category page loads with a list of products.
- Scroll through the product list to view all available items.
- Click on a product link (e.g., 'Blue Denim Shorts') to view its detailed page.

#### Selectors Used:
- **Type**: a, **Text**: 'WOMEN', **Selector**: `//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: a, **Text**: 'Blue Denim Shorts', **Selector**: `//a[@href='https://atid.store/product/blue-denim-shorts/' and contains(@class, 'ast-loop-product__link')]`, **Action**: click

#### Expected Results:
- The 'Women' category page should display all relevant products.
- The product detail page for 'Blue Denim Shorts' should load correctly when clicked.

---

### 7. Verify Filtering Accessories by Price Range
_This test ensures that users can apply a price range filter to the Accessories category and view products within the specified price range._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, form-submission, performance, search_and_filter, ui-test
**Est. Execution Time**: 45 seconds | **Flakiness Potential**: medium

**Type**: search_and_filter
**Pages Involved:**
- https://atid.store/product-category/accessories/

#### Steps:
- Navigate to the Accessories category page.
- Locate the price filter section.
- Input the minimum price in the 'Min price' field.
- Input the maximum price in the 'Max price' field.
- Click the 'FILTER' button.
- Verify that the page reloads or updates dynamically.
- Scroll through the list of filtered products.
- Click on a product to view its details.
- Verify that the product price falls within the specified range.

#### Selectors Used:
- **Type**: label, **Text**: 'Min price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]`, **Action**: type
- **Type**: label, **Text**: 'Max price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]`, **Action**: type
- **Type**: button, **Text**: 'FILTER', **Selector**: `//button[normalize-space()="FILTER"]`, **Action**: click

#### Expected Results:
- Products within the specified price range are displayed.
- No products outside the specified range are shown.
- Price filter inputs are retained after filtering.

---

### 8. Verify Sorting Accessories by Price (Low to High)
_This test validates that users can sort Accessories products by price from lowest to highest._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, drag-and-drop, performance, search_and_sort, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: search_and_sort
**Pages Involved:**
- https://atid.store/product-category/accessories/

#### Steps:
- Navigate to the Accessories category page.
- Locate the sort dropdown menu.
- Select 'Sort by price: low to high' from the dropdown options.
- Verify that the page reloads or updates dynamically.
- Scroll through the list of sorted products.
- Verify that the products are displayed in ascending order of price.
- Click on a product to view its details.
- Verify that the product price matches the order.

#### Selectors Used:
- **Type**: select, **Text**: 'Sort by price: low to high', **Selector**: `select[aria-label="Shop order"]`, **Action**: select

#### Expected Results:
- Products are displayed in ascending order of price.
- Sorting selection is retained after sorting.
- No products are out of order.

---

### 9. Verify Adding an Accessory to Cart
_This test ensures that users can add an accessory product to their shopping cart._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, cart_management, payment-flow, performance, ui-test
**Est. Execution Time**: 45 seconds | **Flakiness Potential**: medium

**Type**: cart_management
**Pages Involved:**
- https://atid.store/product-category/accessories/
- https://atid.store/cart-2/

#### Steps:
- Navigate to the Accessories category page.
- Scroll through the list of products.
- Click on a product to view its details.
- Locate the 'Add to cart' button.
- Click the 'Add to cart' button.
- Verify that the product is added to the cart.
- Navigate to the cart page.
- Verify that the product appears in the cart.
- Check the product quantity and price in the cart.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://atid.store/product/anchor-bracelet/' and contains(@class, 'woocommerce-LoopProduct-link')]`, **Action**: click
- **Type**: a, **Text**: '0.00  ₪ 0', **Selector**: `//a[@href='https://atid.store/cart-2/' and contains(@class, 'cart-container')]`, **Action**: click

#### Expected Results:
- Product is successfully added to the cart.
- Cart reflects the correct product details and quantity.
- Cart total updates accordingly.

---

### 10. Verify Navigation to 'Store' Page from Empty Cart
_Tests the functionality of the 'Return to Shop' button on the cart page to ensure users can navigate back to the store page successfully._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, keyboard-navigation, navigation, network-resilience, payment-flow, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: high

**Type**: navigation
**Pages Involved:**
- https://atid.store/cart-2/
- https://atid.store/store/

#### Steps:
- Navigate to https://atid.store/cart-2/.
- Locate the 'Return to Shop' button using its stable selector.
- Verify that the button is enabled and visible on the page.
- Click on the 'Return to Shop' button.
- Wait for the page to load completely.
- Verify that the user is redirected to https://atid.store/store/.
- Check that the store page displays product categories and listings.

#### Selectors Used:
- **Type**: a, **Text**: 'RETURN TO SHOP', **Selector**: `//a[@href='https://atid.store/store/' and contains(@class, 'button')]`, **Action**: click

#### Expected Results:
- User is redirected to the store page.
- Store page displays product categories and listings without errors.

---

### 11. Verify Accessibility Tools Functionality
_Tests the accessibility toolbar options 'Increase Text' and 'High Contrast' to ensure they adjust the page appropriately for users with visual impairments._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, keyboard-navigation, payment-flow, performance, ui-test
**Est. Execution Time**: 45 seconds | **Flakiness Potential**: medium

**Type**: accessibility
**Pages Involved:**
- https://atid.store/cart-2/

#### Steps:
- Navigate to https://atid.store/cart-2/.
- Locate the 'Increase Text' button using its stable selector.
- Click on the 'Increase Text' button.
- Verify that the text size on the page increases.
- Locate the 'High Contrast' button using its stable selector.
- Click on the 'High Contrast' button.
- Verify that the page background and text colors switch to high-contrast mode.
- Check that the buttons remain functional after applying the changes.
- Verify that the changes persist across page reloads.

#### Selectors Used:
- **Type**: a, **Text**: 'Increase Text', **Selector**: `//a[@href='#' and contains(@class, 'pojo-a11y-toolbar-link')]`, **Action**: click
- **Type**: a, **Text**: 'High Contrast', **Selector**: `//a[@href='#' and contains(@class, 'pojo-a11y-toolbar-link')]`, **Action**: click

#### Expected Results:
- Text size increases after clicking 'Increase Text'.
- Page background and text colors change to high-contrast mode after clicking 'High Contrast'.
- Accessibility changes persist across page reloads.

---

### 12. Verify Navigation Menu Links
_Tests the navigation menu links ('Men', 'Women', 'Accessories') to ensure they redirect correctly to their respective category pages._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, keyboard-navigation, navigation, network-resilience, payment-flow, performance, ui-test
**Est. Execution Time**: 50 seconds | **Flakiness Potential**: high

**Type**: navigation
**Pages Involved:**
- https://atid.store/cart-2/
- https://atid.store/product-category/men/
- https://atid.store/product-category/women/
- https://atid.store/product-category/accessories/

#### Steps:
- Navigate to https://atid.store/cart-2/.
- Locate the 'Men' link using its stable selector.
- Click on the 'Men' link.
- Verify that the page redirects to https://atid.store/product-category/men/.
- Locate the 'Women' link using its stable selector.
- Click on the 'Women' link.
- Verify that the page redirects to https://atid.store/product-category/women/.
- Locate the 'Accessories' link using its stable selector.
- Click on the 'Accessories' link.
- Verify that the page redirects to https://atid.store/product-category/accessories/.

#### Selectors Used:
- **Type**: a, **Text**: 'MEN', **Selector**: `//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: a, **Text**: 'WOMEN', **Selector**: `//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: a, **Text**: 'ACCESSORIES', **Selector**: `//a[@href='https://atid.store/product-category/accessories/' and contains(@class, 'menu-link')]`, **Action**: click

#### Expected Results:
- Link redirects to the correct category page.
- Category pages load successfully without errors.

---

### 13. Verify Product Browsing by Category
_This test verifies that users can browse products by selecting a category from the navigation menu and that the appropriate product listing page is displayed._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, navigation, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: navigation
**Pages Involved:**
- https://atid.store/store/
- https://atid.store/product-category/{category}/

#### Steps:
- Navigate to the Store page.
- Click on the 'Men' category link in the navigation menu.
- Wait for the product listing page for the 'Men' category to load.
- Verify that the URL matches the expected URL for the 'Men' category.
- Assert that the product listing contains items exclusively from the 'Men' category.
- Repeat the above steps for 'Women' and 'Accessories' categories.
- Verify that each category displays the correct set of products.

#### Selectors Used:
- **Type**: link, **Text**: 'MEN', **Selector**: `//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: link, **Text**: 'WOMEN', **Selector**: `//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: link, **Text**: 'ACCESSORIES', **Selector**: `//a[@href='https://atid.store/product-category/accessories/' and contains(@class, 'menu-link')]`, **Action**: click

#### Expected Results:
- The correct product listing page for the selected category is displayed.
- The URL matches the expected URL for the selected category.
- Only products belonging to the selected category are displayed.

---

### 14. Verify Product Search Functionality
_This test validates that users can search for products using the search bar and that relevant results are displayed._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, error-handling, mobile, performance, search, ui-test
**Est. Execution Time**: 45 seconds | **Flakiness Potential**: medium

**Type**: search
**Pages Involved:**
- https://atid.store/store/

#### Steps:
- Navigate to the Store page.
- Locate the search bar on the page.
- Enter the product name 'Anchor Bracelet' into the search bar.
- Click the 'Search' button.
- Wait for the search results page to load.
- Verify that the product 'Anchor Bracelet' appears in the search results.
- Clear the search bar and enter a non-existent product name.
- Click the 'Search' button.
- Verify that a 'No products found' message is displayed.

#### Selectors Used:
- **Type**: input, **Text**: '', **Selector**: `#wc-block-search__input-1`, **Action**: type
- **Type**: button, **Text**: 'Search', **Selector**: `button[aria-label="Search"]`, **Action**: click

#### Expected Results:
- The search results page displays the product 'Anchor Bracelet'.
- A 'No products found' message appears for non-existent product names.

---

### 15. Verify Price Filter Functionality
_This test ensures that the price filter works correctly, allowing users to filter products within a specified price range._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, filter, mobile, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: filter
**Pages Involved:**
- https://atid.store/store/

#### Steps:
- Navigate to the Store page.
- Locate the price filter section.
- Enter '50' in the 'Min price' field.
- Enter '150' in the 'Max price' field.
- Click the 'FILTER' button.
- Wait for the page to refresh with filtered results.
- Verify that all displayed products have prices between 50 and 150.
- Adjust the filter to a different range and repeat the verification.

#### Selectors Used:
- **Type**: label, **Text**: 'Min price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]`, **Action**: type
- **Type**: label, **Text**: 'Max price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]`, **Action**: type
- **Type**: button, **Text**: 'FILTER', **Selector**: `//button[normalize-space()="FILTER"]`, **Action**: click

#### Expected Results:
- The product listing updates to show items within the specified price range.

---

