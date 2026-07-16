from .version_check_page import VersionCheckPage
from .login_page import LoginPage
from .otp_page import OtpPage
from .legal_popup_page import LegalPopupPage
from .reminder_popup_page import ReminderPopupPage
from .dashboard_page import DashboardPage
from .menu_page import MenuPage
from .agreement_page import AgreementPage
from .review_page import ReviewPage


__all__ = [
    "AppScreens",
    "VersionCheckPage",
    "LoginPage",
    "OtpPage",
    "LegalPopupPage",
    "ReminderPopupPage",
    "DashboardPage",
    "MenuPage",
    "AgreementPage",
    "ReviewPage",
]


class AppScreens:
    """Lazily builds every page object for a single driver session.

    Adding a new page object as a property here makes it available to every
    test without touching them.
    """

    def __init__(self, driver):
        self._driver = driver

    @property
    def version_check(self):
        return VersionCheckPage(self._driver)

    @property
    def login(self):
        return LoginPage(self._driver)

    @property
    def otp(self):
        return OtpPage(self._driver)

    @property
    def legal_popup(self):
        return LegalPopupPage(self._driver)

    @property
    def reminder_popup(self):
        return ReminderPopupPage(self._driver)

    @property
    def dashboard(self):
        return DashboardPage(self._driver)

    @property
    def menu(self):
        return MenuPage(self._driver)

    @property
    def agreement(self):
        return AgreementPage(self._driver)

    @property
    def review(self):
        return ReviewPage(self._driver)
