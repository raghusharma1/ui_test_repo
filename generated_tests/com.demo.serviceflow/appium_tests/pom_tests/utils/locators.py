"""Helpers for building Appium locators without repeating the app package name
or hand-writing UiSelector strings in every page object.

Page objects declare their locators as class constants built from these
helpers; nothing else in the suite should construct raw locator tuples.
"""
from appium.webdriver.common.appiumby import AppiumBy

from .config import APP_PACKAGE


def _escape(value):
    return value.replace("\\", "\\\\").replace('"', '\\"')


def resource_id(short_id):
    """Builds an `AppiumBy.ID` locator for a resource id within this app's package.

    resource_id("login_username_input")
        -> (AppiumBy.ID, "<app_package>:id/login_username_input")

    Ids that already carry a package prefix (e.g. "android:id/button2") are
    used as-is.
    """
    if ":id/" in short_id:
        return (AppiumBy.ID, short_id)
    if not APP_PACKAGE:
        raise RuntimeError(
            f"Cannot build resource-id locator '{short_id}': MOBILE_APP_PACKAGE is not "
            f"set in .env (needed to prefix package-relative resource ids)."
        )
    return (AppiumBy.ID, f"{APP_PACKAGE}:id/{short_id}")


def accessibility_id(value):
    """Builds an `AppiumBy.ACCESSIBILITY_ID` locator (Android content-desc)."""
    return (AppiumBy.ACCESSIBILITY_ID, value)


def text_exact(text):
    """Builds a UiSelector locator matching an element whose text is exactly `text`.

    Prefer `text_contains` when the on-screen copy may vary (trailing
    punctuation, minor wording changes).
    """
    return (AppiumBy.ANDROID_UIAUTOMATOR, f'new UiSelector().text("{_escape(text)}")')


def text_contains(substring):
    """Builds a UiSelector locator matching any element whose text contains `substring`."""
    return (AppiumBy.ANDROID_UIAUTOMATOR, f'new UiSelector().textContains("{_escape(substring)}")')


def xpath(expression):
    """Builds an `AppiumBy.XPATH` locator. Last resort — prefer the helpers above."""
    return (AppiumBy.XPATH, expression)
