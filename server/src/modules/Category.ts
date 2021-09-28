import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { CategoryController, CategoriesController } from '@controllers/Category';
import { CategoryEntity } from '@entities/Category';
import { CategoriesService, CategoryService } from '@services/Category';
import { MulterService } from '@services/Multer';

@Module({
	imports: [
		TypeOrmModule.forFeature([CategoryEntity]),
		MulterModule.registerAsync({ useClass: MulterService })
	],
	controllers: [ CategoryController, CategoriesController ],
	providers: [
		CategoriesService,
		CategoryService,
		MulterService
	],
})
export class CategoryModule {}
