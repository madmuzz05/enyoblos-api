import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UserDto } from "src/user/dto";

export class AuthDto extends UserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @MinLength(8)
    @IsNotEmpty()
    password:string
}
export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @MinLength(8)
    @IsNotEmpty()
    password:string
}


