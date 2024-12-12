import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUser{


    @IsString()
    @MaxLength(255)
    nombre: string;

    @IsString()
    @MaxLength(255)
    apellido: string;

    @IsString()
    @MaxLength(255)
    @MinLength(8)
    matricula: string;

    @IsString()
    @MaxLength(255)
    grupo: string;

    @IsString()
    @MaxLength(255)
    salon: string;

    @IsString()
    @MaxLength(255)
    @MinLength(8)
    email: string;

    @IsString()
    @MaxLength(255)
    @MinLength(8)
    password: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsOptional()
    foto?: string;

}
