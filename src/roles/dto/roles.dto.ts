import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class RolesDto{
    @IsString()
    @IsNotEmpty()
    nama:string

    @IsString()
    @IsNotEmpty()
    organisasiId:string

    @IsString()
    @IsOptional()
    id: string;
}