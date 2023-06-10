-- AddForeignKey
ALTER TABLE "public"."Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "master"."User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
