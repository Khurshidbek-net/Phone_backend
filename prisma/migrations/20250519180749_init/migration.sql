/*
  Warnings:

  - Made the column `login_attempts` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "login_attempts" SET NOT NULL;
