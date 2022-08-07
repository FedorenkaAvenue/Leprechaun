import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as session from 'express-session';

import CategoryModule from './Category';
import ProductModule from './Product';
import PropertyGroupModule from './PropertyGroup';
import PropertyModule from './Property';
import ImageModule from './Image';
import ToolModule from './Tool';
import ConfigService, { singleConfigServie } from '@services/Config';
import AdminModule from './Admin';
import UserModule from './User';
import OrderModule from './Order';
import WishlistModule from './Wishlist';
import ScheduleModule from './Sheduler';
import { CacheReset } from '@middlewares/CacheReset';
import ProductAdminController from '@controllers/Product/admin';
import CategoryAdminController from '@controllers/Category/admin';
import PropertyAdminController from '@controllers/Property/admin';
import ProductPublicController from '@controllers/Product/public';
import UserPublicController from '@controllers/User/public';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ ConfigService ],
			useFactory: async (configService: ConfigService) => configService.getTypeOrmConfig()
		}),
		CategoryModule,
		ProductModule,
		OrderModule,
		WishlistModule,
		UserModule,
		PropertyGroupModule,
		PropertyModule,
		ImageModule,
		ToolModule,
		ScheduleModule,
		AdminModule
	]
})
export default class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(CacheReset)
			.exclude({ path: '(.*)', method: RequestMethod.GET })
			.forRoutes(ProductAdminController, CategoryAdminController, PropertyAdminController)
        consumer
            .apply(session(singleConfigServie.getSessionConfig()))
            .forRoutes(ProductPublicController, UserPublicController)
	}
}
