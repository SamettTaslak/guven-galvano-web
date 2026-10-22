#!/usr/bin/env bash
# deploy-data/ altındaki içeriği sunucudaki konteynerlere yükler. MEVCUT İÇERİĞİN YERİNE GEÇER.
# Sunucuda, proje klasöründe (docker compose up -d --build sonrası) çalıştırın:  bash scripts/import-content.sh
set -euo pipefail
cd "$(dirname "$0")/.."
[ -f deploy-data/content.sql ] || { echo "deploy-data/content.sql bulunamadı"; exit 1; }

echo "Tablo yapısının kurulmasını bekliyor..."
for i in $(seq 1 60); do
  n=$(docker compose exec -T db psql -U galvano -d galvano -tAc "select count(*) from information_schema.tables where table_name='payload_migrations'" || echo 0)
  [ "$n" = "1" ] && break
  sleep 3
done

docker compose stop web

# Migration kaydı dışındaki tüm tabloları boşalt, sonra veriyi yükle.
docker compose exec -T db psql -U galvano -d galvano -v ON_ERROR_STOP=1 -c "
DO \$\$ DECLARE t text; BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename <> 'payload_migrations' LOOP
    EXECUTE format('TRUNCATE TABLE public.%I RESTART IDENTITY CASCADE', t);
  END LOOP;
END \$\$;"
docker compose exec -T db psql -U galvano -d galvano -v ON_ERROR_STOP=1 -q < deploy-data/content.sql

if [ -f deploy-data/media.tar.gz ]; then
  docker compose run --rm --no-deps -T --entrypoint tar web -xzf - -C /app/media < deploy-data/media.tar.gz
fi

docker compose start web
echo "İçerik yüklendi. Kontrol: docker compose logs -f web"
