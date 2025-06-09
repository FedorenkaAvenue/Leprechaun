import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

import PropertyGroupPrivateController from './propertyGroup.controller';
import { PROP_GROUP_PACKAGE } from './propertyGroup.constants';
import ConfigService from '@modules/config/config.service';
import { PROP_GROUP_PACKAGE_NAME } from '@gen/prop_group';
import PropertyGroupPrivateService from './propertyGroup.service';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: PROP_GROUP_PACKAGE,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: PROP_GROUP_PACKAGE_NAME,
                        protoPath: join(__dirname, '../../../../../../proto/prop_group.proto'),
                        url: `${configService.getVal('PROPGROUP_SERVICE_CLIENT_HOST')}:${configService.getVal('PROPGROUP_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                            defaults: true,
                        }
                    },
                }),
            },
        ]),
    ],
    controllers: [PropertyGroupPrivateController],
    providers: [PropertyGroupPrivateService],
    exports: [ClientsModule],
})
export default class PropertyGroupPrivateModule { }
