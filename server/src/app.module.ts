import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@modules/category/index.module';
import { ProductModule } from '@modules/product/index.module';
import { FilterModule } from '@modules/filter/index.module';
import ConfigService from '@services/Config';
import { ImageModule } from '@modules/image/index.module';

@Module({
	imports: [
		CategoryModule,
		ProductModule,
		FilterModule,
		ImageModule,
		TypeOrmModule.forRoot(new ConfigService().getTypeOrmConfig())
	]
})
export class AppModule {}
