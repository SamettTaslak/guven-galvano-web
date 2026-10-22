#!/usr/bin/env bash
# Sunucuda tek komutla kurulum / güncelleme:  bash scripts/server-install.sh
#   - deploy-data/server.env varsa .env olarak kullanılır (eski .env yedeklenir)
#   - imaj derlenir, konteynerler başlatılır, site açılana kadar beklenir
#   - deploy-data/content.sql varsa ve daha önce yüklenmediyse içerik yüklenir (bir kez)
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -f deploy-data/server.env ] && ! cmp -s deploy-data/server.env .env 2>/dev/null; then
  [ -f .env ] && cp .env ".env.bak.$(date +%Y%m%d%H%M%S)"
  cp deploy-data/server.env .env
  echo "✓ .env, deploy-data/server.env dosyasından alındı"
fi
[ -f .env ] || { echo "✗ .env yok: cp .env.production.example .env ve doldurun"; exit 1; }

PORT=$(grep -E '^WEB_PORT=' .env | cut -d= -f2 || true)
PORT=${PORT:-5081}

# Port başka bir konteyner tarafından kullanılıyorsa dur.
OTHER=$(docker ps --format '{{.Names}} {{.Ports}}' | grep -E "[:.]${PORT}->" | grep -v '^galvano-site-web ' || true)
if [ -n "$OTHER" ]; then
  echo "✗ ${PORT} portu başka bir konteyner tarafından kullanılıyor:"
  echo "  $OTHER"
  echo "  Önce onu durdurun:  docker stop <ad> && docker rm <ad>"
  exit 1
fi

docker compose up -d --build

echo "Site açılıyor (ilk açılışta veritabanı tabloları kurulur)..."
for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}/tr" || true)
  [ "$code" = "200" ] && break
  sleep 3
done
[ "${code:-}" = "200" ] || { echo "✗ Site yanıt vermedi. Kayıtlar: docker compose logs --tail 80 web"; exit 1; }
echo "✓ Site 127.0.0.1:${PORT} üzerinde çalışıyor"

if [ -f deploy-data/content.sql ] && [ ! -f deploy-data/.imported ]; then
  bash scripts/import-content.sh
  date > deploy-data/.imported
  for i in $(seq 1 40); do
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}/tr" || true)
    [ "$code" = "200" ] && break
    sleep 3
  done
  echo "✓ İçerik yüklendi"
fi

docker compose ps
echo
echo "Kontrol:  curl -I http://127.0.0.1:${PORT}/tr   |   Panel: \$SITE_URL/admin"
