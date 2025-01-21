import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import SubscribeProductEntity from "@entities/SubscribeProduct";
import SubscribePublicService from "@services/Subscribe/public";
import SubscribePublicController from "@controllers/Subscribe/public";
import MailModule from "./Mail";

@Module({
    imports: [TypeOrmModule.forFeature([SubscribeProductEntity]), MailModule],
    controllers: [SubscribePublicController],
    providers: [SubscribePublicService],
    exports: [SubscribePublicService],
})
export default class SubscribeModule { }
