import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import ConfigService from '@common/config/config.service';
import { CATEGORY_PACKAGE_NAME } from 'gen/ts/category';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: CATEGORY_PACKAGE_NAME,
            protoPath: join(__dirname, '../../proto/category.proto'),
            url: `0.0.0.0:${config.getVal('CATEGORY_SERVICE_CLIENT_PORT')}`,
        },
    });

    await app.listen();
}

bootstrap();
