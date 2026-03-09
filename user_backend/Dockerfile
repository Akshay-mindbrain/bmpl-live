# ---------- BUILDER ----------
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client here (dev deps still exist)
RUN npx prisma generate

RUN npm run build


# ---------- RUNNER ----------
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs

# Copy only necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

USER expressjs

CMD ["npm", "run", "docker-start"]