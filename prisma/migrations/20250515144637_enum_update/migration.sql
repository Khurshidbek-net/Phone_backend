/*
  Warnings:

  - The values [GB_4,GB_6,GB_8,GB_12,GB_16,GB_24,GB_32,GB_64,GB_128] on the enum `Ram` will be removed. If these variants are still used in the database, this will fail.
  - The values [GB_4,GB_6,GB_8,GB_12,GB_16,GB_24,GB_32,GB_64,GB_128] on the enum `Rom` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Ram_new" AS ENUM ('4GB', '6GB', '8GB', '12GB', '16GB', '24GB', '32GB', '64GB', '128GB');
ALTER TABLE "Phone" ALTER COLUMN "ram" TYPE "Ram_new"[] USING ("ram"::text::"Ram_new"[]);
ALTER TYPE "Ram" RENAME TO "Ram_old";
ALTER TYPE "Ram_new" RENAME TO "Ram";
DROP TYPE "Ram_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Rom_new" AS ENUM ('4GB', '6GB', '8GB', '12GB', '16GB', '24GB', '32GB', '64GB', '128GB');
ALTER TABLE "Phone" ALTER COLUMN "rom" TYPE "Rom_new"[] USING ("rom"::text::"Rom_new"[]);
ALTER TYPE "Rom" RENAME TO "Rom_old";
ALTER TYPE "Rom_new" RENAME TO "Rom";
DROP TYPE "Rom_old";
COMMIT;
