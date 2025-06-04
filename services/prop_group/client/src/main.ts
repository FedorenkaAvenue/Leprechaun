import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import ConfigService from './config/config.service';
import { PROP_GROUP_PACKAGE_NAME } from 'gen/ts/prop_group';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: PROP_GROUP_PACKAGE_NAME,
            protoPath: join(__dirname, '../../proto/prop_group.proto'),
            url: `0.0.0.0:${config.getVal('PROPGROUP_SERVICE_CLIENT_PORT')}`,
        },
    });

    await app.listen();
}

bootstrap();
