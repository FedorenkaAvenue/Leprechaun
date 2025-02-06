import { Module } from "@nestjs/common";

import SubscribeProductController from "./subscribeProduct.controller";
import SubscribeProductService from "./subscribeProduct.service";
import SubscribeProductCoreModule from '@core/subscribeProduct/subscribeProduct.module';

@Module({
    imports: [SubscribeProductCoreModule],
    controllers: [SubscribeProductController],
    providers: [SubscribeProductService],
})
export default class SubscribeProductModule { }
