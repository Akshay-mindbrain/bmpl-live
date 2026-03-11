# Setup Config

This folder contains service-specific setup definitions while keeping one shared `.env` at repository root.

## Files

- `user.config.ts`: user service defaults (port + cookie names)
- `admin.config.ts`: admin service defaults (port + cookie names)

Use root scripts from `package.json` for local development and DB setup.
