import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { JWTPayloadI, JWTSuccessTokensI } from "./auth.interface";
import { UserI } from "../user/user.interface";
import ConfigService from "../config/config.service";

@Injectable()
export default class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    /**
     * @description get JWT pair
     * @param {UserI} user user entiry
     * @returns {JWTSuccessTokensI} JWT pair
     */
    public async genAuthTokens(user: UserI): Promise<JWTSuccessTokensI> {
        const payload: JWTPayloadI = { id: user.id, role: user.role }; // ! must be literal object

        return {
            accessToken: await this.jwtService.signAsync(payload, this.configService.getJWTAccessTokenOptions()),
            refreshToken: await this.jwtService.signAsync(payload, this.configService.getJWTRefreshTokenOptions()),
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
