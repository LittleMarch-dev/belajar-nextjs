# Stage Builder
FROM node:20-alpine AS builder
# Perbaikan: Gunakan --no-cache
RUN apk add --no-cache libc6-compat 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage Runtime
FROM node:20-alpine AS runner
# Tambahkan juga di sini agar runtime stabil
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]