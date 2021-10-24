import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@decorators/InternalServerError';
import ConfigService from '@services/Config';

async function runServer() {
	const app = await NestFactory.create(AppModule);
	
	console.log('is dev: ', ConfigService.isDev);

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
