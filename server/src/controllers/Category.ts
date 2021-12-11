import {
	Controller, Get, Param, Body, UseInterceptors, Delete, Patch, Post, UploadedFile, ValidationPipe
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult, UpdateResult } from 'typeorm';

import { NotFoundInterceptor, AffectedInterceptor } from '@interceptors/responce';
import { CategoryService } from '@services/Category';
import { CategoryBaseEntity, CategoryWithPropertyGroupsEntity } from '@entities/Category';
import { CreateCategoryDTO } from '@dto/Category';
import { FSService } from '@services/FS';
import { ICategory } from '@interfaces/Category';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@UseInterceptors(FileInterceptor(
		'icon',
		{ fileFilter: FSService.fileFilterOption('svg') }
	))
	@ApiOperation({ summary: 'add new category' })
	@ApiCreatedResponse({ description: 'success added' })
	addCategory(
		@Body(new ValidationPipe({ transform: true })) body: CreateCategoryDTO,
		@UploadedFile() icon: Express.Multer.File
	): Promise<void> {
		return this.categoryService.createCategory(body, icon);
	}

	@Get('list')
	@ApiOperation({ summary: 'get all categories' })
	@ApiOkResponse({ type: CategoryBaseEntity, isArray: true })
	getAllCategories(): Promise<ICategory[]> {
		return this.categoryService.getAllCategories();
	}

	@Get(':category')
	@UseInterceptors(NotFoundInterceptor)
	@ApiOperation({ summary: 'get category info by URL' })
	@ApiOkResponse({ type: CategoryWithPropertyGroupsEntity })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(@Param('category') category: string): Promise<ICategory> {
		return this.categoryService.getCategory(category);
	}

	@Delete(':category')
	@UseInterceptors(AffectedInterceptor)
	@ApiOperation({ summary: 'delete category by ID' })
	@ApiOkResponse({ description: 'success' })
	@ApiNotFoundResponse({ description: 'category not found' })
	deleteCategory(@Param('category') categoryId: number): Promise<DeleteResult> {
		return this.categoryService.deleteCategory(categoryId);
	}
}
