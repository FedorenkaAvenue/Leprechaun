import { ConfigService as SharedConfigService } from '@fedorenkaavenue/leprechaun_lib_utils/services';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';

/**
 * @description configuration service (esp working with a environment variables)
 * @property {Boolean} isDev is development environment
 */
@Injectable()
export default class ConfigService extends SharedConfigService {
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
}
