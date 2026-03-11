# ---------- BUILDER ----------
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate --schema prisma/schema.prisma
RUN npm run build

# ---------- INSTALLER ----------
FROM node:22-alpine AS installer

RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
RUN npm ci --omit=dev

# ---------- RUNNER ----------
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs

COPY --from=installer /app ./
USER expressjs

CMD ["npm", "run", "docker-start"]
