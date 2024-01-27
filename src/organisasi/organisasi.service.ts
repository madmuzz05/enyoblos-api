import { Body, HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganisasiDto } from './dto';

@Injectable()
export class OrganisasiService {
    constructor(private prisma: PrismaService){}
    async getOrganisasi(){
        const model = await this.prisma.organisasi.findMany()
        if (!model) {
            throw new HttpException('Data organisasi tidak ada', HttpStatus.NOT_FOUND);
        }
        return {data:model}
    }

    async findOrganisasi(@Param('id') id:string){
        const model = await this.prisma.organisasi.findFirst({
            where:{
                idOrganisasi: parseInt(id)
            }
        })
        if (!model) {
            throw new HttpException('Data organisasi tidak ditemukan', HttpStatus.NOT_FOUND);
        }

        return {data:model}
    }

    async storeOrganisasi(@Body() dto:OrganisasiDto){
        const issetShortname = await this.prisma.organisasi.findFirst({
            where:{
                shortName:dto.shortname
            }
        })
        if (issetShortname) {
            throw new HttpException('Shortname sudah digunakan!', HttpStatus.NOT_FOUND)
        }
        if (dto.id) {
            const model = await this.prisma.organisasi.update({
                where:{
                    idOrganisasi:parseInt(dto.id)
                },
                data:{
                    nama:dto.nama,
                    shortName:dto.shortname
                }
            })
            if (!model) {
                throw new HttpException('Gagal menambahkan data', HttpStatus.NOT_FOUND)
            }
        } else {
            const model = await this.prisma.organisasi.create({
                data:{
                    nama:dto.nama,
                    shortName:dto.shortname
                }
            })
            if (!model) {
                throw new HttpException('Gagal menambahkan data', HttpStatus.NOT_FOUND)
            }
        }
        const model = await this.prisma.organisasi.findFirst({
            where:{
                shortName:dto.shortname
            }
        })

        return {data:model}


    }

    async deleteOrganisasi(@Param('id') id:string){
        const issetData = await this.prisma.organisasi.findUnique({
            where:{
                idOrganisasi:parseInt(id)
            }
        })
        if (!issetData) {
            throw new HttpException('Gagal menghapus, data tidak ada', HttpStatus.NOT_FOUND)
        }
        const model = await this.prisma.organisasi.delete({
            where:{
                idOrganisasi:parseInt(id)
            }
        })
        return {msg:'Berhasil Menghapus data'}
    }
}
