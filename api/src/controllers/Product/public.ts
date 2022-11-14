import { Controller, Get, Param, ParseUUIDPipe, UseInterceptors, Query, CacheInterceptor } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

import { ProductPreviewDTO } from '@dto/Product';
import { ProductService } from '@services/Product';
import { SearchReqQueriesI } from '@interfaces/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponse } from '@decorators/Swagger';
import { ProductPreviewI, ProductPublicI } from '@interfaces/Product';
import { QueryGETListDTO } from '@dto/Queries';
import { Cookies } from '@decorators/Cookies';
import { CookiesI } from '@interfaces/Cookies';
import { UndefinedPipe } from '@pipes/Undefined';
import { QueryArrayPipe } from '@pipes/QueryArray';
import { SessionI } from '@interfaces/Session';
import { Session } from '@decorators/Session';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import { ProductPublic } from '@dto/Product/constructor';
import { CommonDashboards, UserDashboards } from '@dto/Dashboard/constructor';
import configService from '@services/Config';

const USER_HISTORY_LENGTH = configService.getVal('USER_HISTORY_LENGTH');

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
    getMostPopularProducts(@Session() { history }: SessionI): Promise<UserDashboards> {
        return this.productService.getUserDashboards({ history });
    }

    @Get('/preview/list')
    @ApiOperation({ summary: 'get product preview list by IDs' })
    @ApiQuery({ name: 'ids', required: true, description: 'array of product IDs', type: 'string' })
    @ApiOkResponse({ type: ProductPreviewDTO, isArray: true })
    @ApiBadRequestResponse({ description: "ID's array is empty" })
    getProductPreviewList(@Query('ids', UndefinedPipe, QueryArrayPipe) ids: QueryGETListDTO['queryList']) {
        return this.productService.getProductPreviewList(ids);
    }

    @Get('/preview/:productId')
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'get product preview by ID 💾' })
    @ApiOkResponse({ type: ProductPreviewDTO })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProductPreview(@Param('productId', ParseUUIDPipe) productId: string): Promise<ProductPreviewI> {
        return this.productService.getProductPreview(productId);
    }

    @Get(':productId')
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'get public product by ID 💾' })
    @ApiOkResponse({ type: ProductPublic })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Session() session: SessionI,
    ): Promise<ProductPublicI> {
        session.history = [...new Set([productId, ...session.history.slice(0, Number(USER_HISTORY_LENGTH))])];

        return this.productService.getPublicProduct(productId);
    }
}
