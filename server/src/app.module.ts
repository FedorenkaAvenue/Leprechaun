import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@modules/category/index.module';
import { ProductModule } from '@modules/product/index.module';
// import { LabelModule } from '@modules/label/index.module';
import ConfigService from '@services/config';

@Module({
	imports: [
		CategoryModule,
		ProductModule,
		// LabelModule,
		TypeOrmModule.forRoot(new ConfigService().getTypeOrmConfig())
	]
})
export class AppModule { }
