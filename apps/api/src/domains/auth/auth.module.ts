import { Module } from "@nestjs/common";

import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { GrpcClientsModule } from "@modules/gRPC/gRPC.module";

@Module({
    imports: [GrpcClientsModule,],
    controllers: [AuthController],
    providers: [AuthService],
})
export default class AuthModule { }
