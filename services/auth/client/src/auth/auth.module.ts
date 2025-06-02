import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import UserModule from "../user/user.module";
import CryptoModule from "../crypto/crypto.module";
import ConfigModule from "../config/config.module";
import ConfigService from "../config/config.service";

@Module({
    imports: [
        UserModule,
        CryptoModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getJWTModuleConfig(),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export default class AuthModule { }
