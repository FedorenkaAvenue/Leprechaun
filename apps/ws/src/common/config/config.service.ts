import { Injectable } from '@nestjs/common';
// import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService as SharedConfigService } from '@fedorenkaavenue/leprechaun_lib_utils/modules';

@Injectable()
export default class ConfigService extends SharedConfigService {
    /**
    * @description get RMQ connection data
    * @returns 
    */
    getRMQConnectionData() {
        return {
            urls: [`amqp://${this.getVal('MESSAGING_RABBITMQ_HOST')}:${this.getVal('MESSAGING_RABBITMQ_PORT')}`],
        };
    }
}
