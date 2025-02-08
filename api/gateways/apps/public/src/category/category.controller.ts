import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

import CategoryService from './category.service';
import { CategoryPublic } from './category.dto';
import { CategoryPublicI } from './category.interface';
import { QueriesCommonI } from '@core/queries/queries.interface';
import QueryDecorator from '@core/queries/query.decorator';
import NotFoundInterceptor from '@shared/interceptors/notFound.interceptor';

@Controller('category')
@ApiTags('Category')
@UseInterceptors(CacheInterceptor)
export default class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('list')
    @ApiOperation({ summary: 'get all public categories 💾' })
    @ApiOkResponse({ type: CategoryPublic, isArray: true })
    private getAllCategories(@QueryDecorator() queries: QueriesCommonI): Promise<CategoryPublicI[]> {
        return this.categoryService.getCategoryList(queries);
    }

    @Get(':categoryID')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get category info by ID 💾' })
    @ApiOkResponse({ type: CategoryPublic })
    @ApiNotFoundResponse({ description: 'category not found' })
    private getCategory(
        @Param('categoryID') categoryURL: string,
        @QueryDecorator() queries: QueriesCommonI,
    ): Promise<CategoryPublicI | null> {
        return this.categoryService.getCategory(Number(categoryURL), queries);
    }
}
