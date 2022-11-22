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
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import ProductService from '@services/Product';
import { SearchReqQueriesI } from '@interfaces/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponse } from '@decorators/Swagger';
import { ProductCardI } from '@interfaces/Product';
import { Cookies } from '@decorators/Cookies';
import { CookiesI } from '@interfaces/Cookies';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import { ProductCard } from '@dto/Product/constructor';
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
    @ApiPaginatedResponse(ProductCard)
    getProducts(
        @Query() queries: SearchReqQueriesI,
        @Cookies() { portion }: CookiesI,
    ): Promise<PaginationResultDTO<ProductCardI>> {
        return this.productService.getPublicProducts(queries, { portion });
    }

    @Get('category/:categoryUrl')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get public products by category URL 💾' })
    @ApiNotFoundResponse({ description: 'category not found' })
    @ApiPaginatedResponse(ProductCard)
    getCategoryProducts(
        @Query() queries: SearchReqQueriesI,
        @Cookies() { portion }: CookiesI,
        @Param('categoryUrl') categoryUrl: string,
    ): Promise<PaginationResultDTO<ProductCardI>> {
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
    @ApiOkResponse({ type: ProductCard })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<ProductCardI> {
        return this.productService.getPublicProduct(productId);
    }
}
