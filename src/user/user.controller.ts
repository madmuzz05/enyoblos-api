import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FormDataRequest } from 'nestjs-form-data';
import { UserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('getUser')
  @FormDataRequest()
  getUser() {
    return this.userService.getUser();
  }

  @Get('findUser')
  findUser(@Param('idUser') idUser: string) {
    console.log(idUser);
    return this.userService.findUser(idUser);
  }
}
