import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { AuthSuccessDTO, JWTPayload, JWTSuccessTokens, SignInDTO } from './auth.interface';
import UserService from '../user/user.service';
import { User } from '../user/user.interface';
import CryptoService from '../crypto/crypto.service';
import ConfigService from '../config/config.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async sigIn(payload: SignInDTO): Promise<AuthSuccessDTO> {
        try {
            const user = await firstValueFrom(this.userService.getUser(payload));

            if (!await this.cryptoService.checkHash(payload.password, user.password)) {
                throw new RpcException({ code: status.PERMISSION_DENIED, message: 'Invalid password' });
            }

            return await this.genAuthTokens(user);
        } catch (error: any) {
            throw new RpcException({ code: error.code, message: error.message });
        }
    }

    /**
 * @description get JWT pair
 * @param {UserI} user user entiry
 * @returns {JWTSuccessTokensI} JWT pair
 */
    private async genAuthTokens(user: User): Promise<JWTSuccessTokens> {
        const payload: JWTPayload = { id: user.id, role: user.role }; // ! must be literal object

        return {
            accessToken: await this.jwtService.signAsync(payload, this.configService.getJWTAccessTokenOptions()),
            refreshToken: await this.jwtService.signAsync(payload, this.configService.getJWTRefreshTokenOptions()),
        };
    }
}
