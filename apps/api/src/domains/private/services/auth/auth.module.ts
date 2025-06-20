import { Module } from "@nestjs/common";

import AuthPrivateController from "./auth.controller";
import AuthModule from "@common/auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [AuthPrivateController],
})
export default class AuthPrivateModule { }
