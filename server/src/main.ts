import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function runServer() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('/api');
	await app.listen(80);
}

runServer();
