import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { PRODUCT_PACKAGE_NAME } from '@fedorenkaavenue/leprechaun_lib_entities/server/product';

import ConfigModule from "../config/config.module";
import ConfigService from "../config/config.service";
import ProductService from "./product.service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'PRODUCT_PACKAGE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: PRODUCT_PACKAGE_NAME,
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/product.proto'),
                        url: `${configService.getVal('PRODUCT_SERVICE_CLIENT_HOST')}:${configService.getVal('PRODUCT_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                        },
                    },
                })
            },
        ]),
    ],
    providers: [ProductService],
    exports: [ProductService],
})
export default class ProductModule { }
