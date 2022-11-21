import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as session from 'express-session';

import CategoryModule from './Category';
import ProductModule from './Product';
import PropertyGroupModule from './PropertyGroup';
import PropertyModule from './Property';
import ImageModule from './Image';
import ToolModule from './Tool';
import configService from '@services/Config';
import AdminModule from './Admin';
import UserModule from './User';
import OrderModule from './Order';
import WishlistModule from './Wishlist';
import ScheduleModule from './Sheduler';
import SessionModule from './Session';
import HistoryModule from './History';
import CacheReset from '@middlewares/CacheReset';
import ProductAdminController from '@controllers/Product/private';
import CategoryPrivateController from '@controllers/Category/private';
import PropertyAdminController from '@controllers/Property/private';
import ProductCardController from '@controllers/Product/public';
import UserPublicController from '@controllers/User/public';
import OrderPublicController from '@controllers/Order/public';
import WishlistPublicController from '@controllers/Wishlist/public';
import HistoryPublicController from '@controllers/History/public';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => configService.getTypeOrmConfig(),
        }),
        CategoryModule,
        ProductModule,
        OrderModule,
        WishlistModule,
        UserModule,
        HistoryModule,
        PropertyGroupModule,
        PropertyModule,
        ImageModule,
        ToolModule,
        ScheduleModule,
        AdminModule,
        SessionModule,
    ],
})
export default class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CacheReset)
            .exclude({ path: '(.*)', method: RequestMethod.GET })
            .forRoutes(ProductAdminController, CategoryPrivateController, PropertyAdminController);
        consumer
            .apply(session(configService.getSessionConfig()))
            .forRoutes(
                ProductCardController,
                UserPublicController,
                OrderPublicController,
                WishlistPublicController,
                HistoryPublicController,
            );
    }
}
