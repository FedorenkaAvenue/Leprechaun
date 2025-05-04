import { Module } from "@nestjs/common";

import EmployerController from "./employer.controller";
import EmployerService from "./employer.service";
import UserModule from '@core/user/user.module';
import AuthModule from "@core/auth/auth.module";

@Module({
    imports: [UserModule, AuthModule],
    controllers: [EmployerController],
    providers: [EmployerService],
})
export default class EmployerModule { }
