import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(AuthGuard('jwt'))
export class RolesController {

    constructor(private roleService: RolesService){}

    @Get('getRoles')
    getRoles(){
        return this.roleService.getRoles();
    }
}
