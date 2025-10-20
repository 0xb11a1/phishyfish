import requests
import json
import logging
import base64

logger = logging.getLogger("uvicorn")
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

with open("./config.json", "r") as f:
    CONFIG = json.load(f)


DEBUG = CONFIG["DEBUG"]


def messageAdmin(admin_message):
    # if DEBUG:
    #     print(f"messaging admin: {admin_message}")
    #     # return
    logging.log(logging.INFO, "messaging admin")
    try:
        requests.post(
            CONFIG["SLACK_URL"],
            json={"text": f"{admin_message}"},
            # headers={"Content-type": "application/json"},
        )
    except Exception as e:
        print(e)


def xorString(input, key="phishyfish"):
    input_dec = base64.b64decode(input)
    ans = ""
    for i in range(len(input_dec)):
        ans += chr(input_dec[i] ^ ord(key[i % len(key)]))

    return ans
