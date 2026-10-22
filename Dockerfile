# Güven Galvano Kimyasalları web sitesi (Payload CMS 3 + Next.js 16) — Linux konteyner imajı.
# Derlemek ve çalıştırmak için: docker compose up -d --build   (ayrıntılar docker-compose.yml ve README'de)

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- 1) Bağımlılıklar ------------------------------------------------------------------------------------
# Önce yalnızca paket dosyaları: kod değişmedikçe bu katman önbellekten gelir.
FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# ---- 2) Derleme ------------------------------------------------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Site adresi derleme sırasında sayfalara (robots, meta etiketleri) gömülür; compose SITE_URL'den verir.
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
    NEXT_TELEMETRY_DISABLED=1
# Derleme veritabanına bağlanmaz; yapılandırma yalnızca bu değişkenlerin varlığını kontrol eder.
RUN DATABASE_URL=postgres://build:build@127.0.0.1:5432/build \
    PAYLOAD_SECRET=build-time-placeholder-not-used-at-runtime \
    npm run build

# ---- 3) Çalışma ------------------------------------------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    INTERNAL_URL=http://127.0.0.1:3000 \
    MEDIA_DIR=/app/media \
    TZ=Europe/Istanbul

RUN apk add --no-cache tzdata \
 && addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Yüklenen medya (görseller, videolar) kalıcı birimde durur; yetkisiz "nextjs" kullanıcısı yazabilsin.
RUN mkdir -p /app/media /app/.next/cache && chown -R nextjs:nodejs /app/media /app/.next/cache

USER nextjs
EXPOSE 3000
VOLUME ["/app/media"]

# Açılışta bekleyen veritabanı migration'ları otomatik uygulanır (payload.config.ts → prodMigrations).
CMD ["node", "server.js"]
