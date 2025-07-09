import { Injectable } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { User } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';
import { AuthJWT, SignInParams } from '@fedorenkaavenue/leprechaun_lib_entities/server/auth';

import { JWTPayload, JWTSuccessTokens } from './auth.interface';
import UserService from '@common/user/user.service';
import CryptoService from '@common/crypto/crypto.service';
import ConfigService from '@common/config/config.service';

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
