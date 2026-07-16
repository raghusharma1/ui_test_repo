"""Page objects package, plus the AppScreens convenience aggregator.

This file is OWNED BY THE TEST GENERATOR after initial scaffolding: each
generated page object gets imported here and exposed as an `AppScreens`
property, so tests ask for the screens they need (`screens.login`, ...)
instead of constructing page objects by hand.
"""

__all__ = ["AppScreens"]


class AppScreens:
    """Lazily builds every page object for a single driver session.

    Adding a new page object as a property here makes it available to every
    test without touching them.
    """

    def __init__(self, driver):
        self._driver = driver
