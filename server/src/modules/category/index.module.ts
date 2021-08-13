import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { CategoryController, CategoriesController } from './index.controller';
import { CategoryEntity } from './index.entity';
import { CategoriesService, CategoryService } from './index.service';
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
