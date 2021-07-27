import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@modules/category/module';
import ConfigService from '@services/config';

@Module({
	imports: [
		CategoryModule,
		// routers
		RouterModule.register(
			[
				{
					path: 'category',
					module: CategoryModule
				}
			]
		),
		// db
		TypeOrmModule.forRoot(new ConfigService().getTypeOrmConfig())
	]
})
export class AppModule { }
