from .base_page import BasePage
from .splash_screen_page import SplashScreenPage
from .version_check_page import VersionCheckPage
from .login_page import LoginPage
from .otp_page import OTPPage
from .legal_popup_page import LegalPopupPage
from .reminder_popup_page import ReminderPopupPage
from .notifications_popup_page import NotificationsPopupPage
from .dashboard_page import DashboardPage
from .menu_page import MenuPage
from .card_selector_page import CardSelectorPage
from .limit_entry_page import LimitEntryPage
from .agreement_page import AgreementPage
from .review_page import ReviewPage
from .review_confirm_dialog_page import ReviewConfirmDialogPage
from .result_page import ResultPage
from .card_details_page import CardDetailsPage
from .transaction_detail_bottom_sheet_page import TransactionDetailBottomSheetPage


__all__ = [
    "AppScreens",
    "SplashScreenPage",
    "VersionCheckPage",
    "LoginPage",
    "OTPPage",
    "LegalPopupPage",
    "ReminderPopupPage",
    "NotificationsPopupPage",
    "DashboardPage",
    "MenuPage",
    "CardSelectorPage",
    "LimitEntryPage",
    "AgreementPage",
    "ReviewPage",
    "ReviewConfirmDialogPage",
    "ResultPage",
    "CardDetailsPage",
    "TransactionDetailBottomSheetPage",
]


class AppScreens:
    """Lazily builds every page object for a single driver session.

    Adding a new page object as a property here makes it available to every
    test without touching them.
    """

    def __init__(self, driver):
        self._driver = driver

    @property
    def splash_screen(self):
        return SplashScreenPage(self._driver)

    @property
    def version_check(self):
        return VersionCheckPage(self._driver)

    @property
    def login(self):
        return LoginPage(self._driver)

    @property
    def otp(self):
        return OTPPage(self._driver)

    @property
    def legal_popup(self):
        return LegalPopupPage(self._driver)

    @property
    def reminder_popup(self):
        return ReminderPopupPage(self._driver)

    @property
    def notifications_popup(self):
        return NotificationsPopupPage(self._driver)

    @property
    def dashboard(self):
        return DashboardPage(self._driver)

    @property
    def menu(self):
        return MenuPage(self._driver)

    @property
    def card_selector(self):
        return CardSelectorPage(self._driver)

    @property
    def limit_entry(self):
        return LimitEntryPage(self._driver)

    @property
    def agreement(self):
        return AgreementPage(self._driver)

    @property
    def review(self):
        return ReviewPage(self._driver)

    @property
    def review_confirm_dialog(self):
        return ReviewConfirmDialogPage(self._driver)

    @property
    def result(self):
        return ResultPage(self._driver)

    @property
    def card_details(self):
        return CardDetailsPage(self._driver)

    @property
    def transaction_detail_bottom_sheet(self):
        return TransactionDetailBottomSheetPage(self._driver)
