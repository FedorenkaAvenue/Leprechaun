import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { TRANS_PACKAGE_NAME } from "@fedorenkaavenue/leprechaun_lib_entities/server/trans";

import TransService from "./trans.service";
import ConfigModule from "../config/config.module";
import ConfigService from "../config/config.service";
import { TRANS_PACKAGE } from "./trans.constants";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: TRANS_PACKAGE,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: TRANS_PACKAGE_NAME,
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/trans.proto'),
                        url: `${configService.getVal('TRANS_SERVICE_CLIENT_HOST')}:${configService.getVal('TRANS_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                        },
                    },
                })
            },
        ]),
    ],
    providers: [TransService],
    exports: [TransService],
})
export default class TransModule { }
