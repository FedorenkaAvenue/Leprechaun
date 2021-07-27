import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const { IS_DEV } = process.env;

async function runServer() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('/api');

	if (IS_DEV) {
		const config = new DocumentBuilder()
			.setTitle('Leprechaun')
			.setDescription('API description')
			.setVersion('1.0')
			.build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('/docs', app, document);
	}

	await app.listen(80);
}

runServer();
