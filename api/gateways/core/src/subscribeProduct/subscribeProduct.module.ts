import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import SubscribeProductEntity from "./subscribeProduct.entity";
import SubscribeProductService from "./subscribeProduct.service";
import ConfigService from "../config/config.service";
import ConfigModule from "../config/config.module";
import MailModule from '@shared/modules/mail/mail.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SubscribeProductEntity]),
        MailModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf,
        }),
    ],
    providers: [SubscribeProductService],
    exports: [SubscribeProductService, TypeOrmModule],
})
export default class SubscribeProductModule { }
