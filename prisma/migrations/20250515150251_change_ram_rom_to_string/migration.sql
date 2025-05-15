/*
  Warnings:

  - Changed the type of `ram` on the `Phone` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rom` on the `Phone` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_userId_fkey";

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "ram",
ADD COLUMN     "ram" TEXT NOT NULL,
DROP COLUMN "rom",
ADD COLUMN     "rom" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Ram";

-- DropEnum
DROP TYPE "Rom";

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
