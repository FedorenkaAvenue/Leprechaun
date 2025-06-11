import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

import ConfigModule from "../config/config.module";
import ConfigService from "../config/config.service";
import CategoryService from "./category.service";
import { CATEGORY_PACKAGE_NAME } from "gen/ts/category";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'CATEGORY_PACKAGE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: CATEGORY_PACKAGE_NAME,
                        protoPath: join(__dirname, '../../../../proto/category.proto'),
                        url: `${configService.getVal('CATEGORY_SERVICE_CLIENT_HOST')}:${configService.getVal('CATEGORY_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                        },
                    },
                })
            },
        ]),
    ],
    providers: [CategoryService],
    exports: [CategoryService],
})
export default class CategoryModule { }
