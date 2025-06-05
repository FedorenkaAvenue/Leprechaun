import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

import AuthService from "./auth.service";
import { AUTH_PACKAGE } from "./auth.constants";
import ConfigService from "@modules/config/config.service";
import { AUTH_PACKAGE_NAME } from "@gen/auth";

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
                        protoPath: join(__dirname, '../../../../proto/auth.proto'),
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
