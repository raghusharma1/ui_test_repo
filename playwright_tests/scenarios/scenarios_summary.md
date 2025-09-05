# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 15
- **Application Base URL**: https://atid.store
- **Generated On**: 2025-09-05 17:12:36

## Scenarios

### 1. Verify Product Search and Navigation to Product Details Page
_Validates the ability of users to search for a product by category and navigate to its details page._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, form-submission, navigation, network-resilience, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: high

**Type**: navigation
**Pages Involved:**
- https://atid.store/
- https://atid.store/product-category/accessories/
- https://atid.store/product/light-brown-purse/

#### Steps:
- Navigate to https://atid.store/
- Click on the 'ACCESSORIES' menu link in the navigation bar.
- Wait for the Accessories category page to load.
- Locate and click on the product link 'Light Brown Purse'.
- Wait for the product details page for 'Light Brown Purse' to fully load.
- Verify that the product name 'Light Brown Purse' is displayed on the product details page.
- Verify that the product description and pricing information are displayed.

#### Selectors Used:
- **Type**: a, **Text**: 'ACCESSORIES', **Selector**: `//a[@href='https://atid.store/product-category/accessories/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: a, **Text**: 'Light Brown Purse', **Selector**: `//a[@href='https://atid.store/product/light-brown-purse/' and contains(@class, 'ast-loop-product__link')]`, **Action**: click

#### Expected Results:
- User is successfully redirected to the Accessories category page.
- User is successfully redirected to the product details page of 'Light Brown Purse'.
- Product name, description, and pricing information are correctly displayed.

---

### 2. Verify Shopping Cart Functionality
_Tests the ability of users to add a product to the shopping cart and review the cart contents._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, cart_operations, form-submission, network-resilience, payment-flow, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: high

**Type**: cart_operations
**Pages Involved:**
- https://atid.store/
- https://atid.store/cart-2/

#### Steps:
- Navigate to https://atid.store/
- Click on the 'SHOP NOW' button under the Women's category.
- Wait for the Women's category page to load.
- Locate and click on the product link 'Blue Denim Shorts'.
- Wait for the product details page of 'Blue Denim Shorts' to load.
- Click on the 'Add to Cart' button on the product page.
- Wait for the cart page to load.
- Verify that 'Blue Denim Shorts' is displayed in the shopping cart with correct pricing.

#### Selectors Used:
- **Type**: a, **Text**: 'SHOP NOW', **Selector**: `//a[@href='https://atid.store/product-category/women/' and contains(@class, 'elementor-button-link')]`, **Action**: click
- **Type**: a, **Text**: 'Blue Denim Shorts', **Selector**: `//a[@href='https://atid.store/product/blue-denim-shorts/' and contains(@class, 'ast-loop-product__link')]`, **Action**: click
- **Type**: a, **Text**: 'Cart', **Selector**: `//a[@href='https://atid.store/cart-2/' and contains(@class, 'cart-container')]`, **Action**: click

#### Expected Results:
- Product 'Blue Denim Shorts' is successfully added to the cart.
- Cart page displays 'Blue Denim Shorts' with correct pricing.
- User can proceed to checkout from the cart page.

---

### 3. Verify User Navigation Across Categories
_Tests the ability of users to navigate between product categories using the main menu._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, mobile, navigation, network-resilience, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: high

**Type**: navigation
**Pages Involved:**
- https://atid.store/
- https://atid.store/product-category/men/
- https://atid.store/product-category/women/
- https://atid.store/product-category/accessories/

#### Steps:
- Navigate to https://atid.store/
- Click on the 'MEN' menu link in the navigation bar.
- Wait for the Men's category page to load.
- Click on the 'WOMEN' menu link in the navigation bar.
- Wait for the Women's category page to load.
- Click on the 'ACCESSORIES' menu link in the navigation bar.
- Wait for the Accessories category page to load.
- Verify that each category page displays relevant products.

#### Selectors Used:
- **Type**: a, **Text**: 'MEN', **Selector**: `//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: a, **Text**: 'WOMEN', **Selector**: `//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: a, **Text**: 'ACCESSORIES', **Selector**: `//a[@href='https://atid.store/product-category/accessories/' and contains(@class, 'menu-link')]`, **Action**: click

#### Expected Results:
- User can successfully navigate between categories.
- Category pages display relevant products.
- Navigation menu remains functional throughout the test.

---

### 4. Verify Navigation to Men's Section and Product Interaction
_This test verifies that the user can navigate to the Men's section and interact with product listings by viewing details and adding a product to the cart._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, navigation, payment-flow, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: navigation
**Pages Involved:**
- https://atid.store
- https://atid.store/product-category/men/

#### Steps:
- Navigate to the homepage at https://atid.store.
- Locate and click on the 'MEN' navigation link in the main menu.
- Verify that the page redirects to the Men's section.
- Scroll through the product listings to ensure all men's products are visible.
- Click on the product link for 'ATID Yellow Shoes'.
- Verify that the product detail page for 'ATID Yellow Shoes' is displayed.
- Add the product to the cart by clicking on the 'Add to Cart' button.
- Verify that the cart updates and displays the added product.

#### Selectors Used:
- **Type**: a, **Text**: 'MEN', **Selector**: `//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: a, **Text**: 'ATID Yellow Shoes', **Selector**: `//a[@href='https://atid.store/product/atid-yellow-shoes/' and contains(@class, 'ast-loop-product__link')]`, **Action**: click

#### Expected Results:
- The Men's section page is displayed.
- All Men's products are visible on the page.
- The product detail page for 'ATID Yellow Shoes' is displayed.
- The cart updates to show the added product.

---

### 5. Verify Search Functionality for Products
_This test verifies the search functionality by ensuring users can search for specific products using keywords and navigate to product details._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, form-submission, performance, search, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: search
**Pages Involved:**
- https://atid.store

#### Steps:
- Navigate to the homepage at https://atid.store.
- Locate and click on the 'Search' button in the header.
- Type 'Yellow Shoes' into the search input field.
- Submit the search query by pressing Enter.
- Verify that the search results page displays products related to 'Yellow Shoes'.
- Click on the product link for 'ATID Yellow Shoes' from the search results.
- Verify that the product detail page for 'ATID Yellow Shoes' is displayed.

#### Selectors Used:
- **Type**: a, **Text**: 'Search', **Selector**: `//a[@href='#' and contains(@class, 'slide-search')]`, **Action**: click
- **Type**: a, **Text**: 'ATID Yellow Shoes', **Selector**: `//a[@href='https://atid.store/product/atid-yellow-shoes/' and contains(@class, 'ast-loop-product__link')]`, **Action**: click

#### Expected Results:
- Search results for 'Yellow Shoes' are displayed.
- The product detail page for 'ATID Yellow Shoes' is displayed.

---

### 6. Verify User Navigation to Empty Cart and Return to Store
_This test validates the user's ability to access the cart page when it is empty and navigate back to the store using the 'Return to Shop' button._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, authentication, auto-generated, data-validation, error-handling, navigation, network-resilience, payment-flow, performance, security, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: high

**Type**: navigation
**Pages Involved:**
- https://atid.store
- https://atid.store/cart-2/
- https://atid.store/store/

#### Steps:
- Navigate to the homepage at https://atid.store.
- Click on the 'Cart' link in the main navigation menu.
- Verify that the cart page loads successfully.
- Assert that the empty cart message is visible on the page.
- Locate and click the 'RETURN TO SHOP' button.
- Verify that the user is redirected to the store page.

#### Selectors Used:
- **Type**: a, **Text**: 'Cart', **Selector**: `//a[@href='https://atid.store/cart-2/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: a, **Text**: 'RETURN TO SHOP', **Selector**: `//a[@href='https://atid.store/store/' and contains(@class, 'button')]`, **Action**: click

#### Expected Results:
- User successfully navigates to the cart page.
- The empty cart message is displayed.
- User clicks the 'RETURN TO SHOP' button and is redirected to the store page.

---

### 7. Verify Navigation to Product Categories from Cart Page
_This test ensures users can navigate to product categories from the cart page using category links._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, navigation, network-resilience, payment-flow, performance, security, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: high

**Type**: navigation
**Pages Involved:**
- https://atid.store/cart-2/
- https://atid.store/product-category/men/
- https://atid.store/product-category/women/

#### Steps:
- Navigate to the cart page at https://atid.store/cart-2/.
- Locate the navigation menu.
- Click on the 'MEN' category link in the navigation menu.
- Verify that the 'Men' product category page loads successfully.
- Return to the cart page.
- Click on the 'WOMEN' category link in the navigation menu.
- Verify that the 'Women' product category page loads successfully.

#### Selectors Used:
- **Type**: a, **Text**: 'MEN', **Selector**: `//a[@href='https://atid.store/product-category/men/' and contains(@class, 'menu-link')]`, **Action**: click
- **Type**: a, **Text**: 'WOMEN', **Selector**: `//a[@href='https://atid.store/product-category/women/' and contains(@class, 'menu-link')]`, **Action**: click

#### Expected Results:
- User successfully navigates to the 'Men' product category page.
- User successfully navigates to the 'Women' product category page.

---

### 8. Verify Filtering Women Products by Price Range and Adding to Cart
_This test verifies that users can filter products in the Women category by price range, view the results, and add a product to the cart._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, e-commerce, form-submission, network-resilience, payment-flow, performance, ui-test
**Est. Execution Time**: 55 seconds | **Flakiness Potential**: high

**Type**: e-commerce
**Pages Involved:**
- https://atid.store/product-category/women/

#### Steps:
- Navigate to the Women category page.
- Locate the 'Min price' input field and enter a value of 50.
- Locate the 'Max price' input field and enter a value of 150.
- Click the 'FILTER' button to apply the price filter.
- Verify that the product list updates to reflect the selected price range.
- Select a product, such as 'Blue Denim Jeans', from the filtered results.
- Click on the product link to view its details.
- Verify that the product detail page displays the correct product information, including price.
- Locate and click the 'Add to Cart' button on the product detail page.
- Navigate to the cart page to verify the product has been added.
- Ensure the cart displays the correct product name, quantity, and price.

#### Selectors Used:
- **Type**: input, **Text**: 'Min price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]`, **Action**: type
- **Type**: input, **Text**: 'Max price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]`, **Action**: type
- **Type**: button, **Text**: 'FILTER', **Selector**: `//button[normalize-space()="FILTER"]`, **Action**: click
- **Type**: link, **Text**: 'Blue Denim Jeans', **Selector**: `//a[@href='https://atid.store/product/blue-denim-jeans/' and contains(@class, 'ast-loop-product__link')]`, **Action**: click
- **Type**: button, **Text**: 'Add to Cart', **Selector**: `//button[@class='single_add_to_cart_button']`, **Action**: click

#### Expected Results:
- Products are filtered correctly based on the price range.
- The selected product's detail page displays accurate information.
- The product is successfully added to the cart.
- The cart displays the correct product details, including name, quantity, and price.

---

### 9. Verify Sorting Women Products by Price (Low to High) and Navigating to Next Page
_This test validates that users can sort products in the Women category by price from low to high and navigate to the next page of results._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, drag-and-drop, e-commerce, network-resilience, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: high

**Type**: e-commerce
**Pages Involved:**
- https://atid.store/product-category/women/

#### Steps:
- Navigate to the Women category page.
- Locate the sorting dropdown and select 'Sort by price: low to high'.
- Verify that the product list updates to reflect the selected sorting option.
- Scroll down to the bottom of the product list.
- Locate and click the pagination link labeled '2'.
- Verify that the second page of products is displayed.
- Check that the products on the second page are sorted by price in ascending order.

#### Selectors Used:
- **Type**: select, **Text**: 'Default sorting
Sort by popularity
Sort by average rating
Sort by latest
Sort by price: low to high
Sort by price: high to low', **Selector**: `select[aria-label="Shop order"]`, **Action**: select
- **Type**: link, **Text**: '2', **Selector**: `//a[@href='https://atid.store/product-category/women/page/2/' and contains(@class, 'page-numbers')]`, **Action**: click

#### Expected Results:
- The product list updates to show items sorted by price in ascending order.
- The second page of products is displayed upon clicking the pagination link.
- Products on the second page are sorted by price in ascending order.

---

### 10. Verify Contact Us Form Submission with Valid Data
_This scenario tests the submission of the Contact Us form with valid user inputs and ensures the form is correctly processed._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, error-handling, form-submission, form_submission, keyboard-navigation, network-resilience, performance, ui-test
**Est. Execution Time**: 30 seconds | **Flakiness Potential**: high

**Type**: form_submission
**Pages Involved:**
- https://atid.store/contact-us/

#### Steps:
- Navigate to https://atid.store/contact-us/
- Locate the 'Name *' input field using its stable selector and type 'John Doe'.
- Locate the 'Email *' input field using its stable selector and type 'john.doe@example.com'.
- Locate the 'Comment or Message *' textarea using its stable selector and type 'I would like to inquire about bulk orders.'
- Locate the 'SEND MESSAGE' button using its stable selector and click on it.
- Verify that a success message or confirmation appears indicating the form submission was successful.

#### Selectors Used:
- **Type**: input, **Text**: '', **Selector**: `#wpforms-15-field_0`, **Action**: type
- **Type**: input, **Text**: '', **Selector**: `#wpforms-15-field_4`, **Action**: type
- **Type**: textarea, **Text**: '', **Selector**: `#wpforms-15-field_2`, **Action**: type
- **Type**: button, **Text**: 'SEND MESSAGE', **Selector**: `#wpforms-submit-15`, **Action**: click

#### Expected Results:
- All input fields accept valid data.
- The 'SEND MESSAGE' button triggers the form submission.
- A confirmation message is displayed indicating the form submission was successful.

---

### 11. Verify Navigation to Contact Us Page
_This scenario tests the navigation link to the Contact Us page from the main menu and verifies its accessibility._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, cross-browser, error-handling, form-submission, keyboard-navigation, navigation, network-resilience, performance, ui-test
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: high

**Type**: navigation
**Pages Involved:**
- https://atid.store
- https://atid.store/contact-us/

#### Steps:
- Navigate to https://atid.store.
- Locate the 'CONTACT US' navigation link in the main menu using its stable selector and click on it.
- Verify the browser redirects to https://atid.store/contact-us/.
- Ensure the page title matches 'Contact Us'.
- Verify the presence of the contact form on the page.

#### Selectors Used:
- **Type**: a, **Text**: 'CONTACT US', **Selector**: `//a[@href='https://atid.store/contact-us/' and contains(@class, 'menu-link')]`, **Action**: click

#### Expected Results:
- The 'CONTACT US' link is clickable and functional.
- The browser redirects to the correct URL (https://atid.store/contact-us/).
- The Contact Us page loads successfully with all elements visible.

---

### 12. Filter Products by Price Range
_Verify that users can filter products within a specified price range and view appropriate results._

**Complexity**: high | **Priority**: high | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, form-submission, functionality, performance, ui-test
**Est. Execution Time**: 35 seconds | **Flakiness Potential**: medium

**Type**: functionality
**Pages Involved:**
- https://atid.store/store/

#### Steps:
- Navigate to the store page.
- Locate the 'Min price' and 'Max price' fields.
- Input a value of 50 in the 'Min price' field.
- Input a value of 150 in the 'Max price' field.
- Click the 'FILTER' button to apply the price range filter.
- Wait for the filtered products list to load.
- Verify that all displayed products have prices within the range of 50 to 150.

#### Selectors Used:
- **Type**: label, **Text**: 'Min price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[1]`, **Action**: type
- **Type**: label, **Text**: 'Max price', **Selector**: `//div[@id='woocommerce_price_filter-2']/form/div/div[2]/label[2]`, **Action**: type
- **Type**: button, **Text**: 'FILTER', **Selector**: `//button[normalize-space()="FILTER"]`, **Action**: click

#### Expected Results:
- Products displayed are within the specified price range of 50 to 150.
- No products with prices outside the range appear in the filtered list.

---

### 13. Sort Products by Popularity
_Ensure users can sort products by popularity through the sorting dropdown._

**Complexity**: medium | **Priority**: normal | **Risk Level**: medium
**Tags**: accessibility, api-integration, auto-generated, drag-and-drop, error-handling, functionality, performance, ui-test
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: medium

**Type**: functionality
**Pages Involved:**
- https://atid.store/store/

#### Steps:
- Navigate to the store page.
- Locate the sorting dropdown menu.
- Select the 'Sort by popularity' option from the dropdown.
- Wait for the products list to refresh.
- Verify that products are sorted based on popularity rankings.

#### Selectors Used:
- **Type**: select, **Text**: 'Default sorting
Sort by popularity
Sort by average rating
Sort by latest
Sort by price: low to high
Sort by price: high to low', **Selector**: `select[aria-label="Shop order"]`, **Action**: select

#### Expected Results:
- Products are displayed in descending order of popularity.
- Sorting updates the product list dynamically.

---

### 14. View Product Details
_Validate that users can click on a product and view detailed information._

**Complexity**: medium | **Priority**: normal | **Risk Level**: high
**Tags**: accessibility, api-integration, auto-generated, data-validation, error-handling, form-submission, functionality, payment-flow, performance, ui-test
**Est. Execution Time**: 25 seconds | **Flakiness Potential**: medium

**Type**: functionality
**Pages Involved:**
- https://atid.store/store/
- https://atid.store/product/anchor-bracelet/

#### Steps:
- Navigate to the store page.
- Locate the 'Anchor Bracelet' product link.
- Click on the product link.
- Wait for the product details page to load.
- Verify that the product name, price, description, and 'Add to Cart' button are visible.

#### Selectors Used:
- **Type**: a, **Text**: '', **Selector**: `//a[@href='https://atid.store/product/anchor-bracelet/' and contains(@class, 'woocommerce-LoopProduct-link')]`, **Action**: click
- **Type**: a, **Text**: 'Anchor Bracelet', **Selector**: `//a[@href='https://atid.store/product/anchor-bracelet/' and contains(@class, 'ast-loop-product__link')]`, **Action**: click

#### Expected Results:
- The product details page is displayed with all relevant information.
- Users can see options to add the product to their cart.

---

### 15. Navigate Pagination
_Verify that users can navigate between pages of product listings using pagination controls._

**Complexity**: medium | **Priority**: normal | **Risk Level**: medium
**Tags**: accessibility, api-integration, auto-generated, error-handling, functionality, keyboard-navigation, performance, ui-test
**Est. Execution Time**: 40 seconds | **Flakiness Potential**: medium

**Type**: functionality
**Pages Involved:**
- https://atid.store/store/
- https://atid.store/store/page/2/

#### Steps:
- Navigate to the store page.
- Locate the pagination controls at the bottom of the page.
- Click on the '2' link to navigate to page 2.
- Wait for the page to load.
- Verify that the URL changes to 'https://atid.store/store/page/2/' and products on page 2 are displayed.
- Click on the 'Next page' link to navigate to page 3.
- Wait for the page to load.
- Verify that the URL changes to 'https://atid.store/store/page/3/' and products on page 3 are displayed.

#### Selectors Used:
- **Type**: a, **Text**: '2', **Selector**: `//a[@href='https://atid.store/store/page/2/' and contains(@class, 'page-numbers')]`, **Action**: click
- **Type**: a, **Text**: '3', **Selector**: `//a[@href='https://atid.store/store/page/3/' and contains(@class, 'page-numbers')]`, **Action**: click
- **Type**: a, **Text**: '→', **Selector**: `//a[@href='https://atid.store/store/page/2/' and contains(@class, 'next')]`, **Action**: click

#### Expected Results:
- Users can navigate to subsequent pages of product listings using pagination controls.
- The URL updates correctly as users navigate.

---

