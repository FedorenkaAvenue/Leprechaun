import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import ConfigService from './config/config.service';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'user',
            protoPath: join(__dirname, '../../proto/user.proto'),
            url: `0.0.0.0:${config.getVal('USER_SERVICE_CLIENT_PORT')}`,
        },
    });

    await app.listen();
}

bootstrap();
