import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { PRODUCT_PACKAGE_NAME } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

import ProductService from "./product.service";
import { PRODUCT_PACKAGE } from "./product.constants";
import ConfigService from "@modules/config/config.service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: PRODUCT_PACKAGE,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: PRODUCT_PACKAGE_NAME,
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/product.proto'),
                        url: `${configService.getVal('PRODUCT_SERVICE_CLIENT_HOST')}:${configService.getVal('PRODUCT_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                            defaults: true,
                        }
                    },
                }),
            },
        ]),
    ],
    providers: [ProductService],
    exports: [ProductService, ClientsModule],
})
export default class ProductModule { }
