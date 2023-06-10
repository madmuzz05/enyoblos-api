/*
  Warnings:

  - You are about to drop the `Organisasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kandidat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pemilihan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hasilPemilihan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modelHasRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "pemilihan"."status_pemilihan" AS ENUM ('inactive', 'active');

-- DropForeignKey
ALTER TABLE "master"."User" DROP CONSTRAINT "User_organisasiId_fkey";

-- DropForeignKey
ALTER TABLE "pemilihan"."Kandidat" DROP CONSTRAINT "Kandidat_pemilihanId_fkey";

-- DropForeignKey
ALTER TABLE "pemilihan"."Kandidat" DROP CONSTRAINT "Kandidat_userId_fkey";

-- DropForeignKey
ALTER TABLE "pemilihan"."Pemilihan" DROP CONSTRAINT "Pemilihan_organisasiId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Auth" DROP CONSTRAINT "Auth_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Role" DROP CONSTRAINT "Role_organisasiId_fkey";

-- DropForeignKey
ALTER TABLE "public"."modelHasRole" DROP CONSTRAINT "modelHasRole_roleId_fkey";

-- DropTable
DROP TABLE "master"."Organisasi";

-- DropTable
DROP TABLE "master"."User";

-- DropTable
DROP TABLE "pemilihan"."Kandidat";

-- DropTable
DROP TABLE "pemilihan"."Pemilihan";

-- DropTable
DROP TABLE "pemilihan"."hasilPemilihan";

-- DropTable
DROP TABLE "public"."Role";

-- DropTable
DROP TABLE "public"."modelHasRole";

-- DropEnum
DROP TYPE "pemilihan"."StatusPemilihan";

-- CreateTable
CREATE TABLE "master"."users" (
    "idUser" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jenisKelamin" TEXT,
    "noTelepon" TEXT,
    "tglLahir" DATE,
    "organisasiId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "idRole" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "organisasiId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("idRole")
);

-- CreateTable
CREATE TABLE "public"."model_has_roles" (
    "idHasRole" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "model_has_roles_pkey" PRIMARY KEY ("idHasRole")
);

-- CreateTable
CREATE TABLE "master"."organisasis" (
    "idOrganisasi" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "shortName" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "organisasis_pkey" PRIMARY KEY ("idOrganisasi")
);

-- CreateTable
CREATE TABLE "pemilihan"."pemilihans" (
    "idPemilihan" SERIAL NOT NULL,
    "organisasiId" INTEGER NOT NULL,
    "judul" TEXT NOT NULL,
    "subJudul" TEXT,
    "periodeTahun" TEXT NOT NULL,
    "statusPemilihan" "pemilihan"."status_pemilihan" NOT NULL DEFAULT 'inactive',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "pemilihans_pkey" PRIMARY KEY ("idPemilihan")
);

-- CreateTable
CREATE TABLE "pemilihan"."kandidats" (
    "idKandidat" SERIAL NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "foto" TEXT,
    "noUrut" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "pemilihanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "kandidats_pkey" PRIMARY KEY ("idKandidat")
);

-- CreateTable
CREATE TABLE "pemilihan"."hasil_pemilihans" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "organisasiId" INTEGER,
    "pemilihanId" INTEGER NOT NULL,
    "kandidatId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "hasil_pemilihans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "master"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pemilihans_organisasiId_key" ON "pemilihan"."pemilihans"("organisasiId");

-- AddForeignKey
ALTER TABLE "public"."Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "master"."users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master"."users" ADD CONSTRAINT "users_organisasiId_fkey" FOREIGN KEY ("organisasiId") REFERENCES "master"."organisasis"("idOrganisasi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."roles" ADD CONSTRAINT "roles_organisasiId_fkey" FOREIGN KEY ("organisasiId") REFERENCES "master"."organisasis"("idOrganisasi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."model_has_roles" ADD CONSTRAINT "model_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemilihan"."pemilihans" ADD CONSTRAINT "pemilihans_organisasiId_fkey" FOREIGN KEY ("organisasiId") REFERENCES "master"."organisasis"("idOrganisasi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemilihan"."kandidats" ADD CONSTRAINT "kandidats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "master"."users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemilihan"."kandidats" ADD CONSTRAINT "kandidats_pemilihanId_fkey" FOREIGN KEY ("pemilihanId") REFERENCES "pemilihan"."pemilihans"("idPemilihan") ON DELETE RESTRICT ON UPDATE CASCADE;
