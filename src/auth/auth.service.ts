import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { promises } from 'dns';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(@Body() dto: AuthDto) {
    const issetEmail = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
      include: {
        login: true,
      },
    });

    if (issetEmail) {
      throw new HttpException('Email tidak boleh sama', HttpStatus.NOT_FOUND);
    }

    const str = dto.tgl_lahir;
    const date = new Date(str);
    const model = await this.prisma.user.create({
      data: {
        nama: dto.nama,
        email: dto.email,
        jenisKelamin: dto.gender,
        noTelepon: dto.telepon,
        tglLahir: date,
        organisasiId: parseInt(dto.organisasi_id),
      },
    });

    if (model) {
      const auth = await this.prisma.auth.create({
        data: {
          email: model.email,
          password: await argon.hash(dto.password),
          userId: model.idUser,
        },
      });
    }

    return {
      status: 200,
      Info: 'Berhasil Menambahkan data',
      data: model,
    };
  }

  async signIn(@Body() dto: LoginDto) {
    const model = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
      include: {
        login: true,
      },
    });
    if (!model) {
      throw new HttpException(
        'User belum terdaftar kedalam sistem',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await argon.verify(model.login.password, dto.password))) {
      return {
        status: 200,
        Info: 'Gagal masuk kedalam sistem',
      };
    }

    await this.prisma.auth.update({
      where: {
        userId: model.idUser,
      },
      data: {
        password: await argon.hash(dto.password),
      },
    });

    delete model.login.password;

    const data = await this.signToken(model.idUser, model.email);

    return {
      status: 200,
      info: 'login berhasil',
      data: model,
      access_token: data,
    };
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secretConfig = this.config.get('JWT_SECRET');
    const generateToken = await this.jwt.signAsync(payload, {
      expiresIn: '50m',
      secret: secretConfig,
    });

    return generateToken;
  }
}
