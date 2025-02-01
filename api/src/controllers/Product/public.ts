import { Controller, Get, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

import ProductPublicService from '@services/Product/public';
import { PaginationResult } from '@dto/Pagination';
import {
    ApiPaginatedResponseDecorator as ApiPaginatedResponse, ApiProductListQueries,
} from '@decorators/OpenAPI';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import { QueriesProductList } from '@dto/Queries';
import { ProductCardPublic, ProductPublic } from '@dto/Product/public';
import { SessionInitInterceptor } from '@interceptors/Session';
import { QueriesProductListI } from '@interfaces/Queries';
import { ProductCardPublicI, ProductPublicI } from '@interfaces/Product';
import QueryDecorator from '@decorators/Query';
import NotFoundInterceptor from '@interceptors/UndefinedResult';
import HistoryProductInterceptor from '@interceptors/HistoryProduct';

@Controller('product')
@ApiTags('Product 🧑‍💻')
export default class ProductPublicController {
    constructor(private readonly productService: ProductPublicService) { }

    @Get('list')
    @UseInterceptors(CacheInterceptor, InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get all public products 💾' })
    @ApiProductListQueries()
    @ApiPaginatedResponse(ProductCardPublic)
    private getProducts(
        @QueryDecorator(QueriesProductList) queries: QueriesProductListI,
    ): Promise<PaginationResult<ProductCardPublicI>> {
        return this.productService.getProductList(queries);
    }

    @Get(':productId')
    @UseInterceptors(SessionInitInterceptor, CacheInterceptor, HistoryProductInterceptor, NotFoundInterceptor)
    @ApiOperation({ summary: 'get public product by ID 💾 🧷' })
    @ApiOkResponse({ type: ProductPublic })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private getProduct(
        @Param('productId', ParseUUIDPipe) productId: string,
        @QueryDecorator(QueriesProductList) queries: QueriesProductListI,
    ): Promise<ProductPublicI | null> {
        return this.productService.getProduct(productId, queries);
    }
}
