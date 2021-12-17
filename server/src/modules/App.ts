import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CategoryModule from './Category';
import ProductModule from './Product';
import PropertyGroupModule from './PropertyGroup';
import PropertyModule from './Property';
import ImageModule from './Image';
import LabelModule from './Label';
import ToolModule from './Tool';
import ConfigService from '@services/Config';
import AdminModule from './Admin';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ ConfigService ],
			useFactory: async (configService: ConfigService) => configService.getTypeOrmConfig()
		}),
		CategoryModule,
		ProductModule,
		PropertyGroupModule,
		PropertyModule,
		ImageModule,
		LabelModule,
		ToolModule,
		AdminModule
	],
	providers: []
})
export default class AppModule {}
