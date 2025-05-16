-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "is_creator" DROP NOT NULL,
ALTER COLUMN "is_creator" SET DEFAULT false,
ALTER COLUMN "is_active" SET DEFAULT false,
ALTER COLUMN "refresh_token" DROP NOT NULL,
ALTER COLUMN "last_login" DROP NOT NULL,
ALTER COLUMN "login_attempts" DROP NOT NULL,
ALTER COLUMN "locked_until" DROP NOT NULL;
