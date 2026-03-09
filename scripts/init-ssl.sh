#!/bin/bash

# Configuration
DOMAINS=("bmpl.thembi.in" "admin.bmpl.thembi.in")
EMAIL="akshay@example.com" # Should ideally be pulled from .env
STAGING=0 # Set to 1 if you're testing to avoid hit limits

if [ -f .env ]; then
    export $(cat .env | xargs)
    EMAIL=$LETSENCRYPT_EMAIL
fi

echo "### Starting SSL Initialization for ${DOMAINS[*]} ###"

# Create dummy certificates so Nginx can start
for domain in "${DOMAINS[@]}"; do
  path="/etc/letsencrypt/live/$domain"
  mkdir -p "docker/nginx/certbot/conf/live/$domain"
  if [ ! -f "docker/nginx/certbot/conf/live/$domain/fullchain.pem" ]; then
    echo "### Generating dummy certificate for $domain ###"
    openssl req -x509 -nodes -newkey rsa:2048 -days 1\
      -keyout "docker/nginx/certbot/conf/live/$domain/privkey.pem" \
      -out "docker/nginx/certbot/conf/live/$domain/fullchain.pem" \
      -subj "/CN=localhost"
  fi
done

echo "### Starting nginx ###"
docker-compose up -d nginx

# Delete dummy certificates
for domain in "${DOMAINS[@]}"; do
  echo "### Deleting dummy certificate for $domain ###"
  rm -rf "docker/nginx/certbot/conf/live/$domain"
done

# Request real certificates
for domain in "${DOMAINS[@]}"; do
  echo "### Requesting Let's Encrypt certificate for $domain ###"
  
  staging_arg=""
  if [ $STAGING -eq 1 ]; then staging_arg="--staging"; fi

  docker-compose run --rm certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    --email $EMAIL \
    -d $domain \
    --rsa-key-size 4096 \
    --agree-tos \
    --force-renewal \
    --non-interactive
done

echo "### Reloading nginx ###"
docker-compose exec nginx nginx -s reload
