ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "api_token" text DEFAULT '' NOT NULL;
UPDATE "users" SET "api_token" = '' WHERE "api_token" IS NULL;
