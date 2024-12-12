import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { usersService } from './users.service';
import {  UsersController } from './users.controller';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            }
        ]),
    ],
    controllers: [UsersController],
    providers: [usersService],
    exports:[usersService],
})
export class UsersModule {}
