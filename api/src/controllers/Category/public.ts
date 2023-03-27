import { Controller, Get, Param, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import CategoryPublicService from '@services/Category/public';
import { CategoryPublic } from '@dto/Category/constructor';
import Queries from '@decorators/Query';
import { QueriesCommon } from '@dto/Queries/constructor';

@Controller('category')
@ApiTags('Category 🧑‍💻')
@UseInterceptors(CacheInterceptor)
export default class CategoryPublicController {
    constructor(private readonly categoryService: CategoryPublicService) {}

    @Get('list')
    @ApiOperation({ summary: 'get all public categories 💾' })
    @ApiOkResponse({ type: CategoryPublic, isArray: true })
    private getAllCategories(@Queries() queries: QueriesCommon): Promise<CategoryPublic[]> {
        return this.categoryService.getCategoryList(queries);
    }

    @Get(':categoryURL')
    @ApiOperation({ summary: 'get category info by URL 💾' })
    @ApiOkResponse({ type: CategoryPublic })
    @ApiNotFoundResponse({ description: 'category not found' })
    private getCategory(@Param('categoryURL') categoryURL: string, @Queries() queries: QueriesCommon): Promise<CategoryPublic> {
        return this.categoryService.getCategory(categoryURL, queries);
    }
}
