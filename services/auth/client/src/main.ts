import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import ConfigService from './common/config/config.service';
import { AUTH_PACKAGE_NAME } from '@fedorenkaavenue/leprechaun_lib_entities/server/auth';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/auth.proto'),
            url: `0.0.0.0:${config.getVal('AUTH_SERVICE_CLIENT_PORT')}`,
        },
    });

    await app.listen();
}

bootstrap();
