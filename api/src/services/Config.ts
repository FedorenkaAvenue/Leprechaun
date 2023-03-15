import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CacheModuleOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SessionOptions } from 'express-session';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as session from 'express-session';
import * as redisCacheStore from 'cache-manager-redis-store';
import { Pool as PGPool } from 'pg';
import { ApiClient, SearchApi } from 'manticoresearch';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
const pgConnect = require('connect-pg-simple');

const ENV_ARRAY_SPLIT_SYMBOL = ',';

interface IHostingParams {
    HOSTING_PATH: string;
}

/**
 * @description configuration service (esp working with a environment variables)
 * @property {Boolean} isDev is development environment
 * @property {Boolean} isLepr is "Leprechaun" test project
 */
export class ConfigService {
    isDev: boolean;
    isLepr: boolean;

    constructor() {
        this.isDev = this.getVal('IS_DEV') === 'true';
        this.isLepr = this.getAppName() === 'Leprechaun';
    }

    /**
     * @description get environment variable value by key
     * @param key environment variable key
     * @returns variable value
     * @exception {Error} variable hasn't been set
     */
    getVal(key: string): string | string[] {
        const envVariable = process.env[key];

        if (typeof envVariable === 'undefined') throw new Error(`config error: missing env ${key}`);

        return envVariable?.includes(ENV_ARRAY_SPLIT_SYMBOL)
            ? envVariable.split(ENV_ARRAY_SPLIT_SYMBOL).map(env => env.trim())
            : envVariable;
    }

    /**
     * @description get application name
     */
    getAppName(): string {
        return this.getVal('APP_NAME') as string;
    }

    /**
     * @description get main DB connection data
     */
    getDBConnectionData(): TypeOrmModuleOptions & PostgresConnectionCredentialsOptions {
        return {
            username: this.getVal('POSTGRES_USER') as string,
            password: this.getVal('POSTGRES_PASSWORD') as string,
            host: this.getVal('POSTGRES_HOST') as string,
            port: Number(this.getVal('POSTGRES_PORT')),
            database: this.getVal('POSTGRES_DATABASE') as string,
            type: 'postgres',
            synchronize: true,
            autoLoadEntities: true,
        };
    }

    /**
     * @description get search engine connection data
     */
    getSEConnectionData(): any {
        const client = new ApiClient();
        client.basePath = 'http://leprechaun_se:9308';

        return new SearchApi(client);
    }

    /**
     * @description get config for `express-session` package
     */
    getSessionConfig(): SessionOptions {
        const pgSession = pgConnect(session);
        const { username, password, host, port, database } = this.getDBConnectionData();

        return {
            store: new pgSession({
                pool: new PGPool({ user: username, database, password, host, port }),
                tableName: 'session',
            }),
            genid: this.isLepr || this.isDev ? this.genSessionId() : undefined,
            proxy: true,
            name: 'session',
            secret: this.getVal('SESSION_COOKIE_SECRET'),
            resave: false,
            unset: 'destroy',
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: +this.getVal('SESSION_AGE'),
                sameSite: this.isLepr ? 'none' : 'strict',
                domain: `.${this.getVal('HOST_NAME')}`,
                secure: !this.isDev,
            },
        };
    }

    /**
     * @description get cache manager config
     */
    getCacheStoreConfig(): CacheModuleOptions {
        return {
            store: redisCacheStore as any,
            host: this.getVal('CACHE_HOST'),
            port: this.getVal('CACHE_CONTAINER_PORT'),
            auth_pass: this.getVal('CACHE_PASSWORD'),
            ttl: +this.getVal('DEFAULT_CACHE_TTL'),
            max: 1000,
            db: +this.getVal('CACHE_DB_NUMBER'),
        };
    }

    /**
     * @description get hosting folder's paths
     */
    getHostingParams(): IHostingParams {
        return {
            HOSTING_PATH: this.getVal('HOSTING_PATH') as string,
        };
    }

    /**
     * @description get Nodemailer config
     */
    getMailConfig(): SMTPTransport.Options {
        return {
            host: this.getVal('MAIL_SMTP_HOST') as string,
            secure: false,
            port: Number(this.getVal('MAIL_SMTP_PORT')),
            auth: {
                user: this.getVal('MAIL_SENDER_ACCOUNT') as string,
                pass: this.getVal('MAIL_SENDER_PASSWORD') as string,
            },
            tls: { ciphers: 'SSLv3' },
        };
    }

    /**
     * @description mail sender credentials
     * @returns 'APP_NAME <SENDER_NAME>' string
     */
    getMailCredentials(): string {
        return `${this.getVal('APP_NAME')} <${this.getVal('MAIL_SENDER_ACCOUNT')}>`;
    }

    /**
     * @description get development mail account
     */
    getDevMailReciever(): string {
        return this.getVal('DEV_MAIL_RECIEVER') as string;
    }

    /**
     * @description create simple session ID (incrementing +1)
     * @returns {Function} callback which returns session ID
     */
    genSessionId(): (req: Express.Request) => string {
        let count = 0;

        return function (req: Express.Request): string {
            return String(++count);
        };
    }

    /**
     * @description get CORS config
     */
    getCORSConfig(): CorsOptions {
        return {
            origin: [
                this.getVal('DOMAIN') as string,
                this.getVal('DOMAIN_ADM') as string,
                ...this.getVal('CORS_DOMAINS'),
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials: true,
        };
    }
}

const configService = new ConfigService();

export default configService;
