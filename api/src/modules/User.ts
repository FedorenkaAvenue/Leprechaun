import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import UserEntity from "@entities/User";
import UserService from "@services/User";
import UserPrivateService from "@services/User/private";
import EmployerPrivateController from "@controllers/Employer/private";

@Module({
    controllers: [EmployerPrivateController],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, UserPrivateService],
    exports: [UserService],
})
export default class UserModule { }
