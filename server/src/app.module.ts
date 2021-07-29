import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@modules/category/index.module';
import ConfigService from '@services/config';

@Module({
	imports: [
		CategoryModule,
		TypeOrmModule.forRoot(new ConfigService().getTypeOrmConfig())
	]
})
export class AppModule { }
