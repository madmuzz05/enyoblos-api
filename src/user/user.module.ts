import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [PrismaModule, NestjsFormDataModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
