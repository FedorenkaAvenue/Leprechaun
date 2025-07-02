import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import ConfigService from '@common/config/config.service';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'user',
            protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/user.proto'),
            url: `0.0.0.0:${config.getVal('USER_SERVICE_CLIENT_PORT')}`,
        },
    });

    await app.listen();
}

bootstrap();
