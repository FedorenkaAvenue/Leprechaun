import {
	Controller, Get, Param, Body, UseInterceptors, Delete, Patch, Post, UploadedFile, ValidationPipe
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult, UpdateResult } from 'typeorm';

import { NotFoundInterceptor, AffectedInterceptor } from '@interceptors/DB';
import { CategoryService } from '@services/Category';
import { CategoryBaseEntity, CategoryEntity, CategoryWithPropertyGroupsEntity } from '@entities/Category';
import { CreateCategoryDTO } from '@dto/Category';
import { MulterService } from '@services/Multer';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get('list')
	@ApiOperation({ summary: 'get all categories' })
	@ApiOkResponse({ type: CategoryBaseEntity, isArray: true })
	getAllCategories(): Promise<CategoryBaseEntity[]> {
		return this.categoryService.getAllCategories();
	}

	@Get(':category')
	@UseInterceptors(NotFoundInterceptor)
	@ApiOperation({ summary: 'get category info by url' })
	@ApiOkResponse({ type: CategoryWithPropertyGroupsEntity })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(@Param('category') category: string): Promise<CategoryEntity> {
		return this.categoryService.getCategory(category);
	}

	@Post()
	@UseInterceptors(FileInterceptor(
		'icon',
		{ fileFilter: MulterService.fileFilterOption('svg') }
	))
	@ApiOperation({ summary: 'add new category' })
	@ApiCreatedResponse({ description: 'success added' })
	addCategory(
		@Body(new ValidationPipe({ transform: true })) body: CreateCategoryDTO,
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
