import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import CryptoService from "@services/Crypto";
import { UserI } from "@interfaces/User";
import { JWTPayloadI, JWTSuccessTokensI } from "@interfaces/JWT";
import UserService from "@services/User";
import { singleConfigService } from "@services/Config";

@Injectable()
export default class AuthService {
    constructor(
        protected readonly cryptoService: CryptoService,
        protected readonly jwtService: JwtService,
        protected readonly userService: UserService,
    ) { }

    /**
     * @description get JWT pair
     * @param {UserI} user user entiry
     * @returns {JWTSuccessTokensI} JWT pair
     */
    protected async genAuthTokens(user: UserI): Promise<JWTSuccessTokensI> {
        const payload: JWTPayloadI = { id: user.id, role: user.role }; // ! must be literal object

        return {
            accessToken: await this.jwtService.signAsync(payload, singleConfigService.getJWTAccessTokenOptions()),
            refreshToken: await this.jwtService.signAsync(payload, singleConfigService.getJWTRefreshTokenOptions()),
        };
    }

    /**
     * @description check refresh token. if valid return new JWT pair
     * @param {String} refreshtoken
     * @returns new JWT pair
     */
    public async refreshAccessToken(refreshtoken: JWTSuccessTokensI['refreshToken']): Promise<JWTSuccessTokensI> {
        throw new UnauthorizedException('invalid refresh token');

        return {
            accessToken: 'lol',
            refreshToken: 'REFRESH_TOKEN',
        };
    }
}
