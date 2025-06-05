import { Global, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

import ConfigService from "../config/config.service";

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getJWTModuleConfig(),
        }),
    ],
    providers: [JwtService],
    exports: [JwtService],
})
export default class JWTModule { }
