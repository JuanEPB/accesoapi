import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { UpdateUser } from './dto/update_user.dto';
import { CreateUser } from './dto/create_user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class usersService {

    constructor(
        @InjectModel( User.name )
        private usersModel: Model<User>
    ){}

    async create( createUser: CreateUser ){
        const saltRound= 10;
        const hash =await bcrypt.hash(createUser.password, saltRound);
        const new_user = this.usersModel.create( {...createUser, password: hash} );
        return (await new_user).save(); 
    }

    async update( id: string, updateUser: UpdateUser ){
        if (updateUser.password) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(updateUser.password, saltOrRounds);
            updateUser.password = hash;
        }
        return await this.usersModel.findByIdAndUpdate( id, updateUser );
    }

    async findAll(){
        return await this.usersModel.find();
    }

    async findOne( id: string ){
        return await this.usersModel.findById(id).exec();
    }

    async delete( id: string ){
        return await this.usersModel.findByIdAndDelete(id).exec();
    }

    // async login ( email: string, password: string): Promise<User | null> {
    //     const user = await this.usersModel.findOne({email}).exec();
    //     const isPasswordValid = await bcrypt.compare(password, user.password);

    //     if (!user && !isPasswordValid) {
    //         throw new BadRequestException( 'Correo electronico o contraseña incorecto')
    //     }

    //     return user;
    // }

    async findByEmail(email: string) {
        return this.usersModel.findOne({ email }).exec();
    }

    async validatePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }

    async countStudentsBySalon(grupo: string): Promise<number> {
        const students = await this.usersModel.find({ grupo }).exec();
        console.log('Documentos encontrados:', students); // Verifica los resultados
        return students.length;
    }
    
    




  
  


}