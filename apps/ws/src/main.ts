import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions } from '@nestjs/microservices';
import { LoggerService } from '@fedorenkaavenue/leprechaun_lib_utils/modules';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import AppModule from './index.module';
// import { RedisIoAdapter } from './event/event.adapter';
// import { EventQueue } from '@core/event/event.enum';
import ConfigService from '@common/config/config.service';

async function runServer() {
    const config = new ConfigService();
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.enableCors({
        origin: [config.getVal('DOMAIN_PUBLIC')],
        methods: ['GET'],
        credentials: true,
    });
    app.useLogger(app.get(LoggerService));

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            ...config.getRMQConnectionData(),
            queue: 'history.push',
            routingKey: '#',
            queueOptions: { durable: false },
            exchange: 'product.visit',
            exchangeType: 'fanout',
        },
    });

    await app.startAllMicroservices();
    await app.listen(81);
}

runServer();
