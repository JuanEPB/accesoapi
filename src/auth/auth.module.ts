import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: 'pruebaidgs', // Cambiar por una clave segura
            signOptions: { expiresIn: '1h' }, // Configuración del token
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
