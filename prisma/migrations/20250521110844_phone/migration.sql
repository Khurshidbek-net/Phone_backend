/*
  Warnings:

  - You are about to drop the column `productId` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "productId",
ADD COLUMN     "phoneId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "Phone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
