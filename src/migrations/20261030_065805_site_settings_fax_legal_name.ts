import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "legal_name" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "fax" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_legal_name" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_fax" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "legal_name";
  ALTER TABLE "site_settings" DROP COLUMN "fax";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_legal_name";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_fax";`)
}
