import { Controller, Get, Param, ParseUUIDPipe, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import ProductPublicService from '@services/Product/public';
import { PaginationResultDTO } from '@dto/Pagination';
import {
    ApiPaginatedResponseDecorator as ApiPaginatedResponse,
    ApiQueriesRequestDecorator as ApiQueriesRequest,
} from '@decorators/OpenAPI';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import { ProductCard, ProductPublic } from '@dto/Product/constructor';
import SessionProductHistoryInterceptor from '@interceptors/SessionProductHistory';
import Queries from '@decorators/Query';
import { QueriesProductT } from '@interfaces/Queries';

@Controller('product')
@ApiTags('Product 🧑‍💻')
export default class ProductPublicController {
    constructor(private readonly productService: ProductPublicService) {}

    @Get('list')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get all public products 💾' })
    @ApiPaginatedResponse(ProductCard)
    @ApiQueriesRequest()
    getProducts(@Queries() queries: QueriesProductT): Promise<PaginationResultDTO<ProductCard>> {
        return this.productService.getProductList(queries);
    }

    @Get('category/:categoryUrl')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get public products by category URL 💾' })
    @ApiNotFoundResponse({ description: 'category not found' })
    @ApiPaginatedResponse(ProductCard)
    getCategoryProducts(
        @Param('categoryUrl') categoryUrl: string,
        @Queries() queries: QueriesProductT,
    ): Promise<PaginationResultDTO<ProductCard>> {
        return this.productService.getCategoryProducts(categoryUrl, queries);
    }

    @Get(':productId')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(SessionProductHistoryInterceptor)
    @ApiOperation({ summary: 'get public product by ID 💾' })
    @ApiOkResponse({ type: ProductPublic })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Queries() queries: QueriesProductT,
    ): Promise<ProductPublic> {
        return this.productService.getProduct(productId, queries);
    }
}
