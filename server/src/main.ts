import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import AppModule from '@modules/App';
import { singleConfigServie } from '@services/Config';
import { UncaughtExceptionFilter } from '@filters/UncaughtException';

async function runServer() {
	const app = await NestFactory.create(AppModule);

	app
		.use(cookieParser())
		.use(session(singleConfigServie.getSessionConfig()));

	if (!singleConfigServie.isDev) app.useGlobalFilters(new UncaughtExceptionFilter());

	// Swagger
	const config = new DocumentBuilder()
		.setTitle(singleConfigServie.getAppName())
		.setDescription(`💾 - cached |  🧑‍💻 - user |  🤵🏿‍♂️ - admin`)
		.build();
	const document = SwaggerModule.createDocument(app, config, {
		ignoreGlobalPrefix: true
	});
	SwaggerModule.setup('/docs', app, document);

	await app.listen(80);
}

runServer();
