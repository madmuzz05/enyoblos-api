import {
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNumberString()
  @IsNotEmpty()
  telepon: string;

  @IsString()
  @IsNotEmpty()
  tgl_lahir: Date;

  @IsNotEmpty()
  @IsNumberString()
  organisasi_id: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  idUser: string;
}
