import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

import AuthController from "@controllers/Auth";
import AuthService from "@services/Auth";
import UserModule from "./User";
import { singleConfigService } from "@services/Config";
import AuthPrivateController from "@controllers/Auth/private";
import AuthPrivateService from "@services/Auth/private";

@Module({
    controllers: [AuthController, AuthPrivateController],
    imports: [
        UserModule,
        JwtModule.register(singleConfigService.getJWTModuleConfig()),
    ],
    providers: [AuthService, AuthPrivateService, JwtService],
})
export default class AuthModule { }
