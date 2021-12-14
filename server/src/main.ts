import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import AppModule from '@modules/App';
import ConfigService from '@services/Config';
import { UncaughtExceptionFilter } from '@decorators/UncaughtExceptionFilter';

async function runServer() {
	const app = await NestFactory.create(AppModule);

	app
		.use(cookieParser())
		.use(session(ConfigService.getSessionConfig()))
		.use((req, res, next) => {
			console.log(req.cookies);
			
			res
				.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
				.append('Access-Control-Allow-Headers', '*')
				.append('Access-Control-Allow-Credentials', 'true')
				.append("Access-Control-Allow-Origin", "*")
			next();
		})

	if (!ConfigService.isDev) {
		app.useGlobalFilters(new UncaughtExceptionFilter());
	}

	// Swagger
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
