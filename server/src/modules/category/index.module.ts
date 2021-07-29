import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController, CategoriesController } from './index.controller';
import { CategoryEntity } from './index.entity';
import { CategoryService } from './index.service';

@Module({
	imports: [ TypeOrmModule.forFeature([CategoryEntity]) ],
	controllers: [ CategoryController, CategoriesController ],
	providers: [ CategoryService ],
})
export class CategoryModule {}
