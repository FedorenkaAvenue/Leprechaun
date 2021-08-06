import { Controller, Get, Param, Body, UseInterceptors, Delete, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NotFoundInterceptor, DeletedInterceptor } from '@interceptors/db';
import { CategoriesService, CategoryService } from './index.service';
import { CategoryBaseEntity, CategoryEntity } from './index.entity';
import { CreateCategoryDTO } from './index.dto';
import { ProductEntity } from '@modules/product/index.entity';

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
	@ApiOkResponse({ type: CategoryBaseEntity, isArray: true })
	getAllCategories(): Promise<CategoryBaseEntity[]> {
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

	@Get(':category/products')
	@ApiOperation({ summary: 'get category products' })
	@ApiOkResponse({ type: ProductEntity, isArray: true })
	getCategoryProducts(@Param('category') categoryUrl: string): Promise<ProductEntity[]> {
		return this.categoryService.getCategoryProducts(categoryUrl);
	}

	@Post()
	@ApiOperation({ summary: 'add new category' })
	@ApiCreatedResponse({ type: CategoryBaseEntity })
	addCategory(@Body() body: CreateCategoryDTO): Promise<CategoryBaseEntity> {
		return this.categoryService.createCategory(body);
	}

	@Patch()
	@ApiOperation({ summary: 'update category' })
	@ApiOkResponse({ type: CategoryBaseEntity })
	updateCategory(@Body() body: CategoryBaseEntity): Promise<CategoryBaseEntity> {
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
