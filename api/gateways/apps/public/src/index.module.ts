import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import * as session from 'express-session';

import CategoryModule from './category/category.module';
import ProductController from './product/product.controller';
import AuthModule from './auth/auth.module';
import OrderController from './order/order.controller';
import WishlistController from './wishlist/wishlist.controller';
import WishlistItemController from './wishlistItem/wishlistItem.controller';
import HistoryProductController from './historyProduct/historyProduct.controller';
import SubscribeProductModule from './subscribeProduct/subscribeProduct.module';
import SubscribeProductController from './subscribeProduct/subscribeProduct.controller';
import ProductModule from './product/product.module';
import HistoryProductModule from './historyProduct/historyProduct.module';
import WishlistModule from './wishlist/wishlist.module';
import WishlistItemModule from './wishlistItem/wishlistItem.module';
import OrderModule from './order/order.module';
import ConfigModule from '@core/config/config.module';
import ConfigService from '@core/config/config.service';
import ImageCoreModule from '@core/image/image.module';
import PropertyCoreModule from '@core/property/property.module';
import PropertyGroupCoreModule from '@core/propertyGroup/propertyGroup.module';
import UncaughtExceptionFilter from '@shared/filters/uncaughtException.filter';
import HTTPLogMiddleware from '@shared/middlewares/HTTPLog.middleware';
import MailModule from '@shared/modules/mail/mail.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getDBConnectionData(),
            name: 'default',
        }),
        ImageCoreModule,
        PropertyCoreModule,
        PropertyGroupCoreModule,
        CategoryModule,
        ProductModule,
        HistoryProductModule,
        WishlistModule,
        WishlistItemModule,
        OrderModule,
        MailModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf,
        }),
        SubscribeProductModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: UncaughtExceptionFilter,
        },
    ],
})
export default class AppModule implements NestModule {
    constructor(private readonly configService: ConfigService) { }

    configure(consumer: MiddlewareConsumer) {
        if (this.configService.isDev) {
            consumer.apply(HTTPLogMiddleware).forRoutes('*');
        }

        consumer
            .apply(session(this.configService.getSessionConfig()))
            .forRoutes(
                ProductController,
                OrderController,
                WishlistController,
                WishlistItemController,
                HistoryProductController,
                SubscribeProductController,
            );
    }
}
