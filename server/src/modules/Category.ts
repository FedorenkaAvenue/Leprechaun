import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { CategoryController } from '@controllers/Category';
import { CategoryEntity } from '@entities/Category';
import { CategoryService } from '@services/Category';
import { FSService } from '@services/FS';

@Module({
	imports: [
		TypeOrmModule.forFeature([CategoryEntity]),
		MulterModule.registerAsync({ useClass: FSService })
	],
	controllers: [ CategoryController ],
	providers: [
		CategoryService,
		FSService
	],
})
export class CategoryModule {}
