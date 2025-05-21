-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "is_deleted" BOOLEAN DEFAULT false,
ALTER COLUMN "is_active" SET DEFAULT true;
