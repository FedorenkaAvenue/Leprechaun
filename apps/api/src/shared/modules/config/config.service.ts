import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CookieOptions } from 'express';
import { memoryStorage } from 'multer';
import { ConfigService as SharedConfigService } from '@fedorenkaavenue/leprechaun_lib_utils/modules';

@Injectable()
export default class ConfigService extends SharedConfigService {
    /**
     * @description get Multer config
     * @returns 
     */
    public getMulterConfig(): MulterOptions {
        return ({
            storage: memoryStorage(),
        })
    }

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
