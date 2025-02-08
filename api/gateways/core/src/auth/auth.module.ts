import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import ConfigService from "../config/config.service";
import ConfigModule from "../config/config.module";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getJWTModuleConfig(),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
    exports: [JwtService, AuthService, ConfigModule],
})
export default class AuthModule { }
