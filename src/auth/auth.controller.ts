import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  @FormDataRequest()
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('signIn')
  @FormDataRequest()
  signIn(@Body() dto: LoginDto) {
    return this.authService.signIn(dto);
  }
}
