#!/bin/bash

# Configuration
DOMAINS=("mindvex.cloud" "admin.mindvex.cloud" "api-user.mindvex.cloud" "api-admin.mindvex.cloud")
EMAIL="admin@mindvex.cloud" # Replace with your email
STAGING=0 # Set to 1 for testing

if [ -d "/etc/letsencrypt/live/${DOMAINS[0]}" ]; then
  echo "Certificates already exist. Running renewal check..."
  certbot renew
  exit 0
fi

# Request certificates
echo "Requesting Let's Encrypt certificates for: ${DOMAINS[*]}..."
certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL --agree-tos --no-eff-email \
    $(for d in "${DOMAINS[@]}"; do echo -n "-d $d "; done) \
    $(if [ $STAGING -ne 0 ]; then echo "--staging"; fi)

# Reload Nginx
echo "Reloading Nginx..."
docker compose exec nginx nginx -s reload
