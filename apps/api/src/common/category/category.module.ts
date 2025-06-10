import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

import CategoryService from "./category.service";
import { CATEGORY_PACKAGE } from "./category.constant";
import ConfigService from "@modules/config/config.service";
import { CATEGORY_PACKAGE_NAME } from "@gen/category";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: CATEGORY_PACKAGE,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: CATEGORY_PACKAGE_NAME,
                        protoPath: join(__dirname, '../../../../proto/category.proto'),
                        url: `${configService.getVal('CATEGORY_SERVICE_CLIENT_HOST')}:${configService.getVal('CATEGORY_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                            defaults: true,
                        }
                    },
                }),
            },
        ]),
    ],
    providers: [CategoryService],
    exports: [CategoryService, ClientsModule],
})
export default class CategoryModule { }
