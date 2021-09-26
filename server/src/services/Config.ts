import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface IHostingParams {
    HOSTING_PATH: string
}

export default class ConfigService {
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
     * @description get environment status
     * @returns boolean environment status
     */
    isDev() {
        return Boolean(this.getVal('IS_DEV'))
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
			synchronize: this.isDev(),
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
}
