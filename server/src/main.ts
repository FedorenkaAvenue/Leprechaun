import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const { APP_NAME } = process.env;

async function runServer() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	const config = new DocumentBuilder()
		.setTitle(APP_NAME)
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		ignoreGlobalPrefix: true
	});
	SwaggerModule.setup('/docs', app, document);

	await app.listen(80);
}

runServer();
