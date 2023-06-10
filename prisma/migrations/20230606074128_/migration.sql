-- CreateTable
CREATE TABLE "public"."Auth" (
    "idAuth" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("idAuth")
);
