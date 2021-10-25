import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from './Category';
import { ProductModule } from './Product';
import { PropertyModule } from './Property';
import { ImageModule } from './Image';
import { LabelModule } from './Label';
import { SearchModule } from './Search';
import ConfigService from '@services/Config';

@Module({
	imports: [
		CategoryModule,
		ProductModule,
		PropertyModule,
		ImageModule,
		LabelModule,
		SearchModule,
		TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig())
	]
})
export default class AppModule {}
