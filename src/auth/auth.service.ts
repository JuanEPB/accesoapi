import { Injectable, BadRequestException } from '@nestjs/common';
import { usersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: usersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !(await this.usersService.validatePassword(password, user.password))) {
            throw new BadRequestException('Correo electrónico o contraseña incorrecto');
        }

        const payload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { token, user };
    }
}
