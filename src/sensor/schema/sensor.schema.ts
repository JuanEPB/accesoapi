import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Sensor {


    @Prop()
    nombre: string;

    @Prop()
    matricula?: string;

    @Prop()
    correo:string;

    @Prop({ type:Date, default: Date.now })
    fecha: Date;

}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
