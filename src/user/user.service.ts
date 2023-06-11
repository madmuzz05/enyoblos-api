import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser() {
    const model = await this.prisma.user.findMany({
      include: {
        organisasi: true,
      },
    });
    if (!model) {
      throw new HttpException('Data user tidak ada', HttpStatus.NOT_FOUND);
    }

    return {
      status: 200,
      info: 'Success',
      data: model,
    };
  }

  findUser(@Param('idUser') idUser: string) {
    return {
      status: HttpStatus.OK,
      msg: 'oke',
      data: idUser,
    };
  }
}
