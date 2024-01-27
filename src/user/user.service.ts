import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import { response } from 'express';

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

    return {data:model}
  }

  async findUser(@Param('idUser') idUser: string) {
    const model = await this.prisma.user.findUnique({
      where:{
        idUser: parseInt(idUser)
      },
      include:{
        organisasi:true
      }
    })
    if (model) {
      return {
        data: model
      }
    } else {
      throw new HttpException('Data Tidak Ditemukan', HttpStatus.NOT_FOUND)
    }
  }

  async updateUser(@Body() dto: UserDto) {

    const issetData = await this.prisma.user.findFirst({
      where:{
        idUser: parseInt(dto.idUser),
        organisasiId: parseInt(dto.organisasi_id)
      }
    })
    if (!issetData) {
      throw new HttpException('Data Tidak Ditemukan', HttpStatus.NOT_FOUND)
    }

    const issetEmail = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
        NOT:{
          idUser: parseInt(dto.idUser),
        }
      },
    })

    if (issetEmail) {
      throw new HttpException('Data sudah ada', HttpStatus.NOT_FOUND)
    }

    const str = dto.tgl_lahir
    const date = new Date(str)
    const model = await this.prisma.user.update({
      where:{
        idUser: parseInt(dto.idUser)
      },
      data:{
        nama: dto.nama,
        email: dto.email,
        jenisKelamin: dto.gender,
        noTelepon: dto.telepon,
        tglLahir: date,
        organisasiId: parseInt(dto.organisasi_id)
      }
    })

    return model

  }
}
