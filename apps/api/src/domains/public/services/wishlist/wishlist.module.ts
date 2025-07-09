import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { WISHLIST_PACKAGE_NAME } from "@fedorenkaavenue/leprechaun_lib_entities/server/wishlist";

import WishlistPublicService from "./wishlist.service";
import WishlistPublicController from "./wishlist.controller";
import ConfigService from "@modules/config/config.service";
import { WISHLIST_PACKAGE } from "./wishlist.constants";
import UserModule from "@common/user/user.module";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: WISHLIST_PACKAGE,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: WISHLIST_PACKAGE_NAME,
                        protoPath: join(process.cwd(), 'node_modules/@fedorenkaavenue/leprechaun_lib_entities/src/proto/wishlist.proto'),
                        url: `${configService.getVal('WISHLIST_SERVICE_CLIENT_HOST')}:${configService.getVal('WISHLIST_SERVICE_CLIENT_PORT')}`,
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
    controllers: [WishlistPublicController],
    providers: [WishlistPublicService],
    exports: [ClientsModule],
})
export default class WishlistPublicModule { }
