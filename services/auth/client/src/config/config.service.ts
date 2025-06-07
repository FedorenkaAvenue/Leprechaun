// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { CookieOptions } from 'express';

const ENV_ARRAY_SPLIT_SYMBOL = ',';

/**
 * @description configuration service (esp working with a environment variables)
 * @property {Boolean} isDev is development environment
 */
@Injectable()
export default class ConfigService {
    public readonly isDev: boolean;

    constructor() {
        this.isDev = this.getVal('IS_DEV') === 'true';
    }

    /**
     * @description get environment variable value by key
     * @param key environment variable key
     * @returns variable value
     * @exception {Error} variable hasn't been set
     */
    public getVal(key: string): string;
    public getVal<T extends string[]>(key: string): T;
    public getVal<T extends string | string[] = string>(key: string): T {
        const envVariable = process.env[key];

        if (typeof envVariable === 'undefined') {
            throw new Error(`config error: missing env ${key}`);
        }

        if (envVariable.includes(ENV_ARRAY_SPLIT_SYMBOL)) {
            return envVariable.split(ENV_ARRAY_SPLIT_SYMBOL).map(env => env.trim()) as T;
        }

        return envVariable as T;
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
