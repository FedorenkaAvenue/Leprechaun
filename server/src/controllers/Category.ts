import {
	Controller, Get, Param, Body, UseInterceptors, Delete, Post, UploadedFile,
	ValidationPipe, CacheInterceptor
} from '@nestjs/common';
import {
	ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse,
	ApiOperation, ApiTags, OmitType
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';

import { CategoryService } from '@services/Category';
import { CategoryEntity } from '@entities/Category';
import { CreateCategoryDTO } from '@dto/Category';
import { FSService } from '@services/FS';
import { ICategory, ICategoryPublic } from '@interfaces/Category';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { CategoryPublic } from '@dto/Category/constructor';

const TCategoryAdmin = OmitType(CategoryEntity, ['products']);

@Controller('category')
@ApiTags('Category 🧑‍💻')
@UseInterceptors(CacheInterceptor)
export class CategoryPublicController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get('list')
	@ApiOperation({ summary: 'get all public categories 💾' })
	@ApiOkResponse({ type: CategoryPublic, isArray: true })
	getAllCategories(): Promise<ICategoryPublic[]> {
		return this.categoryService.getPublicCategories();
	}

	@Get(':category')
	@ApiOperation({ summary: 'get category info by URL 💾' })
	@ApiOkResponse({ type: CategoryPublic })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(
		@Param('category') category: string
	): Promise<ICategoryPublic> {
		return this.categoryService.getPublicCategory(category);
	}
}

@Controller('adm/category')
@ApiTags('Category 🤵🏿‍♂️')
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
	@UseInterceptors(UndefinedResultInterceptor)
	@ApiOperation({ summary: 'get category info by URL' })
	@ApiOkResponse({ type: TCategoryAdmin })
	@ApiNotFoundResponse({ description: 'category not found' })
	getCategory(
		@Param('category') category: string
	): Promise<ICategory> {
		return this.categoryService.getAdminCategory(category);
	}

	@Delete(':category')
	@UseInterceptors(AffectedResultInterceptor)
	@ApiOperation({ summary: 'delete category by ID' })
	@ApiOkResponse({ description: 'success' })
	@ApiNotFoundResponse({ description: 'category not found' })
	deleteCategory(
		@Param('category') categoryId: number
	): Promise<DeleteResult> {
		return this.categoryService.deleteCategory(categoryId);
	}
}
