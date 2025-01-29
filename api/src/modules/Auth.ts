import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import AuthController from "@controllers/Auth";
import AuthService from "@services/Auth";
import UserModule from "./User";
import { singleConfigService } from "@services/Config";

@Module({
    imports: [
        UserModule,
        JwtModule.register(singleConfigService.getJWTConfig()),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export default class AuthModule { }
