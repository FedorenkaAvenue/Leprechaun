import { Controller, Get, Param, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoryService } from '@services/Category';
import { ICategoryPublic } from '@interfaces/Category';
import { CategoryPublic } from '@dto/Category/constructor';

@Controller('category')
@ApiTags('Category 🧑‍💻')
@UseInterceptors(CacheInterceptor)
export default class CategoryPublicController {
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
