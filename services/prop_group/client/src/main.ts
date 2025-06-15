import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import ConfigService from '@common/config/config.service';
import { PROPERTY_GROUP_PACKAGE_NAME } from 'gen/property_group';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: PROPERTY_GROUP_PACKAGE_NAME,
            protoPath: join(__dirname, '../../proto/property_group.proto'),
            url: `0.0.0.0:${config.getVal('PROPGROUP_SERVICE_CLIENT_PORT')}`,
        },
    });

    await app.listen();
}

bootstrap();
