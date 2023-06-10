/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Auth_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "public"."Auth"("userId");
