echo "[+] Generating the config files for Dev environment"
echo "[+] Admin portal password set to phishyfish"
cp api/example.config.json api/config.json
sed -i "s|SLACK_URL_PLACEHOLDER||g" api/config.json
sed -i "s/API_KEY_PLACEHOLDER/phishyfish/g"  api/config.json
sed -i "s/DEBUG_PLACEHOLDER/true/g"  api/config.json



echo "[+] using localhost domain"

cat ./caddy/Caddyfile_template | sed "s/DOMAIN_PLACEHOLDER/localhost/g" > ./caddy/Caddyfile
# cp leet_frontend/example.env.local leet_frontend/.env.local
curr_domain=127.0.0.1:8000
cat leet_frontend/example.env.local | sed "s|https://DOMAIN_PLACEHOLDER|http://$curr_domain|g" > leet_frontend/.env.local
cat user_frontend/o365/example.env.local | sed "s|https://DOMAIN_PLACEHOLDER|http://$curr_domain|g" > user_frontend/o365/.env.local


sub_dir_escaped="internal"
echo "[+] Hosting in /$sub_dir_escaped sub-directory"

echo "[+] Setting SubDir to internal"
sed -i "s/SUB_DIR_PLACEHOLDER/$sub_dir_escaped/g"  user_frontend/o365/.env.local

user_parm="redirect"
echo "[+] Setting user parameter to $user_parm"
sed -i "s/USER_PARAM_PLACEHOLDER/$user_parm/g"  user_frontend/o365/.env.local

echo "[+] Dev environment is set :) enjoy"
