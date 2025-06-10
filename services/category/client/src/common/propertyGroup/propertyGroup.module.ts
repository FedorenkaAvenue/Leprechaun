import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

import ConfigModule from "../config/config.module";
import ConfigService from "../config/config.service";
import PropertyGroupService from "./propertyGroup.service";
import { PROP_GROUP_PACKAGE_NAME } from "gen/ts/prop_group";

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
                        package: PROP_GROUP_PACKAGE_NAME,
                        protoPath: join(__dirname, '../../../../proto/prop_group.proto'),
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
