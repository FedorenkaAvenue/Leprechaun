import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { HISTORY_PACKAGE_NAME } from "@fedorenkaavenue/leprechaun_lib_entities/server/history";

import HistoryPublicController from "./history.controller";
import HistoryPublicService from "./history.service";
import { HISTORY_PACKAGE } from "./wishlist.constants";
import ConfigService from "@modules/config/config.service";

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
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/history.proto'),
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
