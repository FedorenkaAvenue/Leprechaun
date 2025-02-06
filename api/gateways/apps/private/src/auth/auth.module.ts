import { Module } from "@nestjs/common";

import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import CryptoModule from '@core/crypto/crypto.module';
import AuthCoreModule from '@core/auth/auth.module';
import UserModule from "@core/user/user.module";

@Module({
    imports: [AuthCoreModule, CryptoModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export default class AuthModule { }
