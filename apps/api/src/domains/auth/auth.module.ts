import { Module } from "@nestjs/common";
// import { JwtModule, JwtService } from "@nestjs/jwt";

import AuthController from "./auth.controller";
import AuthService from "./auth.service";
// import ConfigService from "../config/config.service";
import ConfigModule from "@modules/config/config.module";
import { GrpcClientsModule } from "@modules/gRPC/gRPC.module";

@Module({
    imports: [
        ConfigModule,
        GrpcClientsModule,
        //     JwtModule.registerAsync({
        //         imports: [ConfigModule],
        //         inject: [ConfigService],
        //         useFactory: async (conf: ConfigService) => conf.getJWTModuleConfig(),
        //     }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    // exports: [JwtService, AuthService, ConfigModule],
})
export default class AuthModule { }
