import { Body, HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesDto } from './dto';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService){}

    async getRoles(){
        const model = await this.prisma.role.findMany()

        return {data:model}
    }

    async findRole(@Param('id') id:string){
        const  model = await this.prisma.role.findFirst({
            where:{
                idRole: parseInt(id)
            }
        })

        return {data:model}
    }

    async storeRole(@Body() dto:RolesDto) {
        const issetData = await this.prisma.role.findFirst({
            where:{
                organisasiId: parseInt(dto.organisasiId),
                nama: dto.nama
            }
        });

        if (issetData) {
            throw new HttpException('Nama sudah digunakan!', HttpStatus.NOT_FOUND)
        }

        if (dto.id) {
            const model = await this.prisma.role.update({
                where:{
                    idRole:parseInt(dto.id)
                },
                data:{
                    nama: dto.nama,
                    organisasiId: parseInt(dto.organisasiId)
                }
            })

            if (!model) {
                throw new HttpException('Gagal mengupdate data', HttpStatus.NOT_FOUND)
            } else {
                const model = await this.prisma.role.create({
                    data:{
                        nama:dto.nama,
                        organisasiId:parseInt(dto.organisasiId)
                    }
                })

                if (!model) {
                    throw new HttpException('Gagal menambahkan data', HttpStatus.NOT_FOUND)
                }
            }

            const issetData = await this.prisma.role.findFirst({
                where:{
                    organisasiId: parseInt(dto.organisasiId),
                    nama: dto.nama
                }
            });

            return {data:model}
            
        }
    }

    async deleteRole(@Param('id') id:string){
        const issetData = await this.prisma.role.findFirst({
            where:{
                idRole: parseInt(id)
            }
        });

        if (!issetData) {
            throw new HttpException('Gagal menghapus, data tidak ada', HttpStatus.NOT_FOUND)
        }

        await this.prisma.role.delete({
            where:{
                idRole: parseInt(id)
            }
        });

        return {msg:'Berhasil Menghapus data'}
    }
}
