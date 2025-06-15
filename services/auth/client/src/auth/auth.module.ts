import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import UserModule from "@common/user/user.module";
import CryptoModule from "@common/crypto/crypto.module";
import ConfigModule from "@common/config/config.module";
import ConfigService from "@common/config/config.service";

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
