import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import CategoryPublicService from '@services/Category/public';
import Queries from '@decorators/Query';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CategoryPublic } from '@dto/Category/public';
import { CategoryPublicI } from '@interfaces/Category';
import { QueriesCommonI } from '@interfaces/Queries';
import NotFoundInterceptor from '@interceptors/UndefinedResult';

@Controller('category')
@ApiTags('Category 🧑‍💻')
@UseInterceptors(CacheInterceptor)
export default class CategoryPublicController {
    constructor(private readonly categoryService: CategoryPublicService) { }

    @Get('list')
    @ApiOperation({ summary: 'get all public categories 💾' })
    @ApiOkResponse({ type: CategoryPublic, isArray: true })
    private getAllCategories(@Queries() queries: QueriesCommonI): Promise<CategoryPublicI[]> {
        return this.categoryService.getCategoryList(queries);
    }

    @Get(':categoryID')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get category info by ID 💾' })
    @ApiOkResponse({ type: CategoryPublic })
    @ApiNotFoundResponse({ description: 'category not found' })
    private getCategory(
        @Param('categoryID') categoryURL: string,
        @Queries() queries: QueriesCommonI,
    ): Promise<CategoryPublicI | null> {
        return this.categoryService.getCategory(Number(categoryURL), queries);
    }
}
