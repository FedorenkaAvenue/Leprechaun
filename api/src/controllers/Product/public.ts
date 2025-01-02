import { Controller, Get, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

import ProductPublicService from '@services/Product/public';
import { PaginationResult } from '@dto/Pagination';
import { ApiPaginatedResponseDecorator as ApiPaginatedResponse } from '@decorators/OpenAPI';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import SessionProductHistoryInterceptor from '@interceptors/SessionProductHistory';
import Queries from '@decorators/Query';
import { QueriesProductList } from '@dto/Queries';
import { ProductSort } from '@enums/Query';
import { ProductStatusE } from '@enums/Product';
import { ProductCardPublic, ProductPublic } from '@dto/Product/public';

@Controller('product')
@ApiTags('Product 🧑‍💻')
export default class ProductPublicController {
    constructor(private readonly productService: ProductPublicService) { }

    @Get('list')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get all public products 💾' })
    @ApiPaginatedResponse(ProductCardPublic)
    @ApiQuery({
        name: 'sort',
        required: false,
        enum: ProductSort,
    })
    // @ApiQuery({
    //     name: 'price',
    //     required: false,
    //     enum: 'LOL',
    // })
    @ApiQuery({
        name: 'status',
        required: false,
        enum: ProductStatusE,
    })
    private getProducts(
        @Queries(QueriesProductList) queries: QueriesProductList,
    ): Promise<PaginationResult<ProductCardPublic>> {
        return this.productService.getProductList(queries);
    }

    @Get('category/:categoryUrl')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get public products by category URL 💾' })
    @ApiNotFoundResponse({ description: 'category not found' })
    @ApiPaginatedResponse(ProductCardPublic)
    private getCategoryProducts(
        @Param('categoryUrl') categoryUrl: string,
        @Queries(QueriesProductList) queries: QueriesProductList,
    ): Promise<PaginationResult<ProductCardPublic>> {
        return this.productService.getCategoryProducts(categoryUrl, queries);
    }

    @Get(':productId')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(SessionProductHistoryInterceptor)
    @ApiOperation({ summary: 'get public product by ID 💾' })
    @ApiOkResponse({ type: ProductPublic })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private getProduct(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Queries(QueriesProductList) queries: QueriesProductList,
    ): Promise<ProductPublic> {
        return this.productService.getProduct(productId, queries);
    }
}
