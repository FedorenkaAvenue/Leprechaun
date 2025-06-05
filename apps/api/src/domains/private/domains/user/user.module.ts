import { Module } from "@nestjs/common";

import UserPrivateController from "./user.controller";
import UserModule from "@common/user/user.module";

@Module({
    imports: [UserModule],
    controllers: [UserPrivateController],
})
export default class UserPrivateModule { }
