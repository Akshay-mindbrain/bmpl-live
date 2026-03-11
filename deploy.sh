#!/bin/bash

# BMPL Live One-Click Deployment Script
# Domain: mindvex.cloud

echo "--------------------------------------------------------"
echo "Starting BMPL Live Deployment..."
echo "--------------------------------------------------------"

# 1. Detection: Check for Docker and Docker Compose
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    echo "Error: Docker Compose not found. Please install it first."
    exit 1
fi
echo "Using: $COMPOSE_CMD"

# 2. Check for .env file
if [ ! -f ".env" ]; then
    echo "Error: .env file not found in $(pwd)"
    exit 1
fi

# 3. Environment Variable Extraction (Robust)
DB_PASSWORD=$(grep '^DB_PASSWORD=' .env | cut -d '=' -f2- | tr -d '"'\'' ')
if [ -z "$DB_PASSWORD" ]; then echo "Error: DB_PASSWORD missing in .env"; exit 1; fi

# 4. Port Conflict Check (Informative)
if command -v ss &> /dev/null; then
    if ss -tuln | grep -E ":(80|443) " > /dev/null; then
        echo "WARNING: Port 80 or 443 is in use. If you see 'Welcome to nginx', this is why."
        echo "Attempting to stop host Nginx..."
        sudo systemctl stop nginx 2>/dev/null
    fi
fi

# 5. SSL Bootstrap (Dummy certs for Nginx to start)
CERT_PATH="./certbot/conf/live/mindvex.cloud"
if [ ! -f "$CERT_PATH/fullchain.pem" ]; then
    echo "Setting up dummy SSL certificates for initial boot..."
    mkdir -p "$CERT_PATH"
    openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
        -keyout "$CERT_PATH/privkey.pem" \
        -out "$CERT_PATH/fullchain.pem" \
        -subj "/CN=localhost"
fi

# 6. Start Core Services
echo "Starting Database and Admin Tools..."
$COMPOSE_CMD -f docker-compose.yml up -d db phpmyadmin

# 7. Wait for Database
echo "Waiting for database to be healthy..."
RETRY=0
until $COMPOSE_CMD -f docker-compose.yml exec db mysqladmin ping -h"localhost" -p"$DB_PASSWORD" --silent || [ $RETRY -eq 15 ]; do
    echo -n "."
    sleep 2
    RETRY=$((RETRY+1))
done

if [ $RETRY -eq 15 ]; then
    echo -e "\nError: Database failed to start. Check '$COMPOSE_CMD logs db'"
    exit 1
fi
echo -e "\nDatabase is ready!"

# 8. Start Everything Else
echo "Building and starting all application services..."
$COMPOSE_CMD -f docker-compose.yml build
$COMPOSE_CMD -f docker-compose.yml up -d

# 9. SSL Initialization Prompt
echo "--------------------------------------------------------"
echo "Final Step: Real SSL Installation"
echo "Ensure DNS for mindvex.cloud and subdomains point to this IP."
echo "--------------------------------------------------------"
read -p "Initialize REAL SSL now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    chmod +x ./nginx/certbot-init.sh
    ./nginx/certbot-init.sh
fi

echo "--------------------------------------------------------"
echo "Deployment Phase 1 Complete!"
echo "--------------------------------------------------------"
echo "Current Container Status:"
$COMPOSE_CMD -f docker-compose.yml ps
echo "--------------------------------------------------------"
echo "If any container is not 'Up', run: $COMPOSE_CMD logs <service_name>"
