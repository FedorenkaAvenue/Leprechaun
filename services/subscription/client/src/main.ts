import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SUBSCRIPTION_PACKAGE_NAME } from '@fedorenkaavenue/leprechaun_lib_entities/server/subscription';
import { join } from 'path';

import { AppModule } from './app.module';
import ConfigService from '@common/config/config.service';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: SUBSCRIPTION_PACKAGE_NAME,
            protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/subscription.proto'),
            url: `0.0.0.0:${config.getVal('SUBSCRIPTION_SERVICE_CLIENT_PORT')}`,
        },
    });

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            ...config.getRMQConnectionData(),
            queue: 'subscription.crud',
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
