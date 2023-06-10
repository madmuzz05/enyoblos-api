import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {
    }
    async signUp(@Body() dto: AuthDto) {

        const issetEmail = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            },
            include:{
                login:true
            }

        })

        if (issetEmail) {
            throw new HttpException('Email tidak boleh sama', HttpStatus.NOT_FOUND);
        }

        const str = dto.tgl_lahir
        const date = new Date(str);
        const model = await this.prisma.user.create({
            data: {
                nama: dto.nama,
                email: dto.email,
                jenisKelamin: dto.gender,
                noTelepon: dto.telepon,
                tglLahir: date,
                organisasiId: parseInt(dto.organisasi_id)
            },
        })

        if (model) {
            const auth = await this.prisma.auth.create({
                data: {
                    email: model.email,
                    password: await argon.hash(dto.password),
                    userId: model.idUser
                },
            })
        }

        return {
            status: 200,
            Info: 'Berhasil Menambahkan data',
            data: model
        }
    }

    async signIn(@Body() dto: LoginDto) {
        const model = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            },
            include:{
                login:true
            }

        })
        if (!model) {
            throw new HttpException('User belum terdaftar kedalam sistem', HttpStatus.NOT_FOUND);
        }

        if (!await argon.verify(model.login.password, dto.password)) {
            return {
                status: 200,
                Info: 'Gagal masuk kedalam sistem',
            }
        }

        await this.prisma.auth.update({
            where: {
                userId: model.idUser
            },
            data: {
                password: await argon.hash(dto.password)
            }
        })
        delete model.login.password

        return {
            status: 200,
            Info: 'Berhasil masuk kedalam sistem',
            data: model
        }
    }
}

