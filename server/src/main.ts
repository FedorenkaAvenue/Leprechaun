import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import AppModule from '@modules/App';
import ConfigService from '@services/Config';
import { HttpExceptionFilter } from '@decorators/InternalServerError';

async function runServer() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	if (!ConfigService.isDev) {
		app.useGlobalFilters(new HttpExceptionFilter());
	}

	const config = new DocumentBuilder()
		.setTitle(ConfigService.getAppName())
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		ignoreGlobalPrefix: true
	});
	SwaggerModule.setup('/docs', app, document);

	await app.listen(80);
}

runServer();
