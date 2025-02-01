import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import UserEntity from "@entities/User";
import UserService from "@services/User";
import UserPrivateController from "@controllers/User/private";
import UserPrivateService from "@services/User/private";

@Module({
    controllers: [UserPrivateController],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, UserPrivateService],
    exports: [UserService],
})
export default class UserModule { }
