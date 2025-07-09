import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { SUBSCRIPTION_PACKAGE_NAME } from "@fedorenkaavenue/leprechaun_lib_entities/server/subscription";

import ConfigService from "@modules/config/config.service";
import { SUBSCRIPTION_PACKAGE } from "./subscription.constants";
import SubscriptionPublicController from "./subscription.controller";
import SubscriptionPublicService from "./subscription.service";
import UserModule from "@common/user/user.module";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: SUBSCRIPTION_PACKAGE,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: SUBSCRIPTION_PACKAGE_NAME,
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/subscription.proto'),
                        url: `${configService.getVal('SUBSCRIPTION_SERVICE_CLIENT_HOST')}:${configService.getVal('SUBSCRIPTION_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                            defaults: true,
                        }
                    },
                }),
            },
        ]),
        UserModule,
    ],
    controllers: [SubscriptionPublicController],
    providers: [SubscriptionPublicService],
    exports: [ClientsModule],
})
export default class SubscriptionPublicModule { }
