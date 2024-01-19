# PhishyFish ><(((º>

During one of the RedTeam assessments with my team, we wanted a quick way to bypass OTP for Microsoft Outlook. We wanted it to be manually operated and customized as we were doing targeted phishing attacks not only against Outlook but also VPN and other portals that support SSO, so I built quick Javascript code in a couple of hours to do that. The previous code had a lot of limitations. This project is the long-enhanced version of it.

**PhishyFish** is meant to be a framework, the `user_frontend` project is an example of how to implement the user interface and interact with the API. You can alter it or create your own project based on it.

[Demo](https://github.com/0xb11a1/phishyfish/assets/32736765/56fabb34-8860-495e-a994-62e4745bdeb5)

# Installation

Clone the project

```bash
git clone https://github.com/0xb11a1/phishyfish.git
cd phishyfish
```

### Creating config files

There are 3 projects inside, each one has its own config

#### For API

```bash
cp api/example.config.json  api/config.json
```

Inside `config.json`

- Replace `API_KEY` with a random key, this is used for authentication in the admin portal.
  - Quick way to generate random string `head -c 16 /dev/random | xxd -p`
- [OPTIONAL]Replace `SLACK_URL` with your slack bot URL, this is for receiving notifications when the user visits the website or submits his credentials.
  - https://www.svix.com/resources/guides/how-to-get-slack-webhook-url/

#### For leet-frontend

```bash
cp leet_frontend/example.env.local leet_frontend/.env.local
```

#### For user_frontend

```bash
cp user_frontend/example.env.local user_frontend/.env.local
```

Building and starting the docker

```bash
docker-compose up --build
```

- Admin portal at : http://127.0.0.1:1337/
- User portal at : http://127.0.0.1:8080/
- API at : http://127.0.0.1:8000/
