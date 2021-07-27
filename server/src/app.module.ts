import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from './modules/category/module';

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;

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
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: POSTGRES_HOST,
			port: Number(POSTGRES_PORT),
			username: POSTGRES_USER,
			password: POSTGRES_PASSWORD,
			database: POSTGRES_DATABASE,
			synchronize: true,
			autoLoadEntities: true
		})
	]
})
export class AppModule { }
