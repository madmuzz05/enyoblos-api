import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [PrismaModule, NestjsFormDataModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
