import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

import ConfigModule from "../config/config.module";
import ConfigService from "../config/config.service";
import PropertyGroupService from "./propertyGroup.service";
import { PROPERTY_GROUP_PACKAGE_NAME } from "@fedorenkaavenue/leprechaun_lib_entities/server/property_group";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'PROP_GROUP_PACKAGE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: PROPERTY_GROUP_PACKAGE_NAME,
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/property_group.proto'),
                        url: `${configService.getVal('PROPGROUP_SERVICE_CLIENT_HOST')}:${configService.getVal('PROPGROUP_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                        },
                    },
                })
            },
        ]),
    ],
    providers: [PropertyGroupService],
    exports: [PropertyGroupService],
})
export default class PropertyGroupModule { }
