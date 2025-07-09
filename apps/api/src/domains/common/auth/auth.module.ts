import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { AUTH_PACKAGE_NAME } from '@fedorenkaavenue/leprechaun_lib_entities/server/auth'

import AuthService from "./auth.service";
import { AUTH_PACKAGE } from "./auth.constants";
import ConfigService from "@modules/config/config.service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: AUTH_PACKAGE,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: AUTH_PACKAGE_NAME,
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/auth.proto'),
                        url: `${configService.getVal('AUTH_SERVICE_CLIENT_HOST')}:${configService.getVal('AUTH_SERVICE_CLIENT_PORT')}`,
                    },
                }),
            },
        ]),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export default class AuthModule { }
