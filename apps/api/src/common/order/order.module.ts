import { Module } from "@nestjs/common";
import { join } from "path";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ORDER_PACKAGE } from "./order.constants";
import ConfigService from "@modules/config/config.service";
import { ORDER_PACKAGE_NAME } from "@gen/order";
import OrderService from "./order.service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: ORDER_PACKAGE,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: ORDER_PACKAGE_NAME,
                        protoPath: join(__dirname, '../../../../proto/order.proto'),
                        url: `${configService.getVal('ORDER_SERVICE_CLIENT_HOST')}:${configService.getVal('ORDER_SERVICE_CLIENT_PORT')}`,
                        loader: {
                            longs: Number,
                            defaults: true,
                        }
                    },
                }),
            },
        ]),
    ],
    providers: [OrderService],
    exports: [OrderService],
})
export default class OrderModule { }
