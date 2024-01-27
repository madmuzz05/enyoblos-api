import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [PrismaModule, NestjsFormDataModule]
})
export class RolesModule {}
