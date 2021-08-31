import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const { IS_DEV, APP_NAME } = process.env;
const GLOBAL_API_PREFIX: string = '/api';

async function runServer() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix(GLOBAL_API_PREFIX);
	app.use(cookieParser());
	// app.useGlobalPipes(
	// 	new ValidationPipe({
	// 		transform: true
	// 	}),
	// );

	if (IS_DEV) {
		const config = new DocumentBuilder()
			.setTitle(APP_NAME)
			.setDescription(`All routes begin from ${GLOBAL_API_PREFIX} prefix.`)
			.build();

		const document = SwaggerModule.createDocument(app, config, {
			ignoreGlobalPrefix: true
		});
		SwaggerModule.setup('/docs', app, document);
	}

	await app.listen(80);
}

runServer();
