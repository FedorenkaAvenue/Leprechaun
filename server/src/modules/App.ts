import { Module } from '@nestjs/common';
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
export default class AppModule {}
