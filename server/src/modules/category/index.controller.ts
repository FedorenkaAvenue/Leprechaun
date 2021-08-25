import {
	Controller, Get, Param, Body, UseInterceptors, Delete, Patch, Post, UploadedFile, Req, Query
} from '@nestjs/common';
import {
	ApiCreatedResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery,
	ApiTags
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Request } from 'express';

import { NotFoundInterceptor, AffectedInterceptor } from '@interceptors/DB';
import { CategoriesService, CategoryService } from './index.service';
import { CategoryBaseEntity, CategoryEntity } from './index.entity';
import { CreateCategoryDTO } from './index.dto';
import { ProductBaseEntity } from '@modules/product/index.entity';
import { MulterService } from '@services/Multer';
import { PaginationOptionsDTO, SearchResult } from '@dto/search';
import { PaginationEmptyInterceptor } from '@interceptors/search';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}

	@Get('list')
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
	@ApiOkResponse({ type: CategoryBaseEntity })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(@Param('category') category: string): Promise<CategoryEntity> {
		return this.categoryService.getCategory(category);
	}

	@Get('products/:category')
	@UseInterceptors(PaginationEmptyInterceptor)
	@ApiOperation({ summary: 'get category products' })
	@ApiQuery({ name: 'page', required: false, description: 'page number' })
	@ApiOkResponse({ type: ProductBaseEntity, isArray: true })
	@ApiNotFoundResponse({ description: 'category not found' })
	@ApiNotAcceptableResponse({ description: 'pagination page is empty' })
	getCategoryProducts(
		@Req() { cookies: { pageLimit } }: Request,
		@Query('page') page: number,
		@Param('category') categoryUrl: string
	): Promise<SearchResult> {
		return this.categoryService.getCategoryProducts(categoryUrl, new PaginationOptionsDTO(page, pageLimit));
	}

	@Post()
	@UseInterceptors(FileInterceptor(
		'icon',
		{ fileFilter: MulterService.fileFilterOption('svg') }
	))
	@ApiOperation({ summary: 'add new category' })
	@ApiCreatedResponse({ type: CategoryBaseEntity })
	addCategory(
		@Body() body: CreateCategoryDTO,
		@UploadedFile() icon: Express.Multer.File
	): Promise<void> {
		return this.categoryService.createCategory(body, icon);
	}

	// @Patch()
	// @UseInterceptors(FileInterceptor(
	// 	'icon',
	// 	{ fileFilter: MulterService.fileFilterOption('svg') }
	// ))
	// @UseInterceptors(AffectedInterceptor)
	// @ApiOperation({ summary: 'update category' })
	// @ApiOkResponse({ status: 200 })
	// updateCategory(
	// 	@Body() body: UpdateCategoryDTO,
	// 	@UploadedFile() icon: Express.Multer.File
	// ): Promise<UpdateResult> {
	// 	return this.categoryService.updateCategory(body, icon);
	// }

	@Delete(':category')
	@UseInterceptors(AffectedInterceptor)
	@ApiOperation({ summary: 'delete category by id' })
	@ApiOkResponse({ description: 'success' })
	@ApiNotFoundResponse({ description: 'category not found' })
	deleteCategory(@Param('category') categoryId: number): Promise<DeleteResult> {
		return this.categoryService.deleteCategory(categoryId);
	}
}
