import { Post, Body, ValidationPipe, Get, Delete, Param, BadRequestException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensor } from './dto/create-sensor.dto';

@Controller('sensor')
export class SensorController {

	constructor( private sensorService: SensorService ){}

	@Post()
    async create( @Body( new ValidationPipe() ) createdRegister: CreateSensor ){
        return this.sensorService.create( createdRegister );
    }

    @Get()
    async findAll(){
        return this.sensorService.findAll();
    }

    //@Get(':id')
    //async findOne(@Param ('id') id: string){
    //    return this.sensorService.findOne(id);
    //}


    // @Get(':id')
    // async findOne(@Param ('id') id: string){
    //     return this.sensorService.findOne(id);
    // }


    @Delete(':id')
    async delete( @Param('id') id: string ){
        return this.sensorService.delete( id );
    }

    @Get("data")
    async data(){
        return this.sensorService.data();
    }


    @Get(":matricula")
    async user(@Param('matricula') matricula: string){
        return this.sensorService.findUserBymatricula(matricula);

    }

}
