import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { USER_PACKAGE_NAME } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";

import UserService from "./user.service";
import ConfigModule from "../config/config.module";
import ConfigService from "../config/config.service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'USER_PACKAGE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: USER_PACKAGE_NAME,
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/user.proto'),
                        url: `${configService.getVal('USER_SERVICE_CLIENT_HOST')}:${configService.getVal('USER_SERVICE_CLIENT_PORT')}`,
                    },
                })
            },
        ]),
    ],
    providers: [UserService],
    exports: [UserService],
})
export default class UserModule { }
