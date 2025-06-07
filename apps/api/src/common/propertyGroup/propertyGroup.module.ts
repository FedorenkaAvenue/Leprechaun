import { Module } from '@nestjs/common';
import { join } from 'path';

import PropertyGroupService from './propertyGroup.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROP_GROUP_PACKAGE } from './propertyGroup.constants';
import ConfigService from '@modules/config/config.service';
import { PROP_GROUP_PACKAGE_NAME } from '@gen/prop_group';

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
                        protoPath: join(__dirname, '../../../../proto/prop_group.proto'),
                        url: `${configService.getVal('PROPGROUP_SERVICE_CLIENT_HOST')}:${configService.getVal('PROPGROUP_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                        }
                    },
                }),
            },
        ]),
    ],
    providers: [PropertyGroupService],
    exports: [PropertyGroupService],
})
export default class PropertyGroupModule { }
