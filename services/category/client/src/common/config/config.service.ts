import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { ConfigService as SharedConfigService } from '@fedorenkaavenue/leprechaun_lib_utils/services';

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

    /**
    * @description get S3 client config
    */
    public getFSClient(): S3ClientConfig {
        return ({
            region: 'us-east-1',
            endpoint: `http://${this.getVal('CATEGORY_SERVICE_S3_HOST')}:${this.getVal('CATEGORY_SERVICE_S3_PORT')}`,
            credentials: {
                accessKeyId: this.getVal('CATEGORY_SERVICE_S3_USER'),
                secretAccessKey: this.getVal('CATEGORY_SERVICE_S3_PASSWORD'),
            },
            forcePathStyle: true,
        })
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
