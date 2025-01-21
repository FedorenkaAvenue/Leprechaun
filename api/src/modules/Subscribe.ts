import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import SubscribeProductEntity from "@entities/SubscribeProduct";
import SubscribePublicService from "@services/Subscribe/public";
import SubscribePublicController from "@controllers/Subscribe/public";

@Module({
    imports: [TypeOrmModule.forFeature([SubscribeProductEntity])],
    controllers: [SubscribePublicController],
    providers: [SubscribePublicService],
})
export default class SubscribeModule { }
