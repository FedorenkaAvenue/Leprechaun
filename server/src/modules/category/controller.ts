import { Controller, Get, Put, Param, HttpCode, Body } from '@nestjs/common';

import { CategoryService } from './service';
import { ICategory } from './interface';
import { CategoryEntity } from './entity';

@Controller()
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

	@Get()
	getMainCategories(): Promise<CategoryEntity[]> {
		return this.categoryService.getMainCategories();
	}

	@Get('/all')
	getAllCategories(): Promise<CategoryEntity[]> {
		return this.categoryService.getAllCategories();
	}

	@Get(':category')
	getCategory(@Param('category') category: string): Promise<CategoryEntity> {
		return this.categoryService.getCategory(category);
	}

	@Put()
	@HttpCode(201)
	addCategory(@Body() body: ICategory) {
		return this.categoryService.createCategory(body);
	}
}
