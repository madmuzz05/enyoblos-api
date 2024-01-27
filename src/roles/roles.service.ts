import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
