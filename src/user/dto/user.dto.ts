import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsNumberString()
  telepon: string;

  @IsNotEmpty()
  @IsString()
  tgl_lahir: Date;

  @IsNotEmpty()
  @IsNumberString()
  organisasi_id: string;
}
