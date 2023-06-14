import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class OrganisasiDto{
    @IsString()
    @IsNotEmpty()
    nama:string

    @IsString()
    @IsNotEmpty()
    shortname:string

    @IsNumber()
    @IsOptional()
    id: number;
}