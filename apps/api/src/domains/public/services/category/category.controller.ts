import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoryPreviewPublicSchema } from './category.schema';
import { CategoryPreviewPublic } from '@gen/_category_preview';
import CategoryService from '@common/category/category.service';
import QueryDecorator from '@common/queries/query.decorator';
import { QueryCommonParams } from '@gen/common';

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

    // @Get(':categoryID')
    // @UseInterceptors(NotFoundInterceptor)
    // @ApiOperation({ summary: 'get category info by ID 💾' })
    // @ApiOkResponse({ type: CategoryPublic })
    // @ApiNotFoundResponse({ description: 'category not found' })
    // private getCategory(
    //     @Param('categoryID') categoryURL: string,
    //     @QueryDecorator() queries: QueriesCommonI,
    // ): Promise<CategoryPublicI | null> {
    //     return this.categoryService.getCategory(Number(categoryURL), queries);
    // }
}
