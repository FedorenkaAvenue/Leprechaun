import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import UserEntity from "@entities/User";
import UserService from "@services/User";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService],
    exports: [UserService],
})
export default class UserModule { }
