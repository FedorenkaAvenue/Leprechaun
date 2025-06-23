import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';

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
     * @description get RMQ connection data
     * @returns 
     */
    getRMQConnectionData() {
        return {
            urls: [`amqp://${this.getVal('EVENTS_HOST')}:${this.getVal('EVENTS_PORT')}`],
        };
    }
}
