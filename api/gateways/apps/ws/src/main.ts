import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import AppModule from './index.module';
import { RedisIoAdapter } from './event/event.adapter';
import ConfigService from '@core/config/config.service';
import LoggerService from '@shared/modules/logger/logger.service';

async function runServer() {
    const config = new ConfigService();
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.use(cookieParser()).enableCors(config.getCORSConfig());
    app.useLogger(app.get(LoggerService));

    // sockets
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);

    await app.listen(80);
}

runServer();
