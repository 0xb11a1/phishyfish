#!/bin/bash

echo "[+] crating docker network if not exit"
docker network create reverse_proxy_phishyfish

if [[ -z $1 ]];
then 
    echo "[+] using localhostdomain"
    curr_domain=localhost
else
    echo "[+] using $1 domain"
    curr_domain=$1
fi

cat ./caddy/Caddyfile_template | sed "s/DOMAIN_PLACEHOLDER/$curr_domain/g" > ./caddy/Caddyfile

echo "[+] Starting the docker"
docker-compose up --build --remove-orphans