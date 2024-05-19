import requests
import json
import logging

logger = logging.getLogger("uvicorn")
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

with open("./config.json", "r") as f:
    CONFIG = json.load(f)


DEBUG = True


def messageAdmin(admin_message):
    if DEBUG:
        return
    logging.log(logging.INFO, "messaging admin")
    try:
        r = requests.post(
            CONFIG["SLACK_URL"],
            json={"text": f"{admin_message}"},
            # headers={"Content-type": "application/json"},
        )
    except:
        pass
