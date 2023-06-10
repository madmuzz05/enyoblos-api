import { Body, HttpStatus, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService) {
  }
  getUser(@Body() dto: UserDto) {
    let data = {
      nama: dto.nama,
    }
    return {
      status: 200,
      info: 'Success',
      data: data
    };
  }

  findUser(@Param('idUser') idUser: string) {
    return {
      status: HttpStatus.OK,
      msg: 'oke',
      data: idUser
    };
  }
}
