import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PROPERTY_GROUP_PACKAGE_NAME } from '@fedorenkaavenue/leprechaun_lib_entities/server/property_group';

import { AppModule } from './app.module';
import ConfigService from '@common/config/config.service';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: PROPERTY_GROUP_PACKAGE_NAME,
            protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/property_group.proto'),
            url: `0.0.0.0:${config.getVal('PROPGROUP_SERVICE_CLIENT_PORT')}`,
        },
    });

    await app.listen();
}

bootstrap();
