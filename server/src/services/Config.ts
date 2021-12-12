import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface IHostingParams {
    HOSTING_PATH: string
}

/**
 * @description configuration service (esp working with a environment variables)
 * @property {Boolean} isDev is development environment
 */
class ConfigService {
    isDev: boolean;

    constructor() {
        this.isDev = this.getVal('IS_DEV') === 'true';
    }

    /**
     * @description get environment variable value by key
     * @param key environment variable key
     * @returns variable value
     */
    getVal(key: string): string {
        const envVariable = process.env[key];

        if (typeof envVariable === 'undefined') throw new Error(`config error: missing env ${key}`);

        return envVariable;
    }

    /**
     * @description get application name
     */
    getAppName(): string {
        return this.getVal('APP_NAME');
    }

    /**
     * @description get TypeORM config object
     */
    getTypeOrmConfig(): TypeOrmModuleOptions {
        return ({
            type: 'postgres',
			host: this.getVal('POSTGRES_HOST'),
			port: Number(this.getVal('POSTGRES_PORT')),
			username: this.getVal('POSTGRES_USER'),
			password: this.getVal('POSTGRES_PASSWORD'),
			database: this.getVal('POSTGRES_DATABASE'),
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
            HOSTING_PATH: this.getVal('HOSTING_PATH')
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
            host: this.getVal('MAIL_SMTP_HOST'),
            secure: false,
            port: Number(this.getVal('MAIL_SMTP_PORT')),
            auth: {
                user: this.getVal('MAIL_SENDER_ACCOUNT'),
                pass: this.getVal('MAIL_SENDER_PASSWORD')
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
     * @returns development mail account
     */
    getDevMailReciever(): string {
        return this.getVal('DEV_MAIL_RECIEVER');
    }
}

export default new ConfigService();
