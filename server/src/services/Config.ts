import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SessionOptions } from 'express-session';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import { createClient, RedisClientOptions } from 'redis';
import { CacheModuleOptions, Injectable } from '@nestjs/common';
import * as redisCacheStore from 'cache-manager-redis-store';

const ENV_ARRAY_SPLIT_SYMBOL = ',';

interface IHostingParams {
    HOSTING_PATH: string
}

/**
 * @description configuration service (esp working with a environment variables)
 * @property {Boolean} isDev is development environment
 */
@Injectable()
export default class ConfigService {
    isDev: boolean;

    constructor() {
        this.isDev = this.getVal('IS_DEV') === 'true';
    }

    /**
     * @description get environment variable value by key
     * @param key environment variable key
     * @returns variable value
     */
    getVal(key: string): string | Array<string> {
        const envVariable = process.env[key];

        if (typeof envVariable === 'undefined') throw new Error(`config error: missing env ${key}`);

        return envVariable.includes(ENV_ARRAY_SPLIT_SYMBOL)
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
     * @description get TypeORM config object
     */
    getTypeOrmConfig(): TypeOrmModuleOptions {
        return ({
            type: 'postgres',
			host: this.getVal('POSTGRES_HOST') as string,
			port: Number(this.getVal('POSTGRES_PORT')),
			username: this.getVal('POSTGRES_USER') as string,
			password: this.getVal('POSTGRES_PASSWORD') as string,
			database: this.getVal('POSTGRES_DATABASE') as string,
            // TODO поправить после того как разберусь с миграциями
			// synchronize: this.isDev,
			synchronize: true,
			autoLoadEntities: true
        });
    }

    /**
     * @description get hosting folder's paths
     */
    getHostingParams(): IHostingParams {
        return ({
            HOSTING_PATH: this.getVal('HOSTING_PATH') as string
        })
    }

    /**
     * @description get params for Manticore search engine connection
     */
    getManticoreConfig(): string {
        return `http://${this.getVal('MANTICORE_HOST')}:${this.getVal('MANTICORE_PORT')}`;
    }

    /**
     * @description get Nodemailer config
     */
    getMailConfig(): SMTPTransport.Options {
        return ({
            host: this.getVal('MAIL_SMTP_HOST') as string,
            secure: false,
            port: Number(this.getVal('MAIL_SMTP_PORT')),
            auth: {
                user: this.getVal('MAIL_SENDER_ACCOUNT') as string,
                pass: this.getVal('MAIL_SENDER_PASSWORD') as string
            },
            tls: { ciphers:'SSLv3' }
        });
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
     * @description get config for RedisClient connection
     * @param DBNumber number of Redis database
     */
    getRedisConfig(DBNumber: number): RedisClientOptions<any, any> {
        return ({
            url: `redis://${this.getVal('REDIS_HOST')}:${this.getVal('REDIS_PORT')}`,
            username: this.getVal('REDIS_USER') as string,
            password: this.getVal('REDIS_PASSWORD') as string,
            database: DBNumber,
            legacyMode: true
        });
    }

    /**
     * @description get config for `express-session` package
     */
    getSessionConfig(): SessionOptions {
        const client = createClient(
            this.getRedisConfig(+this.getVal('REDIS_SESSION_DB_NUMBER'))
        );
        client.connect();
        const redisStore = RedisStore(session);

        return ({
            store: new redisStore({ client, logErrors: true }),
            proxy: true,
            secret: this.getVal('SESSION_COOKIE_SECRET'),
            resave: false,
            saveUninitialized: false,
            unset: 'destroy',
            cookie: {
                httpOnly: true,
                maxAge: +this.getVal('SESSION_AGE'),
                // TODO set to TRUE in production
                secure: false // secure: !this.isDev
            },
            name: 'session'
        });
    }

    /**
     * @description get cache manager config
     */
    getCacheStoreCongig(): CacheModuleOptions {
        return ({
            //@ts-ignore
            store: redisCacheStore,
            host: this.getVal('REDIS_HOST'),
            port: this.getVal('REDIS_PORT'),
            auth_pass: this.getVal('REDIS_PASSWORD'),
            ttl: +this.getVal('DEFAULT_CACHE_TTL'),
            max: 1000,
            db: +this.getVal('REDIS_CASH_DB_NUMBER')
        });
    }
}

export const singleConfigServie = new ConfigService();
