import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CategoryModule from './Category';
import ProductModule from './Product';
import PropertyGroupModule from './PropertyGroup';
import PropertyModule from './Property';
import ImageModule from './Image';
import ToolModule from './Tool';
import ConfigService from '@services/Config';
import AdminModule from './Admin';
import UserModule from './User';
import OrderModule from './Order';
import WishlistModule from './Wishlist';
import ScheduleModule from './Sheduler';
import { CacheReset } from '@middlewares/CacheReset';
import { ProductAdminController } from '@controllers/Product';
import { CategoryAdminController } from '@controllers/Category';
import { PropertyAdminController } from '@controllers/Property';

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
	}
}
