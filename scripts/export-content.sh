#!/usr/bin/env bash
# Yereldeki içeriği (veritabanı kayıtları + yüklenen medya) sunucuya taşımak için paketler.
# Yerel bilgisayarda, proje klasöründe çalıştırın:  bash scripts/export-content.sh
# Çıktı: deploy/content/content.sql ve deploy/content/media/  (git'e girer, sunucu git pull ile alır)
# Kullanıcılar, oturumlar, panel tercihleri ve e-posta ayarları pakete girmez: bunlar sunucunun kendi verisidir.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=deploy/content
# Yalnızca yerel geliştirme veritabanından paketlenir; sunucuda çalıştırılırsa paketi bozmadan çıkar.
[ -f docker-compose.dev.yml ] && docker compose -f docker-compose.dev.yml ps -q postgres | grep -q . \
  || { echo "✗ Yerel geliştirme veritabanı çalışmıyor. Bu betik sunucuda değil, yerel bilgisayarda çalıştırılır."; exit 1; }
mkdir -p "$OUT"
TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

# Yalnızca veri: tablo yapısını sunucuda migration kurar.
docker compose -f docker-compose.dev.yml exec -T postgres \
  pg_dump -U galvano -d galvano --data-only --disable-triggers --no-owner --no-privileges \
  --exclude-table-data=payload_migrations --exclude-table-data=payload_locked_documents \
  --exclude-table-data=payload_locked_documents_rels --exclude-table-data=payload_kv \
  --exclude-table-data=users --exclude-table-data=users_sessions \
  --exclude-table-data=payload_preferences --exclude-table-data=payload_preferences_rels \
  --exclude-table-data=email_settings \
  | grep -v -E '^-- (Dumped|Started|Completed)|^\\(un)?restrict ' \
  | grep -v -E "setval\('public\.(users|users_sessions|payload_preferences|payload_preferences_rels|email_settings|payload_kv)_" \
  > "$TMP"
grep -q '^COPY public.products ' "$TMP" || { echo "✗ Döküm eksik görünüyor; paket değiştirilmedi."; exit 1; }
mv "$TMP" "$OUT/content.sql"

rm -rf "$OUT/media"
cp -r media "$OUT/media"

echo "Hazır: $OUT ($(du -sh "$OUT" | cut -f1))"
echo "git add deploy/content && git commit && git push; sunucuda: git pull && bash scripts/server-install.sh"
