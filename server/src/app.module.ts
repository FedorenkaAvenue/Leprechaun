import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@modules/Category';
import { ProductModule } from '@modules/Product';
import { PropertyModule } from '@modules/Property';
import { ImageModule } from '@modules/Image';
import { LabelModule } from '@modules/Label';
import { SearchModule } from '@modules/Search';
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
export class AppModule {}
