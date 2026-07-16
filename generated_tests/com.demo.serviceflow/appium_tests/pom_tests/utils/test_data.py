"""Loads JSON test-data files from the suite's `data/` directory.

Generated tests keep workflow input values (amounts, names, form entries) in
`data/{feature}_data.json` instead of hardcoding them in the test body, so
values can be changed without touching test code. Credentials do NOT belong
here — they come from the environment via `utils.config.Credentials`.
"""
import json
from pathlib import Path

_DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def load_data(filename):
    """Loads and parses a JSON file from `data/` by name.

    Example: `load_data("credit_limit_data.json")`
    """
    path = _DATA_DIR / filename
    if not path.is_file():
        raise FileNotFoundError(
            f"Test data file not found: {path}. "
            f"Generated tests expect their input values in data/{filename}."
        )
    with open(path, encoding="utf-8") as f:
        return json.load(f)
