import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import AppModule from './index.module';
import { RedisIoAdapter } from './event/event.adapter';
import { EventQueue } from '@core/event/event.enum';
import LoggerService from '@modules/logger/logger.service';
import ConfigService from '@modules/config/config.service';

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
    await app.listen(80);
}

runServer();
