#!/usr/bin/env bash
# Yereldeki içeriği (veritabanı kayıtları + yüklenen medya) sunucuya taşımak için paketler.
# Yerel bilgisayarda, proje klasöründe çalıştırın:  bash scripts/export-content.sh
# Çıktı: deploy-data/content.sql ve deploy-data/media.tar.gz  (git'e girmez; gizli bilgi içerir)
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p deploy-data

# Yalnızca veri: tablo yapısını sunucuda migration kurar. Migration kayıtları sunucunun kendi kaydıdır.
docker compose -f docker-compose.dev.yml exec -T postgres \
  pg_dump -U galvano -d galvano --data-only --disable-triggers --no-owner --no-privileges \
  --exclude-table-data=payload_migrations --exclude-table-data=payload_locked_documents \
  --exclude-table-data=payload_locked_documents_rels > deploy-data/content.sql

tar -czf deploy-data/media.tar.gz -C media .

echo "Hazır:"
ls -lh deploy-data
echo "Bu iki dosyayı sunucuda proje klasöründeki deploy-data/ altına kopyalayıp scripts/import-content.sh çalıştırın."
