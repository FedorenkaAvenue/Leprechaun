import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROPERTY_GROUP_PACKAGE_NAME } from '@fedorenkaavenue/leprechaun_lib_entities/server/property_group';

import PropertyGroupPrivateController from './propertyGroup.controller';
import { PROPERTY_GROUP_PACKAGE } from './propertyGroup.constants';
import ConfigService from '@modules/config/config.service';
import PropertyGroupPrivateService from './propertyGroup.service';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: PROPERTY_GROUP_PACKAGE,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: PROPERTY_GROUP_PACKAGE_NAME,
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/property_group.proto'),
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
