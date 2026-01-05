/*
  Warnings:

  - Added the required column `noHp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "noHp" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user',
ADD COLUMN     "username" TEXT NOT NULL;
