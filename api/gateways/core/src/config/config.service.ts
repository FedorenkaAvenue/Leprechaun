import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SessionOptions } from 'express-session';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as session from 'express-session';
import { Pool as PGPool } from 'pg';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import { memoryStorage } from 'multer';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { CacheOptions } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { CookieOptions } from 'express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { createKeyv } from '@keyv/redis';
import { ClientProvider, RmqOptions, Transport } from '@nestjs/microservices';
const pgConnect = require('connect-pg-simple');

const ENV_ARRAY_SPLIT_SYMBOL = ',';

interface IHostingParams {
    HOSTING_PATH: string;
}

/**
 * @description configuration service (esp working with a environment variables)
 * @property {Boolean} isDev is development environment
 */
@Injectable()
export default class ConfigService {
    public readonly isDev: boolean;
    private readonly isLepr: boolean;

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
     * @description get application name
     */
    public getAppName(): string {
        return this.getVal('APP_NAME');
    }

    /**
     * @description get main DB connection data
     */
    public getDBConnectionData(): TypeOrmModuleOptions & PostgresConnectionCredentialsOptions {
        return {
            username: this.getVal('POSTGRES_USER'),
            password: this.getVal('POSTGRES_PASSWORD'),
            host: this.getVal('POSTGRES_HOST'),
            port: Number(this.getVal('POSTGRES_PORT')),
            database: this.getVal('POSTGRES_DATABASE'),
            type: 'postgres',
            synchronize: true,
            autoLoadEntities: true,
        };
    }

    /**
     * @description get config for `express-session` package
     */
    public getSessionConfig(): SessionOptions {
        const pgSession = pgConnect(session);
        const { username, password, host, port, database } = this.getDBConnectionData();

        return {
            store: new pgSession({
                pool: new PGPool({ user: username, database, password, host, port }),
                tableName: 'session',
            }),
            proxy: true,
            name: 'session',
            secret: this.getSessionSecretKey(),
            resave: false,
            unset: 'destroy',
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: +this.getVal('SESSION_TLL'),
                sameSite: this.isDev ? 'lax' : 'strict',
                domain: this.getVal('HOST_NAME'),
                secure: !this.isDev,
            },
        };
    }

    /**
     * @description get cookie session secret key
     * @return cookie session secret key
     */
    public getSessionSecretKey(): string {
        return this.getVal('SESSION_COOKIE_SECRET');
    }

    /**
     * @returns Multer settings object
     */
    public createMulterOptions(): MulterModuleOptions {
        return { storage: memoryStorage() };
    }

    /**
     * @description get cache manager config
     */
    public getCacheStoreConfig(): CacheOptions {
        return {
            stores: [
                createKeyv({
                    url: `redis://${this.getVal('CACHE_HOST')}:${this.getVal('CACHE_PORT')}`,
                    password: this.getVal('CACHE_PASSWORD'),
                },
                )
            ],
            ttl: Number(this.getVal('DEFAULT_CACHE_TTL')),
        };
    }

    public getSocketStoreConfig(): RedisClientOptions {
        return {
            url: `redis://${this.getVal('SOCKET_HOST')}:${+this.getVal('SOCKET_PORT')}`,
            password: this.getVal('SOCKET_PASSWORD'),
            database: +this.getVal('SOCKET_DB_NUMBER'),
        };
    }

    /**
     * @description get hosting folder's paths
     */
    public getHostingParams(): IHostingParams {
        return {
            HOSTING_PATH: this.getVal('HOSTING_PATH'),
        };
    }

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
     * @description get Nodemailer config
     */
    public getMailConfig(): SMTPTransport.Options {
        return {
            host: this.isDev ? 'leprechaun_mailcatcher' : this.getVal('MAIL_SMTP_HOST'),
            secure: false,
            port: Number(this.getVal(this.isDev ? 'MAIL_SMPT_PORT_DEV' : 'MAIL_SMTP_PORT_PROD')),
            auth: {
                user: this.getVal('MAIL_SENDER_ACCOUNT'),
                pass: this.getVal('MAIL_SENDER_PASSWORD'),
            },
            tls: { ciphers: 'SSLv3' },
        };
    }

    /**
     * @description mail sender credentials
     * @returns {String} 'APP_NAME <SENDER_NAME>'
     */
    public getMailCredentials(): string {
        return `${this.getVal('APP_NAME')} <${this.getVal('MAIL_SENDER_ACCOUNT')}>`;
    }

    /**
     * @description get developer/admin mail account
     * @returns developer/admin email
     */
    public getDevMailReciever(): string {
        return this.getVal('DEV_MAIL_RECIEVER');
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

    public getBrokerMessageNetConfig(options?: RmqOptions['options']): RmqOptions {
        return ({
            options: {
                urls: [`amqp://${this.getVal('BROKER_NET_HOST')}:${this.getVal('BROKER_NET_PORT')}`],
                ...options,
            },
            transport: Transport.RMQ,
        });
    }
}
