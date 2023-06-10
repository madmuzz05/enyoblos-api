-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "master";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pemilihan";

-- CreateEnum
CREATE TYPE "pemilihan"."StatusPemilihan" AS ENUM ('inactive', 'active');

-- CreateTable
CREATE TABLE "master"."User" (
    "idUser" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jenisKelamin" TEXT,
    "noTelepon" TEXT,
    "tglLahir" DATE,
    "organisasiId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "idRole" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "organisasiId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("idRole")
);

-- CreateTable
CREATE TABLE "public"."modelHasRole" (
    "idHasRole" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "modelHasRole_pkey" PRIMARY KEY ("idHasRole")
);

-- CreateTable
CREATE TABLE "master"."Organisasi" (
    "idOrganisasi" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "shortName" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Organisasi_pkey" PRIMARY KEY ("idOrganisasi")
);

-- CreateTable
CREATE TABLE "pemilihan"."Pemilihan" (
    "idPemilihan" SERIAL NOT NULL,
    "organisasiId" INTEGER NOT NULL,
    "judul" TEXT NOT NULL,
    "subJudul" TEXT,
    "periodeTahun" TEXT NOT NULL,
    "statusPemilihan" "pemilihan"."StatusPemilihan" NOT NULL DEFAULT 'inactive',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Pemilihan_pkey" PRIMARY KEY ("idPemilihan")
);

-- CreateTable
CREATE TABLE "pemilihan"."Kandidat" (
    "idKandidat" SERIAL NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "foto" TEXT,
    "noUrut" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "pemilihanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Kandidat_pkey" PRIMARY KEY ("idKandidat")
);

-- CreateTable
CREATE TABLE "pemilihan"."hasilPemilihan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "organisasiId" INTEGER,
    "pemilihanId" INTEGER NOT NULL,
    "kandidatId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "hasilPemilihan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pemilihan_organisasiId_key" ON "pemilihan"."Pemilihan"("organisasiId");

-- AddForeignKey
ALTER TABLE "master"."User" ADD CONSTRAINT "User_organisasiId_fkey" FOREIGN KEY ("organisasiId") REFERENCES "master"."Organisasi"("idOrganisasi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role" ADD CONSTRAINT "Role_organisasiId_fkey" FOREIGN KEY ("organisasiId") REFERENCES "master"."Organisasi"("idOrganisasi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."modelHasRole" ADD CONSTRAINT "modelHasRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemilihan"."Pemilihan" ADD CONSTRAINT "Pemilihan_organisasiId_fkey" FOREIGN KEY ("organisasiId") REFERENCES "master"."Organisasi"("idOrganisasi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemilihan"."Kandidat" ADD CONSTRAINT "Kandidat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "master"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemilihan"."Kandidat" ADD CONSTRAINT "Kandidat_pemilihanId_fkey" FOREIGN KEY ("pemilihanId") REFERENCES "pemilihan"."Pemilihan"("idPemilihan") ON DELETE RESTRICT ON UPDATE CASCADE;
