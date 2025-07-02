// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { CookieOptions } from 'express';
import { ConfigService as SharedConfigService } from '@fedorenkaavenue/leprechaun_lib_utils/services';

@Injectable()
export default class ConfigService extends SharedConfigService {
    /**
    * @description get JwtModule register config
    * @returns {JwtModuleOptions} config
    */
    public getJWTModuleConfig(): JwtModuleOptions {
        return {
            global: true,
        };
    }

    /**
     * @description get JWT access token options
     */
    public getJWTAccessTokenOptions(): JwtSignOptions {
        return ({
            secret: this.getVal('JWT_ACCESS_TOKEN_KEY'),
            expiresIn: this.getVal('JWT_ACCESS_TOKEN_TTL'),
        });
    }

    /**
     * @description get JWT refresh token options
     */
    public getJWTRefreshTokenOptions(): JwtSignOptions {
        return ({
            secret: this.getVal('JWT_REFRESH_TOKEN_KEY'),
            expiresIn: this.getVal('JWT_REFRESH_TOKEN_TTL'),
        });
    }

    /**
     * @description get refresh token cookie options
     * @returns {CookieOptions} cookie options
     */
    public getJWTRefreshTokenCookieOptions(): CookieOptions {
        return ({
            httpOnly: true,
            secure: !this.isDev,
            sameSite: this.isDev ? 'lax' : 'none',
            domain: `.${this.getVal('HOST_NAME')}`,
            maxAge: 123123123,
        });
    }
}
