import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@modules/category/index.module';
import { ProductModule } from '@modules/product/index.module';
import ConfigService from '@services/envConfig';

@Module({
	imports: [
		CategoryModule,
		ProductModule,
		TypeOrmModule.forRoot(new ConfigService().getTypeOrmConfig())
	]
})
export class AppModule {}
