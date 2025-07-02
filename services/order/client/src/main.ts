import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ORDER_PACKAGE_NAME } from '@fedorenkaavenue/leprechaun_lib_entities/server/order';

import { AppModule } from './app.module';
import ConfigService from '@common/config/config.service';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: ORDER_PACKAGE_NAME,
            protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/order.proto'),
            url: `0.0.0.0:${config.getVal('ORDER_SERVICE_CLIENT_PORT')}`,
        },
    });

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            ...config.getRMQConnectionData(),
            queue: 'order.crud',
            queueOptions: { durable: false },
            routingKey: '#',
            exchange: 'entity.crud',
            exchangeType: 'topic',
        },
    });

    await app.startAllMicroservices();
    await app.init();
}

bootstrap();
