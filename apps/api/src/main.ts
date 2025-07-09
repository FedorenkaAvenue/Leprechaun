import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import AppModule from './index.module';
import ConfigService from '@modules/config/config.service';
import { LoggerService } from '@fedorenkaavenue/leprechaun_lib_utils/modules';

async function runServer() {
    const config = new ConfigService();
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.enableCors({
        origin: [config.getVal('DOMAIN_PRIVATE')],
        methods: '*',
        credentials: true,
    });
    app.useLogger(app.get(LoggerService));

    // OpenAPI
    const docsConfig = new DocumentBuilder()
        .setTitle(`${config.getAppName()} API`)
        .build();
    const document = SwaggerModule.createDocument(app, docsConfig, {
        ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup('/docs', app, document);

    await app.listen(80);
}

runServer();
