import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import AppModule from '@modules/.';
import { singleConfigService } from '@services/Config';
import LoggerService from '@services/Logger';
import { RedisIoAdapter } from '@services/Event';

async function runServer() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.use(cookieParser()).enableCors(singleConfigService.getCORSConfig());
    app.useLogger(app.get(LoggerService));

    // sockets
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);

    // OpenAPI
    const config = new DocumentBuilder()
        .setTitle(singleConfigService.getAppName())
        .setDescription(`🧑‍💻 - user |  🤵🏿‍♂️ - admin |  🧷 - init session  |  💾 - cached`)
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup('/docs', app, document);

    await app.listen(80);
}

runServer();
