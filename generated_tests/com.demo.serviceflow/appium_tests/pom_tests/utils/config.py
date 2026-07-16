"""Central place for environment-driven configuration.

Every other module reads settings from here instead of calling `os.getenv`
directly, so there is exactly one place to look when a capability or default
needs to change.

Note on reads: `.env` files may contain empty values (`VAR=`), which dotenv
loads as empty strings — `os.getenv("VAR", default)` does NOT apply the
default then. That is why every read below uses `os.getenv("VAR") or default`.
"""
import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

_PROJECT_ROOT = Path(__file__).resolve().parent.parent

APP_PACKAGE = os.getenv("MOBILE_APP_PACKAGE") or ""
DEFAULT_TIMEOUT = int(os.getenv("MOBILE_DEFAULT_TIMEOUT") or "10")


def _bool_env(name, default=False):
    raw = os.getenv(name)
    if raw is None or raw == "":
        return default
    return raw.strip().lower() in ("true", "1", "yes")


def _resolve_app_path(path):
    if not path:
        return ""
    p = Path(path)
    return str(p if p.is_absolute() else (_PROJECT_ROOT / p).resolve())


@dataclass(frozen=True)
class AppiumConfig:
    """Everything needed to build Appium session capabilities."""

    server_url: str
    platform_name: str
    device_name: str
    automation_name: str
    app_package: str
    app_activity: str
    app_path: str
    reset_app: bool
    skip_app_install: bool
    unlock_type: str
    unlock_key: str

    @classmethod
    def from_env(cls):
        return cls(
            server_url=os.getenv("APPIUM_SERVER_URL") or "http://127.0.0.1:4723",
            platform_name=os.getenv("MOBILE_PLATFORM") or "Android",
            device_name=os.getenv("MOBILE_DEVICE_NAME") or "emulator-5554",
            automation_name=os.getenv("MOBILE_AUTOMATION_NAME") or "UiAutomator2",
            app_package=os.getenv("MOBILE_APP_PACKAGE") or "",
            app_activity=os.getenv("MOBILE_APP_ACTIVITY") or "",
            app_path=_resolve_app_path(os.getenv("MOBILE_APP_PATH") or ""),
            reset_app=_bool_env("MOBILE_RESET_APP", default=True),
            skip_app_install=_bool_env("MOBILE_SKIP_APP_INSTALL", default=False),
            unlock_type=(os.getenv("MOBILE_UNLOCK_TYPE") or "").strip().lower(),
            unlock_key=os.getenv("MOBILE_UNLOCK_KEY") or "",
        )

    @property
    def is_local_server(self):
        return "localhost" in self.server_url or "127.0.0.1" in self.server_url

    @property
    def has_local_apk(self):
        return bool(self.app_path) and os.path.isfile(self.app_path) and not self.skip_app_install

    @property
    def needs_remote_install(self):
        """True when a local APK exists but the Appium server can't read it directly.

        The `app` capability must point to a path on the same machine as the
        Appium server. If the server is remote, the file has to be uploaded
        over the wire and installed after the session starts instead.
        """
        return self.has_local_apk and not self.is_local_server


@dataclass(frozen=True)
class Credentials:
    """Login credentials for the app under test, sourced from the environment.

    Values never belong in test code or data files — only in `.env`.
    """

    username: str
    password: str
    otp: str

    @classmethod
    def from_env(cls):
        return cls(
            username=os.getenv("MOBILE_USERNAME") or "",
            password=os.getenv("MOBILE_PASSWORD") or "",
            otp=os.getenv("MOBILE_OTP") or "",
        )

    def require(self, *names):
        """Fail fast with a clear message when a needed credential is missing.

        Usage: `credentials = Credentials.from_env().require("username", "password")`
        """
        missing = [n for n in names if not getattr(self, n)]
        if missing:
            env_vars = ", ".join(f"MOBILE_{n.upper()}" for n in missing)
            raise RuntimeError(f"Missing required credentials in .env: {env_vars}")
        return self
