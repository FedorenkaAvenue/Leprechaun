import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@modules/category/index.module';
import { ProductModule } from '@modules/product/index.module';
import { FilterModule } from '@modules/filter/index.module';
import { ImageModule } from '@modules/image/index.module';
import { LabelModule } from '@modules/label/index.module';
import ConfigService from '@services/Config';

@Module({
	imports: [
		CategoryModule,
		ProductModule,
		FilterModule,
		ImageModule,
		LabelModule,
		TypeOrmModule.forRoot(new ConfigService().getTypeOrmConfig())
	]
})
export class AppModule {}
