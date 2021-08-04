import { Controller, Get, Put, Param, HttpCode, Body, UseInterceptors, Delete, Patch } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NotFoundInterceptor, DeletedInterceptor } from '@interceptors/db';
import { CategoriesService, CategoryService } from './index.service';
import { CategoryEntity } from './index.entity';
import { CreateCategoryDTO } from './index.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}

	// @Get()
	// @ApiOperation({ summary: 'get main categories' })
	// @ApiOkResponse({ type: CategoryEntity, isArray: true })
	// getMainCategories(): Promise<CategoryEntity[]> {
	// 	return this.categoryService.getMainCategories();
	// }

	@Get('/list')
	@ApiOperation({ summary: 'get all categories' })
	@ApiOkResponse({ type: CategoryEntity, isArray: true })
	getAllCategories(): Promise<CategoryEntity[]> {
		return this.categoryService.getAllCategories();
	}
}

@ApiTags('Category')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get(':category')
	@UseInterceptors(NotFoundInterceptor)
	@ApiOperation({ summary: 'get category by url' })
	@ApiOkResponse({ type: CategoryEntity })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(@Param('category') category: string): Promise<CategoryEntity> {
		return this.categoryService.getCategory(category);
	}

	@Put()
	@ApiOperation({ summary: 'add new category' })
	@ApiCreatedResponse({ type: CategoryEntity })
	addCategory(@Body() body: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryService.createCategory(body);
	}

	@Patch()
	@ApiOperation({ summary: 'update category info' })
	@ApiOkResponse({ type: CategoryEntity })
	updateCategory(@Body() body: CategoryEntity): Promise<CategoryEntity> {
		return this.categoryService.createCategory(body);
	}

	@Delete(':category')
	@UseInterceptors(DeletedInterceptor)
	@ApiOperation({ summary: 'delete category by url' })
	@ApiOkResponse({ description: 'success' })
	@ApiNotFoundResponse({ description: 'category not found' })
	deleteCategory(@Param('category') category: string) {
		return this.categoryService.deleteCategory(category);
	}
}
