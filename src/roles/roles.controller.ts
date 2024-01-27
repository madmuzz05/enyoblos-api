import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesService } from './roles.service';
import { FormDataRequest } from 'nestjs-form-data';
import { RolesDto } from './dto';

@Controller('roles')
@UseGuards(AuthGuard('jwt'))
export class RolesController {

    constructor(private roleService: RolesService){}

    @Get('getRoles')
    getRoles(){
        return this.roleService.getRoles();
    }

    @Get('findRole/:id')
    findRole(@Param('id') id:string){
        return this.roleService.findRole(id);
    }

    @Post('deleteRole/:id')
    deleteRole(@Param('id') id:string){
        return this.roleService.deleteRole(id)
    }

    @Post('storeRole')
    @FormDataRequest()
    storeRole(@Body() dto:RolesDto){
        return this.roleService.storeRole(dto)
    }
}
