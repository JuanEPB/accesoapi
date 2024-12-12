import { Controller } from '@nestjs/common';
import { Post, Body, ValidationPipe, Get, Delete, Param, Put } from '@nestjs/common';
import { usersService } from './users.service';
import { CreateUser } from './dto/create_user.dto';
import { UpdateUser } from './dto/update_user.dto';
import { User } from './schema/users.schema';


@Controller('users')
export class UsersController {

    constructor(private usersService: usersService){}

        @Post()
        async create( @Body( new ValidationPipe() ) createdRegister: CreateUser){
            return this.usersService.create(createdRegister);
        }

        @Get()
        async findAll(){
            return this.usersService.findAll();
        }

        @Get('/:id')
        async findOne( @Param ('id') id: string){
            return await this.usersService.findOne(id);
        }


        @Put('update/:id')
        async findByIdAndUpdate(
            @Param ('id') id:string,
            @Body() updateUser: UpdateUser,
        )
        {
            return await this.usersService.update(id, updateUser)
        }

        @Delete(':id')
        async delete( @Param('id') id: string){
            return this.usersService.delete(id);       
        }

        // @Post('login')
        // async login(@Body('email') email: string, @Body('password') password: string){
        // return this.usersService.login(email, password);
        // }


        @Get('/data/:grupo')
        async countStudentsBySalon( @Param('grupo') grupo: string){
            return this.usersService.countStudentsBySalon(grupo);
        }

}
