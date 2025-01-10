import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as session from 'express-session';
import { APP_FILTER } from '@nestjs/core';

import CategoryModule from './Category';
import ProductModule from './Product';
import PropertyGroupModule from './PropertyGroup';
import PropertyModule from './Property';
import ImageModule from './Image';
import AdminModule from './Admin';
import OrderModule from './Order';
import WishlistModule from './Wishlist';
import ScheduleModule from './Sheduler';
import SessionModule from './Session';
import HistoryModule from './History';
import CacheModule from './Cache';
import ToolModule from './Tool';
import EventModule from './Event';
import CacheResetMiddleware from '@middlewares/CacheReset';
import ProductPrivateController from '@controllers/Product/private';
import CategoryPrivateController from '@controllers/Category/private';
import PropertyPrivateController from '@controllers/Property/private';
import { TransEntity } from '@entities/Trans';
import ConfigService from '@services/Config';
import UncaughtExceptionFilter from '@filters/UncaughtException';
import { HTTPLogMiddleware } from '@middlewares/HTTPLog';
import OrderPublicController from '@controllers/Order/public';
import ProductPublicController from '@controllers/Product/public';
import WishlistPublicController from '@controllers/Wishlist/public';
import HistoryPublicController from '@controllers/History/public';
import WishlistItemPublicController from '@controllers/WishlistItem/public';

@Module({
    imports: [
        ToolModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getDBConnectionData(),
            name: 'default',
        }),
        TypeOrmModule.forFeature([TransEntity]),
        CategoryModule,
        ProductModule,
        OrderModule,
        WishlistModule,
        HistoryModule,
        PropertyGroupModule,
        PropertyModule,
        ImageModule,
        ScheduleModule,
        AdminModule,
        SessionModule,
        CacheModule,
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
            .apply(CacheResetMiddleware)
            .exclude({ path: '(.*)', method: RequestMethod.GET })
            .forRoutes(ProductPrivateController, CategoryPrivateController, PropertyPrivateController);
        consumer
            .apply(session(this.configService.getSessionConfig()))
            .forRoutes(
                ProductPublicController,
                OrderPublicController,
                WishlistPublicController,
                WishlistItemPublicController,
                HistoryPublicController,
            );
    }
}
