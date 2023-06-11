import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrganisasiModule } from './organisasi/organisasi.module';
import { KandidatModule } from './kandidat/kandidat.module';
import { PemilihanModule } from './pemilihan/pemilihan.module';
import { HasilPemilihanModule } from './hasil-pemilihan/hasil-pemilihan.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    OrganisasiModule,
    KandidatModule,
    PemilihanModule,
    HasilPemilihanModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
