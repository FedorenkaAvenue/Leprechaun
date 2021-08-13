import { Controller, Get, Param, Body, UseInterceptors, Delete, Patch, Post, UploadedFile } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult, UpdateResult } from 'typeorm';

import { NotFoundInterceptor, AffectedInterceptor } from '@interceptors/DB';
import { CategoriesService, CategoryService } from './index.service';
import { CategoryBaseEntity, CategoryEntity } from './index.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from './index.dto';
import { ProductBaseEntity, ProductEntity } from '@modules/product/index.entity';
import { MulterService } from '@services/Multer';

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
	@ApiOperation({ summary: 'get category info by url' })
	@ApiOkResponse({ type: CategoryEntity })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(@Param('category') category: string): Promise<CategoryEntity> {
		return this.categoryService.getCategory(category);
	}

	@Get(':category/products')
	@ApiOperation({ summary: 'get category products' })
	@ApiOkResponse({ type: ProductBaseEntity, isArray: true })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategoryProducts(@Param('category') categoryUrl: string): Promise<ProductEntity[]> {
		return this.categoryService.getCategoryProducts(categoryUrl);
	}

	@Post()
	@UseInterceptors(FileInterceptor(
		'icon',
		{ fileFilter: new MulterService().fileFilterOption('svg') }
	))
	@ApiOperation({ summary: 'add new category' })
	@ApiCreatedResponse({ type: CategoryBaseEntity })
	addCategory(
		@Body() body: CreateCategoryDTO,
		@UploadedFile() icon: Express.Multer.File
	): Promise<CategoryBaseEntity> {
		return this.categoryService.createCategory(body, icon);
	}

	@Patch()
	@UseInterceptors(AffectedInterceptor)
	@ApiOperation({ summary: 'update category' })
	@ApiOkResponse({ status: 200 })
	updateCategory(@Body() body: UpdateCategoryDTO): Promise<UpdateResult> {
		return this.categoryService.updateCategory(body);
	}

	@Delete(':category')
	@UseInterceptors(AffectedInterceptor)
	@ApiOperation({ summary: 'delete category by id' })
	@ApiOkResponse({ description: 'success' })
	@ApiNotFoundResponse({ description: 'category not found' })
	deleteCategory(@Param('category') categoryId: number): Promise<DeleteResult> {
		return this.categoryService.deleteCategory(categoryId);
	}
}
