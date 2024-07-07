# PhishyFish ><(((º>

During one of the RedTeam assessments with my team, we wanted a quick way to bypass OTP for Microsoft Outlook. We wanted it to be manually operated and customized as we were doing targeted phishing attacks not only against Outlook but also VPN and other portals that support SSO, so I built quick Javascript code in a couple of hours to do that. The previous code had a lot of limitations. This project is the long-enhanced version of it.

**PhishyFish** is meant to be a framework, the `user_frontend` project is an example of how to implement the user interface and interact with the API. You can alter it or create your own project based on it.

[Demo](https://github.com/0xb11a1/phishyfish/assets/32736765/56fabb34-8860-495e-a994-62e4745bdeb5)

# Features / TODO:

- [x] Add Auto_mode: will try to automate the the process of OTP grabbing and submitting
- [x] On Auto_mode: saving user cookies and taking a screenshot for office and outlook pages
- [x] simplify the installation process
- [x] Add caddy as a reverse proxy
- [x] Auto SSL generating using Let's Encrypt
- [ ] Add IP classification for detecting and preventing scanners
- [ ] Add version history for all users submittion
- [ ] Add more features in Auto_mode

# Installation

Make sure docker & docker-compose are installed in your system

Clone the project

```bash
git clone https://github.com/0xb11a1/phishyfish.git
cd phishyfish
```

Build and run the framework :

```bash
./start.sh [ -p password ] [ -s slack_webhookURL ] [-d domain_for_SSL_generation ]
```

- `-p` Password for the admin portal (Please make it a complex one)
- `-s` Slack bot URL, this is for receiving notifications when the user visits the website or submits his credentials.

  How to create one : https://www.svix.com/resources/guides/how-to-get-slack-webhook-url/

- `-d` Domain name to SSL certificate, if not set, `localhost` will be used.


- User portal at : https://localhost/
- Admin portal at : http://127.0.0.1:1337/
