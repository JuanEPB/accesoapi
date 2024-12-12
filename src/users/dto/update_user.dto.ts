import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class UpdateUser{


    @IsString()
    @MaxLength(255)
    @MinLength(8)
    nombre?: string;

    @IsString()
    @MaxLength(255)
    @MinLength(8)
    @IsOptional()
    apellido?: string;

    @IsString()
    @MaxLength(255)
    @MinLength(8)
    @IsOptional()
    matricula?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    @MinLength(8)
    grupo?: string;

    @IsString()
    @MaxLength(255)
    @MinLength(8)
    @IsOptional()
    salon?: string;

    @IsString()
    @MaxLength(255)
    @MinLength(8)
    @IsOptional()
    email?: string;

    @IsString()
    @MaxLength(255)
    @MinLength(8)
    @IsOptional()
    password?: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsOptional()
    foto?: string;

}
