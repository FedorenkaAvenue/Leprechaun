import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as session from 'express-session';

import CategoryModule from './Category';
import ProductModule from './Product';
import DashboardModule from './Dashboard';
import PropertyGroupModule from './PropertyGroup';
import PropertyModule from './Property';
import ImageModule from './Image';
import configService from '@services/Config';
import AdminModule from './Admin';
import UserModule from './User';
import OrderModule from './Order';
import WishlistModule from './Wishlist';
import ScheduleModule from './Sheduler';
import SessionModule from './Session';
import HistoryModule from './History';
import CacheModule from './Cache';
import FSModule from './FS';
import TransModule from './Trans';
import CacheResetMiddleware from '@middlewares/CacheReset';
import ProductPrivateController from '@controllers/Product/private';
import CategoryPrivateController from '@controllers/Category/private';
import PropertyPrivateController from '@controllers/Property/private';
import ProductPublicController from '@controllers/Product/public';
import UserPublicController from '@controllers/User/public';
import OrderPublicController from '@controllers/Order/public';
import WishlistPublicController from '@controllers/Wishlist/public';
import HistoryPublicController from '@controllers/History/public';
import SesssionInitMiddleware from '@middlewares/SessionInit';
import DashboardPublicController from '@controllers/Dashboard/public';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => configService.getTypeOrmConfig(),
        }),
        CategoryModule,
        ProductModule,
        DashboardModule,
        OrderModule,
        WishlistModule,
        UserModule,
        HistoryModule,
        PropertyGroupModule,
        PropertyModule,
        ImageModule,
        ScheduleModule,
        AdminModule,
        SessionModule,
        CacheModule,
        FSModule,
        TransModule,
    ],
})
export default class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CacheResetMiddleware)
            .exclude({ path: '(.*)', method: RequestMethod.GET })
            .forRoutes(ProductPrivateController, CategoryPrivateController, PropertyPrivateController);
        consumer
            .apply(session(configService.getSessionConfig()))
            .forRoutes(
                ProductPublicController,
                UserPublicController,
                OrderPublicController,
                WishlistPublicController,
                HistoryPublicController,
                DashboardPublicController,
            );
        consumer.apply(SesssionInitMiddleware).forRoutes(UserPublicController);
    }
}
