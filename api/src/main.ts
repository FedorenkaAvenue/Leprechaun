import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import AppModule from '@modules/App';
import configService from '@services/Config';
import { UncaughtExceptionFilter } from '@filters/UncaughtException';

async function runServer() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser()).enableCors({
        origin: configService.getAvailableCORSDomains(),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });

    if (!configService.isDev) app.useGlobalFilters(new UncaughtExceptionFilter());

    // Swagger
    const config = new DocumentBuilder()
        .setTitle(configService.getAppName())
        .setDescription(`💾 - cached |  🧑‍💻 - user |  🤵🏿‍♂️ - admin`)
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup('/docs', app, document);

    await app.listen(80);
}

runServer();
