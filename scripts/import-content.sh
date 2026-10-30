#!/usr/bin/env bash
# deploy/content/ altındaki içeriği sunucudaki konteynerlere yükler. SİTE İÇERİĞİNİN YERİNE GEÇER.
# Kullanıcılar, oturumlar, panel tercihleri ve e-posta ayarları korunur.
# Sunucuda, proje klasöründe (docker compose up -d --build sonrası) çalıştırın:  bash scripts/import-content.sh
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=deploy/content
[ -f "$SRC/content.sql" ] || { echo "$SRC/content.sql bulunamadı"; exit 1; }

echo "Tablo yapısının kurulmasını bekliyor..."
for i in $(seq 1 60); do
  n=$(docker compose exec -T db psql -U galvano -d galvano -tAc "select count(*) from information_schema.tables where table_name='payload_migrations'" || echo 0)
  [ "$n" = "1" ] && break
  sleep 3
done

docker compose stop web

# Sunucuya ait tablolar dışındakileri boşalt, sonra veriyi yükle.
docker compose exec -T db psql -U galvano -d galvano -v ON_ERROR_STOP=1 -c "
DO \$\$ DECLARE l text; BEGIN
  SELECT string_agg(format('public.%I', tablename), ', ') INTO l FROM pg_tables WHERE schemaname='public' AND tablename NOT IN
    ('payload_migrations','users','users_sessions','payload_preferences','payload_preferences_rels','email_settings','payload_kv');
  EXECUTE 'TRUNCATE TABLE ' || l || ' RESTART IDENTITY';
END \$\$;"
docker compose exec -T db psql -U galvano -d galvano -v ON_ERROR_STOP=1 -q < "$SRC/content.sql"

if [ -d "$SRC/media" ]; then
  tar -cf - -C "$SRC/media" . | docker compose run --rm --no-deps -T --entrypoint tar web -xf - -C /app/media
fi

docker compose start web
echo "İçerik yüklendi. Kontrol: docker compose logs -f web"
