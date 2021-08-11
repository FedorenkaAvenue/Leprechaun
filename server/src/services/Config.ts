import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface IHostingParams {
    HOSTING_PATH: string
}

export default class ConfigService {
    getVal(key: string): string {
        const envVariable = process.env[key];

        if (typeof envVariable === 'undefined') throw new Error(`config error: missing env.${key}`);

        return envVariable;
    }

    getTypeOrmConfig(): TypeOrmModuleOptions {
        return ({
            type: 'postgres',
			host: this.getVal('POSTGRES_HOST'),
			port: Number(this.getVal('POSTGRES_PORT')),
			username: this.getVal('POSTGRES_USER'),
			password: this.getVal('POSTGRES_PASSWORD'),
			database: this.getVal('POSTGRES_DATABASE'),
			synchronize: true,
			autoLoadEntities: true
        });
    }

    getHostingParams(): IHostingParams {
        return ({
            HOSTING_PATH: this.getVal('HOSTING_PATH')
        })
    }
}
