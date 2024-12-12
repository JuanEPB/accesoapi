import { Injectable } from '@nestjs/common';
import { Sensor } from './schema/sensor.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSensor } from './dto/create-sensor.dto';

@Injectable()
export class SensorService {
    constructor(
        @InjectModel(Sensor.name) private sensorModel: Model<Sensor>
    ) {}

    async create(sensor: CreateSensor) {
        const createdRegister = new this.sensorModel(sensor);
        return await createdRegister.save();
    }

    async findAll() {
        return await this.sensorModel.find().exec();
    }

    async delete(id: string) {
        return await this.sensorModel.findByIdAndDelete(id).exec();
    }


    async findEstado(estado: string) {
        return await this.sensorModel.countDocuments({ estado }).exec();
    }

    async findEstados() {
        const asistencia = await this.findEstado('asistencia');
        const inasistencia = await this.findEstado('inasistencia');
        return { asistencia, inasistencia };
    }

    async findUserBymatricula(matricula: string){

        return await this.sensorModel.find( {matricula: matricula} ).exec();
    }

    // async findUserByTags() {
    //     const numberTag1 = await this.findUserByTag('23CC5C10');
    //     const numberTag2 = await this.findUserByTag('9038CD26');
    //     const numberTag3 = await this.findUserByTag('C9CEE314');
    //     const numberTag4 = await this.findUserByTag('038E58A6');
    //     return { numberTag1, numberTag2, numberTag3, numberTag4 };
    // }


    async findDays(find: string) {
        switch (find) {
            case 'today':
                const today = new Date();
                return await this.findDataOfDays(today);
            case 'yesterday':
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return await this.findDataOfDays(yesterday);
            case 'beforeYesterday':
                const beforeYesterday = new Date();
                beforeYesterday.setDate(beforeYesterday.getDate() - 2);
                return await this.findDataOfDays(beforeYesterday);
            case 'lastweek':
                const lastweek = new Date();
                lastweek.setDate(lastweek.getDate() - 7);
                return await this.findDataOfDays(lastweek);
        }
    }

    async findDataOfDays(data: Date) {
        const startOfDay = new Date(data);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(data);
        endOfDay.setHours(23, 59, 59, 999);

        const records = await this.sensorModel.find({
            fecha: { $gte: startOfDay, $lte: endOfDay }
        });

        return records;
    }

    async findIngresoPorDia() {
        const today = await this.findDays('today');
        const yesterday = await this.findDays('yesterday');
        const beforeYesterday = await this.findDays('beforeYesterday');
        const lastweek = await this.findDays('lastweek');

        return [
            { date: 'Today', count: today.length },
            { date: 'Yesterday', count: yesterday.length },
            { date: 'Before Yesterday', count: beforeYesterday.length },
            { date: 'Last Week', count: lastweek.length }
        ];
    }


    // Nuevo método: Asistencias del día
    async getAsistenciasDelDia(): Promise<number> {
        const today = await this.findDays('today');
        return today.length; // Devuelve el número total de registros de hoy
    }


    async data() {
        const asistenciasHoy = await this.getAsistenciasDelDia();
        const ingresoPorDia = await this.findIngresoPorDia();



        return {
            asistenciasHoy,
            ingresoPorDia
    };
    }
}