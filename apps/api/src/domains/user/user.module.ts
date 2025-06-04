import { Module } from "@nestjs/common";

import UserService from "./user.service";
import { GrpcClientsModule } from "@modules/gRPC/gRPC.module";
import UserController from "./user.controller";

@Module({
    imports: [GrpcClientsModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export default class UserModule { }
