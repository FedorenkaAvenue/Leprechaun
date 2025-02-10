import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import AppModule from './index.module';
import { RedisIoAdapter } from './event/event.adapter';
import ConfigService from '@core/config/config.service';
import { EventQueue } from '@core/event/event.enum';
import LoggerService from '@shared/modules/logger/logger.service';

async function runServer() {
    const config = new ConfigService();
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.enableCors({
        origin: [config.getVal('DOMAIN_PUBLIC')],
        methods: ['GET'],
        credentials: true,
    });
    app.useLogger(app.get(LoggerService));

    app.connectMicroservice<MicroserviceOptions>(config.getBrokerMessageNetConfig({
        queue: EventQueue.WS,
        queueOptions: { durable: false },
    }));

    // sockets
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);

    await app.startAllMicroservices();
    await app.listen(81);
}

runServer();
