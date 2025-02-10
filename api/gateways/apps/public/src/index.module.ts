import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import CategoryModule from './category/category.module';
import AuthModule from './auth/auth.module';
import EventModule from './event/event.module';
import SubscribeProductModule from './subscribeProduct/subscribeProduct.module';
import ProductModule from './product/product.module';
import HistoryProductModule from './historyProduct/historyProduct.module';
import WishlistModule from './wishlist/wishlist.module';
import WishlistItemModule from './wishlistItem/wishlistItem.module';
import OrderModule from './order/order.module';
import ConfigModule from '@core/config/config.module';
import ConfigService from '@core/config/config.service';
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
        MailModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf,
        }),
        AuthModule,
        CategoryModule,
        ProductModule,
        HistoryProductModule,
        WishlistModule,
        WishlistItemModule,
        OrderModule,
        SubscribeProductModule,
        EventModule,
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
            .apply(session(this.configService.getSessionConfig()) as Function)
            .forRoutes('*');

        consumer.apply(cookieParser() as Function)
    }
}
