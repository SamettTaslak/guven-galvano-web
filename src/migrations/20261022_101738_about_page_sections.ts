import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_about_page_services_items_icon" AS ENUM('globe', 'ship', 'warehouse', 'truck', 'document', 'flask', 'handshake', 'shield', 'clock', 'package');
  CREATE TYPE "public"."enum__about_page_v_version_services_items_icon" AS ENUM('globe', 'ship', 'warehouse', 'truck', 'document', 'flask', 'handshake', 'shield', 'clock', 'package');
  ALTER TYPE "public"."enum_about_page_values_icon" ADD VALUE 'truck' BEFORE 'handshake';
  ALTER TYPE "public"."enum_about_page_values_icon" ADD VALUE 'document' BEFORE 'handshake';
  ALTER TYPE "public"."enum_about_page_values_icon" ADD VALUE 'flask' BEFORE 'handshake';
  ALTER TYPE "public"."enum_about_page_values_icon" ADD VALUE 'package';
  ALTER TYPE "public"."enum__about_page_v_version_values_icon" ADD VALUE 'truck' BEFORE 'handshake';
  ALTER TYPE "public"."enum__about_page_v_version_values_icon" ADD VALUE 'document' BEFORE 'handshake';
  ALTER TYPE "public"."enum__about_page_v_version_values_icon" ADD VALUE 'flask' BEFORE 'handshake';
  ALTER TYPE "public"."enum__about_page_v_version_values_icon" ADD VALUE 'package';
  CREATE TABLE "about_page_company_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_page_company_facts_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar
  );
  
  CREATE TABLE "about_page_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_services_items_icon" DEFAULT 'globe'
  );
  
  CREATE TABLE "about_page_services_items_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_sectors_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_page_sectors_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_company_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_company_facts_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__about_page_v_version_services_items_icon" DEFAULT 'globe',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_services_items_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_sectors_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_sectors_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "about_page_timeline_locales" ADD COLUMN "text" varchar;
  ALTER TABLE "about_page" ADD COLUMN "cta_image_id" integer;
  ALTER TABLE "about_page_locales" ADD COLUMN "company_eyebrow" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "company_title" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "company_body" jsonb;
  ALTER TABLE "about_page_locales" ADD COLUMN "services_eyebrow" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "services_title" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "services_intro" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "sectors_title" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "sectors_text" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "values_title" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "timeline_title" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "cta_title" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "cta_text" varchar;
  ALTER TABLE "_about_page_v_version_timeline_locales" ADD COLUMN "text" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_cta_image_id" integer;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_company_eyebrow" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_company_title" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_company_body" jsonb;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_services_eyebrow" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_services_title" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_services_intro" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_sectors_title" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_sectors_text" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_values_title" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_timeline_title" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_cta_title" varchar;
  ALTER TABLE "_about_page_v_locales" ADD COLUMN "version_cta_text" varchar;
  ALTER TABLE "about_page_company_facts" ADD CONSTRAINT "about_page_company_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_company_facts_locales" ADD CONSTRAINT "about_page_company_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_company_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_stats" ADD CONSTRAINT "about_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_stats_locales" ADD CONSTRAINT "about_page_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_services_items" ADD CONSTRAINT "about_page_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_services_items_locales" ADD CONSTRAINT "about_page_services_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_sectors_items" ADD CONSTRAINT "about_page_sectors_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_sectors_items_locales" ADD CONSTRAINT "about_page_sectors_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_sectors_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_company_facts" ADD CONSTRAINT "_about_page_v_version_company_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_company_facts_locales" ADD CONSTRAINT "_about_page_v_version_company_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_company_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_stats" ADD CONSTRAINT "_about_page_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_stats_locales" ADD CONSTRAINT "_about_page_v_version_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_services_items" ADD CONSTRAINT "_about_page_v_version_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_services_items_locales" ADD CONSTRAINT "_about_page_v_version_services_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_sectors_items" ADD CONSTRAINT "_about_page_v_version_sectors_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_sectors_items_locales" ADD CONSTRAINT "_about_page_v_version_sectors_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_sectors_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_company_facts_order_idx" ON "about_page_company_facts" USING btree ("_order");
  CREATE INDEX "about_page_company_facts_parent_id_idx" ON "about_page_company_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_company_facts_locales_locale_parent_id_unique" ON "about_page_company_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_stats_order_idx" ON "about_page_stats" USING btree ("_order");
  CREATE INDEX "about_page_stats_parent_id_idx" ON "about_page_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_stats_locales_locale_parent_id_unique" ON "about_page_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_services_items_order_idx" ON "about_page_services_items" USING btree ("_order");
  CREATE INDEX "about_page_services_items_parent_id_idx" ON "about_page_services_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_services_items_locales_locale_parent_id_unique" ON "about_page_services_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_sectors_items_order_idx" ON "about_page_sectors_items" USING btree ("_order");
  CREATE INDEX "about_page_sectors_items_parent_id_idx" ON "about_page_sectors_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_sectors_items_locales_locale_parent_id_unique" ON "about_page_sectors_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_company_facts_order_idx" ON "_about_page_v_version_company_facts" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_company_facts_parent_id_idx" ON "_about_page_v_version_company_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_company_facts_locales_locale_parent_id" ON "_about_page_v_version_company_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_stats_order_idx" ON "_about_page_v_version_stats" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_stats_parent_id_idx" ON "_about_page_v_version_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_stats_locales_locale_parent_id_unique" ON "_about_page_v_version_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_services_items_order_idx" ON "_about_page_v_version_services_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_services_items_parent_id_idx" ON "_about_page_v_version_services_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_services_items_locales_locale_parent_i" ON "_about_page_v_version_services_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_sectors_items_order_idx" ON "_about_page_v_version_sectors_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_sectors_items_parent_id_idx" ON "_about_page_v_version_sectors_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_sectors_items_locales_locale_parent_id" ON "_about_page_v_version_sectors_items_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_cta_image_id_media_id_fk" FOREIGN KEY ("version_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_page_cta_cta_image_idx" ON "about_page" USING btree ("cta_image_id");
  CREATE INDEX "_about_page_v_version_cta_version_cta_image_idx" ON "_about_page_v" USING btree ("version_cta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page_company_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_company_facts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_services_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_services_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_sectors_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_sectors_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_company_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_company_facts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_services_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_services_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_sectors_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_sectors_items_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_page_company_facts" CASCADE;
  DROP TABLE "about_page_company_facts_locales" CASCADE;
  DROP TABLE "about_page_stats" CASCADE;
  DROP TABLE "about_page_stats_locales" CASCADE;
  DROP TABLE "about_page_services_items" CASCADE;
  DROP TABLE "about_page_services_items_locales" CASCADE;
  DROP TABLE "about_page_sectors_items" CASCADE;
  DROP TABLE "about_page_sectors_items_locales" CASCADE;
  DROP TABLE "_about_page_v_version_company_facts" CASCADE;
  DROP TABLE "_about_page_v_version_company_facts_locales" CASCADE;
  DROP TABLE "_about_page_v_version_stats" CASCADE;
  DROP TABLE "_about_page_v_version_stats_locales" CASCADE;
  DROP TABLE "_about_page_v_version_services_items" CASCADE;
  DROP TABLE "_about_page_v_version_services_items_locales" CASCADE;
  DROP TABLE "_about_page_v_version_sectors_items" CASCADE;
  DROP TABLE "_about_page_v_version_sectors_items_locales" CASCADE;
  ALTER TABLE "about_page" DROP CONSTRAINT "about_page_cta_image_id_media_id_fk";
  
  ALTER TABLE "_about_page_v" DROP CONSTRAINT "_about_page_v_version_cta_image_id_media_id_fk";
  
  ALTER TABLE "about_page_values" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "about_page_values" ALTER COLUMN "icon" SET DEFAULT 'globe'::text;
  DROP TYPE "public"."enum_about_page_values_icon";
  CREATE TYPE "public"."enum_about_page_values_icon" AS ENUM('globe', 'ship', 'warehouse', 'handshake', 'shield', 'clock');
  ALTER TABLE "about_page_values" ALTER COLUMN "icon" SET DEFAULT 'globe'::"public"."enum_about_page_values_icon";
  ALTER TABLE "about_page_values" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_about_page_values_icon" USING "icon"::"public"."enum_about_page_values_icon";
  ALTER TABLE "_about_page_v_version_values" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_about_page_v_version_values" ALTER COLUMN "icon" SET DEFAULT 'globe'::text;
  DROP TYPE "public"."enum__about_page_v_version_values_icon";
  CREATE TYPE "public"."enum__about_page_v_version_values_icon" AS ENUM('globe', 'ship', 'warehouse', 'handshake', 'shield', 'clock');
  ALTER TABLE "_about_page_v_version_values" ALTER COLUMN "icon" SET DEFAULT 'globe'::"public"."enum__about_page_v_version_values_icon";
  ALTER TABLE "_about_page_v_version_values" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__about_page_v_version_values_icon" USING "icon"::"public"."enum__about_page_v_version_values_icon";
  DROP INDEX "about_page_cta_cta_image_idx";
  DROP INDEX "_about_page_v_version_cta_version_cta_image_idx";
  ALTER TABLE "about_page_timeline_locales" DROP COLUMN "text";
  ALTER TABLE "about_page" DROP COLUMN "cta_image_id";
  ALTER TABLE "about_page_locales" DROP COLUMN "company_eyebrow";
  ALTER TABLE "about_page_locales" DROP COLUMN "company_title";
  ALTER TABLE "about_page_locales" DROP COLUMN "company_body";
  ALTER TABLE "about_page_locales" DROP COLUMN "services_eyebrow";
  ALTER TABLE "about_page_locales" DROP COLUMN "services_title";
  ALTER TABLE "about_page_locales" DROP COLUMN "services_intro";
  ALTER TABLE "about_page_locales" DROP COLUMN "sectors_title";
  ALTER TABLE "about_page_locales" DROP COLUMN "sectors_text";
  ALTER TABLE "about_page_locales" DROP COLUMN "values_title";
  ALTER TABLE "about_page_locales" DROP COLUMN "timeline_title";
  ALTER TABLE "about_page_locales" DROP COLUMN "cta_title";
  ALTER TABLE "about_page_locales" DROP COLUMN "cta_text";
  ALTER TABLE "_about_page_v_version_timeline_locales" DROP COLUMN "text";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_cta_image_id";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_company_eyebrow";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_company_title";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_company_body";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_services_eyebrow";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_services_title";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_services_intro";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_sectors_title";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_sectors_text";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_values_title";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_timeline_title";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_cta_title";
  ALTER TABLE "_about_page_v_locales" DROP COLUMN "version_cta_text";
  DROP TYPE "public"."enum_about_page_services_items_icon";
  DROP TYPE "public"."enum__about_page_v_version_services_items_icon";`)
}
