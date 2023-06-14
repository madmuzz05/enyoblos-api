import { Module } from '@nestjs/common';
import { OrganisasiController } from './organisasi.controller';
import { OrganisasiService } from './organisasi.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [PrismaModule, NestjsFormDataModule],
  controllers: [OrganisasiController],
  providers: [OrganisasiService],
})
export class OrganisasiModule {}
