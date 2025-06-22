import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

import HistoryPublicController from "./history.controller";
import HistoryPublicService from "./history.service";
import { HISTORY_PACKAGE } from "./wishlist.constants";
import ConfigService from "@modules/config/config.service";
import { HISTORY_PACKAGE_NAME } from "@gen/history";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: HISTORY_PACKAGE,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: HISTORY_PACKAGE_NAME,
                        protoPath: join(__dirname, '../../../../../../proto/history.proto'),
                        url: `${configService.getVal('HISTORY_SERVICE_CLIENT_HOST')}:${configService.getVal('HISTORY_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                            defaults: true,
                        }
                    },
                }),
            },
        ]),
    ],
    controllers: [HistoryPublicController],
    providers: [HistoryPublicService],
    exports: [ClientsModule],
})
export default class HistoryPublicModule { }
