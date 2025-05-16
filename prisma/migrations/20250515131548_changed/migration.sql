-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "is_creator" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,
    "login_attempts" INTEGER NOT NULL,
    "locked_until" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
