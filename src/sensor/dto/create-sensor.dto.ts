import { IsNotEmpty, IsString, IsOptional, IsDateString, IsEnum } from "class-validator";

export class CreateSensor{


    @IsDateString()
    @IsOptional()
    fecha?: Date;

    @IsString()
    matricula?: string;

    @IsString()
    nombre: string;

    @IsOptional()
    correo: string;
}
