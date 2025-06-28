import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import SubscriptionEntity from "./subscription.entity";
import SubscriptionController from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";
import SubscriptionListener from "./subscription.listener";

@Module({
    imports: [
        TypeOrmModule.forFeature([SubscriptionEntity]),
    ],
    controllers: [SubscriptionController, SubscriptionListener],
    providers: [SubscriptionService],
})
export default class SubsciptionModule { }
