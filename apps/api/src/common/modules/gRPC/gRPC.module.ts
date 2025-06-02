import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import ConfigModule from '@modules/config/config.module';
import ConfigService from '@modules/config/config.service';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'AUTH_PACKAGE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: 'auth',
                        protoPath: join(__dirname, '../../../../../proto/auth.proto'),
                        url: `${configService.getVal('AUTH_SERVICE_CLIENT_HOST')}:${configService.getVal('AUTH_SERVICE_CLIENT_PORT')}`,
                    },
                }),
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class GrpcClientsModule { }
