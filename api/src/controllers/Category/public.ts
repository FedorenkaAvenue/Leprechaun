import { Controller, Get, Param, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import CategoryPublicService from '@services/Category/public';
import { CategoryPublic } from '@dto/Category/constructor';

@Controller('category')
@ApiTags('Category 🧑‍💻')
@UseInterceptors(CacheInterceptor)
export default class CategoryPublicController {
    constructor(private readonly categoryService: CategoryPublicService) {}

    @Get('list')
    @ApiOperation({ summary: 'get all public categories 💾' })
    @ApiOkResponse({ type: CategoryPublic, isArray: true })
    getAllCategories(): Promise<CategoryPublic[]> {
        return this.categoryService.getCategoryList();
    }

    @Get(':category')
    @ApiOperation({ summary: 'get category info by URL 💾' })
    @ApiOkResponse({ type: CategoryPublic })
    @ApiNotFoundResponse({ description: 'category not found' })
    getCategory(@Param('category') category: string): Promise<CategoryPublic> {
        return this.categoryService.getCategory(category);
    }
}
