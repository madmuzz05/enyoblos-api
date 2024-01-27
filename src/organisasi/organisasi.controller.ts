import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrganisasiService } from './organisasi.service';
import { OrganisasiDto } from './dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';

@Controller('organisasi')
@UseGuards(AuthGuard('jwt'))
export class OrganisasiController {
    constructor(private organisasiService: OrganisasiService){}
    @Get('getOrganisasi')
    getOrganisasi(){
        return this.organisasiService.getOrganisasi();
    }

    @Get('findOrganisasi/:id')
    findOrganisasi(@Param('id') id:string){
        return this.organisasiService.findOrganisasi(id);
    }

    @Post('deleteOrganisasi/:id')
    deleteOrganisasi(@Param('id') id:string){
        return this.organisasiService.deleteOrganisasi(id);
    }

    @Post('storeOrganisasi')
    @FormDataRequest()
    storeOrganisasi(@Body() dto:OrganisasiDto){
        return this.organisasiService.storeOrganisasi(dto);
    }

}
