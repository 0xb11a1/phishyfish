#!/bin/bash


# API_KEY=`head -c 16 /dev/random | xxd -p  | tr -d "\n"`
# SLACK_URL=``

usage() { 
    RED='\033[0;31m'
    Blue='\033[0;34m'
    NC='\033[0m' 
  echo -e "${RED}PhishyFish${NC} ${Blue}><(((º> ${NC} \nUsage: $0 [ -p password ] [ -s slack_webhookURL ] [-d domain_for_SSL_generation ]" 
}
exit_abnormal() {
  usage
  exit 1
}


while getopts "p:s:d:h:" flag
do
            case "${flag}" in
                p) password=${OPTARG};;
                s) slack_URL=${OPTARG};;
                d) website_domain=${OPTARG};;
                :) exit_abnormal;;
                *) exit_abnormal;;
            esac
done
if [[ -z $password  ]]; then
    echo "hmmmmmmmmmmm, nice empty password, but you need one to not get hacked"
    exit_abnormal
fi

echo "[+] Generating the config files"
cat api/example.config.json | sed -e "s/SLACK_URL/$slack_URL/g" -e "s/API_KEY_PLACEHOLDER/$password/g" > api/config.json
cp leet_frontend/example.env.local leet_frontend/.env.local
cp user_frontend/example.env.local user_frontend/.env.local

# echo using $password $slack_URL $website_domain

if [[ -z $website_domain  ]];
then 
    echo "[+] using localhost domain"
    curr_domain=localhost
else
    echo "[+] using $website_domain domain"
    curr_domain=$website_domain
fi

cat ./caddy/Caddyfile_template | sed "s/DOMAIN_PLACEHOLDER/$curr_domain/g" > ./caddy/Caddyfile


echo "[+] crating docker network if not exit"
docker network create reverse_proxy_phishyfish
echo "[+] Starting the docker"
docker-compose up --build --remove-orphans