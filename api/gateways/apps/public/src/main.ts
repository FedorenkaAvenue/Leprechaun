import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import AppModule from './index.module';
import ConfigService from '@core/config/config.service';
// import { RedisIoAdapter } from '@core/event/event.adapter';
import LoggerService from '@shared/modules/logger/logger.service';

async function runServer() {
    const config = new ConfigService();
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.use(cookieParser()).enableCors(config.getCORSConfig());
    app.useLogger(app.get(LoggerService));

    // sockets
    // const redisIoAdapter = new RedisIoAdapter(app);
    // await redisIoAdapter.connectToRedis();
    // app.useWebSocketAdapter(redisIoAdapter);

    // OpenAPI
    const docsConfig = new DocumentBuilder()
        .setTitle(`${config.getAppName()} public (customer) API`)
        .setDescription(`🧷 - init session  |  💾 - cached`)
        .build();
    const document = SwaggerModule.createDocument(app, docsConfig, {
        ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup('/docs', app, document);

    await app.listen(80);
}

runServer();
