import {
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    UseInterceptors,
    Query,
    CacheInterceptor,
    Session,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

import ProductService from '@services/Product';
import { SearchReqQueriesI } from '@interfaces/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponse } from '@decorators/Swagger';
import { ProductPublicI } from '@interfaces/Product';
import { Cookies } from '@decorators/Cookies';
import { CookiesI } from '@interfaces/Cookies';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import { ProductPublic } from '@dto/Product/constructor';
import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import { SessionProductHistoryInterceptor } from '@interceptors/Session';

@Controller('product')
@ApiTags('Product 🧑‍💻')
export default class ProductPublicController {
    constructor(private readonly productService: ProductService) {}

    @Get('list')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get all public products 💾' })
    @ApiPaginatedResponse(ProductPublic)
    getProducts(
        @Query() queries: SearchReqQueriesI,
        @Cookies() { portion }: CookiesI,
    ): Promise<PaginationResultDTO<ProductPublicI>> {
        return this.productService.getPublicProducts(queries, { portion });
    }

    @Get('category/:categoryUrl')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get public products by category URL 💾' })
    @ApiNotFoundResponse({ description: 'category not found' })
    @ApiPaginatedResponse(ProductPublic)
    getCategoryProducts(
        @Query() queries: SearchReqQueriesI,
        @Cookies() { portion }: CookiesI,
        @Param('categoryUrl') categoryUrl: string,
    ): Promise<PaginationResultDTO<ProductPublicI>> {
        return this.productService.getCategoryPublicProducts(categoryUrl, queries, { portion });
    }

    @Get('dashboard/common')
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'get common dashboards 💾' })
    @ApiOkResponse({ type: CommonDashboards })
    getCommonDashboards(): Promise<CommonDashboards> {
        return this.productService.getCommonDashboards();
    }

    @Get('dashboard/user')
    @ApiOperation({ summary: 'get individual user dashboards' })
    @ApiOkResponse({ type: UserDashboards })
    getMostPopularProducts(@Session() { id }): Promise<UserDashboards> {
        return this.productService.getUserDashboards(id);
    }

    @Get(':productId')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(SessionProductHistoryInterceptor)
    @ApiOperation({ summary: 'get public product by ID 💾' })
    @ApiOkResponse({ type: ProductPublic })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<ProductPublicI> {
        return this.productService.getPublicProduct(productId);
    }
}
