"""Best-effort device preparation: make sure the target app is installed on
the device BEFORE the Appium session starts.

This mirrors what the test-generation pipeline does at the start of every
`generate` / `test run` — a direct-ADB install of `MOBILE_APP_PATH` — but
self-contained so a suite run standalone (`uv run pytest` on a freshly booted
emulator) installs the app too instead of failing because the package isn't
there yet. It intentionally matches `mobile/agent_module.py::_ensure_app_installed`
and `_get_adb_base` so behaviour is identical to the pipeline.

Why direct ADB and not Appium: `adb install -r` needs no security-gated Appium
features, works identically for a local emulator and a TCP/AWS device
(`MOBILE_DEVICE_NAME=host:port`), and reinstalls idempotently (preserving app
data) so it is safe to run before every session.

Every step is best-effort: any failure logs a warning and returns, so a device
that already has the app — or an Appium server able to install it — is never
blocked by this module.
"""
import logging
import os
import re
import shutil
import subprocess
import time

logger = logging.getLogger(__name__)

# Matches mobile/agent_module.py.
APP_INSTALL_ATTEMPTS = 3
APP_INSTALL_RETRY_DELAY_S = 5
_TCP_SERIAL_RE = re.compile(r"^[\w.\-]+:\d+$")


def _ensure_tcp_connected(adb, serial):
    """Register a TCP device (host:port) with the local adb server.

    USB/emulator serials self-register, but a network device is invisible to
    raw `adb -s host:port ...` until something runs `adb connect host:port`.
    No-op for non-TCP serials and for devices already listed as connected.
    """
    if not serial or not _TCP_SERIAL_RE.match(serial):
        return
    try:
        listed = subprocess.run(
            [adb, "devices"], capture_output=True, text=True, timeout=10, check=False
        )
        for line in listed.stdout.strip().splitlines()[1:]:
            parts = line.split()
            if len(parts) >= 2 and parts[0] == serial and parts[1] == "device":
                return  # already connected
    except Exception as error:
        logger.debug("adb devices check failed: %s", error)

    logger.info("Registering TCP ADB device with local adb server: adb connect %s", serial)
    try:
        result = subprocess.run(
            [adb, "connect", serial], capture_output=True, text=True, timeout=20, check=False
        )
        output = (result.stdout or "").strip() or (result.stderr or "").strip()
        logger.info("adb connect %s: %s", serial, output)
    except Exception as error:
        logger.warning("adb connect %s failed: %s", serial, error)


def _get_adb_base(serial):
    """Build the base ADB command targeting *serial*.

    Mirrors mobile/agent_module.py::_get_adb_base: prefers system adb from PATH,
    falls back to adbutils' bundled binary when present, registers TCP devices,
    and auto-detects the first online device when no serial is configured.
    """
    adb = shutil.which("adb")
    if not adb:
        try:
            from adbutils._utils import adb_path
            adb = adb_path()
        except Exception:
            adb = "adb"

    if serial:
        # TCP devices (host:port) must be registered with the local adb server
        # first, or every raw adb command fails with "device not found".
        _ensure_tcp_connected(adb, serial)
        return [adb, "-s", serial]

    # Auto-detect: pick the first online device.
    try:
        detect = subprocess.run(
            [adb, "devices"], capture_output=True, text=True, timeout=10, check=False
        )
        lines = [
            l for l in detect.stdout.strip().splitlines()[1:]
            if l.strip() and "\tdevice" in l
        ]
        if lines:
            detected = lines[0].split()[0]
            logger.info("Auto-detected online ADB device: %s", detected)
            return [adb, "-s", detected]
        logger.warning("No online ADB devices found")
    except Exception as error:
        logger.warning("Failed to auto-detect ADB devices: %s", error)
    return [adb]


def ensure_app_installed(config):
    """Install `config.app_path` on the device when configured.

    Mirrors mobile/agent_module.py::_ensure_app_installed: uses `adb install -r`
    (works for fresh install and reinstall, preserving data), retrying up to
    APP_INSTALL_ATTEMPTS times and recomputing the ADB base each attempt (so a
    TCP `adb connect` is re-run when the previous attempt failed because the
    device wasn't registered yet).

    Returns True when the app is ready (installed successfully, or install not
    required/skipped). Returns False ONLY when an install was actually attempted
    and failed every attempt. Callers treat this as best-effort — a False return
    still lets the session start (Appium may install the app itself).

    Skipped (returns True) when:
      - MOBILE_APP_PATH is empty (app assumed pre-installed on the device)
      - MOBILE_SKIP_APP_INSTALL is set
      - the APK file does not exist locally
    """
    app_path = config.app_path
    if not app_path:
        return True

    if config.skip_app_install:
        logger.info("MOBILE_SKIP_APP_INSTALL set — skipping APK install")
        return True

    if not os.path.isfile(app_path):
        logger.warning("MOBILE_APP_PATH does not exist: %s — skipping install", app_path)
        return True

    serial = config.device_name or ""
    for attempt in range(1, APP_INSTALL_ATTEMPTS + 1):
        # Recompute per attempt: re-runs the TCP `adb connect` when the previous
        # attempt failed because the device wasn't registered yet.
        adb_base = _get_adb_base(serial)

        logger.info("Installing app from: %s (attempt %d/%d)", app_path, attempt, APP_INSTALL_ATTEMPTS)
        try:
            result = subprocess.run(
                adb_base + ["install", "-r", app_path],
                capture_output=True, text=True, timeout=120, check=False,
            )
            if result.returncode == 0:
                logger.info("App install successful: %s", result.stdout.strip())
                return True
            logger.error(
                "App install attempt %d/%d FAILED: %s",
                attempt, APP_INSTALL_ATTEMPTS,
                result.stderr.strip() or result.stdout.strip(),
            )
        except subprocess.TimeoutExpired:
            logger.error(
                "App install attempt %d/%d timed out after 120s: %s",
                attempt, APP_INSTALL_ATTEMPTS, app_path,
            )
        except Exception as error:
            logger.error("App install attempt %d/%d error: %s", attempt, APP_INSTALL_ATTEMPTS, error)

        if attempt < APP_INSTALL_ATTEMPTS:
            time.sleep(APP_INSTALL_RETRY_DELAY_S)

    logger.error(
        "App install failed after %d attempts — the session will start anyway, but "
        "expect failures if the app is genuinely missing.",
        APP_INSTALL_ATTEMPTS,
    )
    return False
