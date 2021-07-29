import { Controller, Get, Put, Param, HttpCode, Body, UseInterceptors, Delete, Patch } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NotFoundInterceptor, DeletedInterceptor } from '@interceptors/db';
import { CategoryService } from './index.service';
import { CategoryEntity } from './index.entity';
import { CreateCategoryDTO } from './index.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get(':category')
	@UseInterceptors(NotFoundInterceptor)
	@ApiOperation({ summary: 'get exact category' })
	@ApiOkResponse({ type: CategoryEntity })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(@Param('category') category: string): Promise<CategoryEntity> {
		return this.categoryService.getCategory(category);
	}

	@Put()
	@HttpCode(201)
	@ApiOperation({ summary: 'add new category' })
	@ApiCreatedResponse({ type: CategoryEntity })
	addCategory(@Body() body: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryService.createCategory(body);
	}

	@Patch()
	@ApiOperation({ summary: 'update category' })
	@ApiOkResponse({ type: CategoryEntity })
	updateCategory(@Body() body: CategoryEntity): Promise<CategoryEntity> {
		return this.categoryService.updateCategory(body);
	}

	@Delete(':category')
	@UseInterceptors(DeletedInterceptor)
	@ApiOperation({ summary: 'delete category' })
	@ApiOkResponse({ description: 'success' })
	@ApiNotFoundResponse({ description: 'category not found' })
	deleteCategory(@Param('category') category: string) {
		return this.categoryService.deleteCategory(category);
	}
}

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	@ApiOperation({ summary: 'get main categories' })
	@ApiOkResponse({ type: CategoryEntity, isArray: true })
	getMainCategories(): Promise<CategoryEntity[]> {
		return this.categoryService.getMainCategories();
	}

	@Get('/all')
	@ApiOperation({ summary: 'get all categories' })
	@ApiOkResponse({ type: CategoryEntity, isArray: true })
	getAllCategories(): Promise<CategoryEntity[]> {
		return this.categoryService.getAllCategories();
	}
}
