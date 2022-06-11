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
		.use(session(singleConfigServie.getSessionConfig()))
		.use((req, res, next) => {
			res.header('Access-Control-Allow-Credentials', 'true');
			res.header('Access-Control-Allow-Origin', 'https://leprechaun.tech');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
			next();
		});

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
