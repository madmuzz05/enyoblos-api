/*
  Warnings:

  - The `tglLahir` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "master"."User" DROP COLUMN "tglLahir",
ADD COLUMN     "tglLahir" DATE;
