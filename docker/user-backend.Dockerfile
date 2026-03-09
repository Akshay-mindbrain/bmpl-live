FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /workspace
COPY package.json package-lock.json ./
COPY user_backend/package.json user_backend/package-lock.json ./user_backend/
WORKDIR /workspace/user_backend
RUN npm ci

FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /workspace
COPY --from=deps /workspace /workspace
COPY user_backend/. ./user_backend/
WORKDIR /workspace/user_backend
RUN npx prisma generate --schema prisma/schema.prisma
RUN npm run build

FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
RUN addgroup -S nodejs && adduser -S app -G nodejs
COPY --from=builder /workspace/user_backend/package*.json ./
COPY --from=builder /workspace/user_backend/node_modules ./node_modules
COPY --from=builder /workspace/user_backend/prisma ./prisma
COPY --from=builder /workspace/user_backend/dist ./dist
USER app
EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy --schema prisma/schema.prisma && node dist/index.js"]
