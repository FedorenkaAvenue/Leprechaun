import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import { ConfigService as SharedConfigService } from '@fedorenkaavenue/leprechaun_lib_utils/services';

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

    /**
    * @description get RMQ connection data
    * @returns 
    */
    getRMQConnectionData() {
        return {
            urls: [
                `amqp://${this.getVal('MESSAGING_RABBITMQ_HOST')}:${this.getVal('MESSAGING_RABBITMQ_PORT')}`
            ],
        };
    }

    /**
  * @description get Kafka connection data
  * @returns 
  */
    getKafkaConnectionData() {
        return {
            client: {
                clientId: 'nestjs-client',
                brokers: [
                    `${this.getVal('MESSAGING_KAFKA_HOST')}:${this.getVal('MESSAGING_KAFKA_PORT')}`
                ],
            }
        };
    }
}
