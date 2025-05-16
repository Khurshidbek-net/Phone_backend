/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hashed_password]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_number_key" ON "Admin"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_hashed_password_key" ON "Admin"("hashed_password");
