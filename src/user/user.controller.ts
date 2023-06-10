import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { FormDataRequest } from 'nestjs-form-data';
import { UserDto } from './dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Post('getUser')
    @FormDataRequest()
    getUser(@Body() dto: UserDto) {
        return this.userService.getUser(dto);
    }

    @Get('findUser')
    findUser(@Param('idUser') idUser:string){
        console.log(idUser);
        return this.userService.findUser(idUser);
    }
}
