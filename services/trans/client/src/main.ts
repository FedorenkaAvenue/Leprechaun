import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import ConfigService from './config/config.service';
import { TRANS_PACKAGE_NAME } from 'gen/ts/trans';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: TRANS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../proto/trans.proto'),
            url: `0.0.0.0:${config.getVal('TRANS_SERVICE_CLIENT_PORT')}`,
        },
    });

    await app.listen();
}

bootstrap();
