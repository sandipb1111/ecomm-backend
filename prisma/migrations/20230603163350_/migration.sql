/*
  Warnings:

  - You are about to drop the column `is_admin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_admin",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
