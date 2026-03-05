FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /workspace
COPY package.json package-lock.json ./
COPY admin_backend/package.json admin_backend/package-lock.json ./admin_backend/
WORKDIR /workspace/admin_backend
RUN npm ci

FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /workspace
COPY --from=deps /workspace /workspace
COPY admin_backend/. ./admin_backend/
WORKDIR /workspace/admin_backend
RUN npx prisma generate --schema prisma/schema.prisma
RUN npm run build

FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
RUN addgroup -S nodejs && adduser -S app -G nodejs
COPY --from=builder /workspace/admin_backend/package*.json ./
COPY --from=builder /workspace/admin_backend/node_modules ./node_modules
COPY --from=builder /workspace/admin_backend/prisma ./prisma
COPY --from=builder /workspace/admin_backend/dist ./dist
USER app
EXPOSE 3000
CMD ["node", "dist/index.js"]
