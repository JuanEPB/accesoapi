import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class User {

    @Prop({ required: true })
    nombre: string;
    
    @Prop()
    apellido: string;

    @Prop()
    matricula: string;

    @Prop()
    grupo: string;

    @Prop()
    salon: string;

    @Prop()
    email:string;

    @Prop()
    password: string;

    @Prop()
    foto: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
