import { Controller, Get, Put, Param, HttpCode, Body, UseInterceptors, Delete, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryService } from './index.service';
import { CategoryEntity } from './index.entity';
import { NotFoundInterceptor, DeletedInterceptor } from '@interceptors/db';
import { CreateCategoryDTO } from './index.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	getMainCategories(): Promise<CategoryEntity[]> {
		return this.categoryService.getMainCategories();
	}

	@Get('/all')
	getAllCategories(): Promise<CategoryEntity[]> {
		return this.categoryService.getAllCategories();
	}

	@Get(':category')
	@UseInterceptors(NotFoundInterceptor)
	getCategory(@Param('category') category: string): Promise<CategoryEntity> {
		return this.categoryService.getCategory(category);
	}

	@Put()
	@HttpCode(201)
	addCategory(@Body() body: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryService.createCategory(body);
	}

	@Patch()
	updateCategory(@Body() body: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryService.updateCategory(body);
	}

	@Delete(':category')
	@UseInterceptors(DeletedInterceptor)
	deleteCategory(@Param('category') category: string) {
		return this.categoryService.deleteCategory(category);
	}
}
