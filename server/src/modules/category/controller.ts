import { Controller, Get, Put, Param, HttpCode, Body, UseInterceptors, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryService } from './service';
import { ICategory } from './interface';
import { CategoryEntity } from './entity';
import { NotFoundInterceptor, DeletedInterceptor } from '@interceptors/db';

@ApiTags('category')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

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
	addCategory(@Body() body: ICategory): Promise<CategoryEntity> {
		return this.categoryService.createCategory(body);
	}

	@Delete(':category')
	@UseInterceptors(DeletedInterceptor)
	deleteCategory(@Param('category') category: string) {
		return this.categoryService.deleteCategory(category);
	}
}
