import {
	Controller, Get, Param, Body, UseInterceptors, Delete, Patch, Post, UploadedFile, ValidationPipe
} from '@nestjs/common';
import {
	ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse,
	ApiOperation, ApiTags, OmitType
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult, UpdateResult } from 'typeorm';

import { NotFoundInterceptor, AffectedInterceptor } from '@interceptors/responce';
import { CategoryService } from '@services/Category';
import { CategoryEntity } from '@entities/Category';
import { CategoryPublicDTO, CreateCategoryDTO } from '@dto/Category';
import { FSService } from '@services/FS';
import { ICategory, ICategoryPublic } from '@interfaces/Category';

const TCategoryAdmin = OmitType(CategoryEntity, ['products']);

@ApiTags('Category (client)')
@Controller('category')
export class CategoryPublicController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get('list')
	@ApiOperation({ summary: 'get all public categories' })
	@ApiOkResponse({ type: CategoryPublicDTO, isArray: true })
	getAllCategories(): Promise<ICategoryPublic[]> {
		return this.categoryService.getPublicCategories();
	}

	@Get(':category')
	@ApiOperation({ summary: 'get category info by URL' })
	@ApiOkResponse({ type: CategoryPublicDTO })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(@Param('category') category: string): Promise<ICategoryPublic> {
		return this.categoryService.getPublicCategory(category);
	}
}

@ApiTags('Category (admin)')
@Controller('adm/category')
export class CategoryAdminController {
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
	@ApiOkResponse({ type: TCategoryAdmin, isArray: true })
	getAllCategories(): Promise<ICategory[]> {
		return this.categoryService.getAdminCategories();
	}

	@Get(':category')
	@UseInterceptors(NotFoundInterceptor)
	@ApiOperation({ summary: 'get category info by URL' })
	@ApiOkResponse({ type: TCategoryAdmin })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(@Param('category') category: string): Promise<ICategory> {
		return this.categoryService.getAdminCategory(category);
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
