import { Injectable } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { JWTPayload, JWTSuccessTokens } from './auth.interface';
import UserService from '../user/user.service';
import CryptoService from '../crypto/crypto.service';
import { User } from 'gen/ts/user';
import ConfigService from '../config/config.service';
import { AuthJWT, SignInParams } from 'gen/ts/auth';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    public sigIn(payload: SignInParams): Observable<AuthJWT> {
        return this.userService.getUser({ email: payload.email }).pipe(
            switchMap(async user => {
                if (!await this.cryptoService.checkHash(payload.password, user.password)) {
                    throw new RpcException({ code: status.PERMISSION_DENIED, message: 'Invalid password' });
                }

                return this.genAuthTokens(user)
            })
        );
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
