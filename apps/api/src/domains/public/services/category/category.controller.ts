import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoryPreviewPublicSchema, CategoryPublicSchema } from './category.schema';
import { CategoryPreviewPublic } from '@gen/_category_preview';
import CategoryService from '@common/category/category.service';
import QueryDecorator from '@common/queries/query.decorator';
import { QueryCommonParams } from '@gen/common';
import { CategoryPublic } from '@gen/category';

@Controller('category')
@ApiTags('Category')
export default class CategoryPublicController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('list')
    @ApiOperation({ summary: 'get all public categories 💾' })
    @ApiOkResponse({ type: CategoryPreviewPublicSchema, isArray: true })
    private getAllCategories(
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<CategoryPreviewPublic[]> {
        return this.categoryService.getCategoryListPublic(queries);
    }

    @Get(':categoryID')
    @ApiOperation({ summary: 'get category info by ID 💾' })
    @ApiOkResponse({ type: CategoryPublicSchema })
    @ApiNotFoundResponse({ description: 'category not found' })
    private getCategory(
        @Param('categoryID') categoryId: string,
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<CategoryPublic> {
        return this.categoryService.getCategoryPublic(Number(categoryId), queries);
    }
}
