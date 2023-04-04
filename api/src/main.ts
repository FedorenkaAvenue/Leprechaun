import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import AppModule from '@modules/.';
import { singleConfigService } from '@services/Config';
import LoggerService from '@services/Logger';

async function runServer() {
    const app = await NestFactory.create(AppModule, { logger: new LoggerService() });

    app.use(cookieParser()).enableCors(singleConfigService.getCORSConfig());

    // OpenAPI
    const config = new DocumentBuilder()
        .setTitle(singleConfigService.getAppName())
        .setDescription(`💾 - cached |  🧑‍💻 - user |  🤵🏿‍♂️ - admin`)
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup('/docs', app, document);

    await app.listen(80);
}

runServer();
