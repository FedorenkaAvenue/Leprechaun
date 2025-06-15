import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

import UserService from "./user.service";
import ConfigModule from "../config/config.module";
import ConfigService from "../config/config.service";
import { USER_PACKAGE_NAME } from "gen/user";

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
                        protoPath: join(__dirname, '../../../../proto/user.proto'),
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
