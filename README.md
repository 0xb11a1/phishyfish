# PhishyFish ><(((º>

During one of the RedTeam assessments with my team, we wanted a quick way to bypass OTP for Microsoft Outlook. We wanted it to be manually operated and customized as we were doing targeted phishing attacks not only against Outlook but also VPN and other portals that support SSO, so I built quick Javascript code in a couple of hours to do that. The previous code had a lot of limitations. This project is the long-enhanced version of it.

**PhishyFish** is meant to be a framework, the `user_frontend` project is an example of how to implement the user interface and interact with the API. You can alter it or create your own project based on it.

[Demo](https://github.com/0xb11a1/phishyfish/assets/32736765/56fabb34-8860-495e-a994-62e4745bdeb5)

Now it come with a new look 

<img width="1427" alt="image" src="https://github.com/user-attachments/assets/8e8a814a-f968-4a97-9003-bc33818e826f" />
<img width="1072" alt="image" src="https://github.com/user-attachments/assets/f8009b33-1153-41ff-86e6-2011d12b79b8" />

# Features / TODO:

- [x] Add Auto_mode: will try to automate the the process of OTP grabbing and submitting
- [x] On Auto_mode: saving user cookies and taking a screenshot for office and outlook pages
- [x] simplify the installation process
- [x] Add caddy as a reverse proxy
- [x] Auto SSL generating using Let's Encrypt
- [ ] Add version history for all users submittion
- [ ] Add more features in Auto_mode
- [ ] Add ability to block IP address based on (IP|Region|resident/Server) - IP only is done
- [x] Better notification on slack
- [x] Rewrite auto_login to use playwright
- [X] Integrate cookie with cookie-editor
- [x] Host in subdirectory
- [ ] Add tracker id 
- [ ] Change the API calls to be server side only 
- [x] Rewrite the user_frontend in less stupid way - still some stupid stuff
- [ ] Write some Documentation
- [ ] Replace pull with websocket

# Installation

Make sure docker & docker-compose are installed in your system

Clone the project

```bash
git clone https://github.com/0xb11a1/phishyfish.git
cd phishyfish
```

Customization:
replace these two files to you coresponding target logo and wallpaper
`user_frontend/o365/public/company_background.jpeg`
`user_frontend/o365/public/company_logo.png`

Build and run the framework :

```bash
./start.sh [ -p password ] [ -s slack_webhookURL ] [-d domain_for_SSL_generation ] [-S internal ] 
```

- `-p` Password for the admin portal (Please make it a complex one)
- `-s` Slack bot URL, this is for receiving notifications when the user visits the website or submits his credentials.

  How to create one : https://www.svix.com/resources/guides/how-to-get-slack-webhook-url/

- `-d` Domain name to SSL certificate, if not set, `localhost` will be used.
- `-S` The subDirectory the application will be hosted on, this to avoids scanners that auto scans any new domain. if not set it will be hosted in /


# Development
To set the environment for development tun `./dev_prep.sh` then run all three projects manully

```bash
# user_frontend
cd user_frontend/o365
npm run dev -- --port 3006

# leet_frontend 
cd leet_frontend 
npm run dev -- --port 3005

# API
cd api
pip3 install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

