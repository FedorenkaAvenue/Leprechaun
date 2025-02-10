import { Controller, Get, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

import ProductService from './product.service';
import { ProductCardPublic, ProductPublic } from './product.dto';
import { ProductCardPublicI, ProductPublicI } from './product.interface';
import HistoryProductInterceptor from '../historyProduct/historyProduct.interceptor';
import { QueriesProductListI } from '@core/queries/queries.interface';
import { QueriesProductList } from '@core/queries/queries.dto';
import QueryDecorator from '@core/queries/query.decorator';
import { ApiProductListQueriesDecorator } from '@core/product/product.decorator';
import { SessionInitInterceptor } from '@core/session/session.interceptor';
import { PaginationResult } from '@shared/dto/pagination.dto';
import ApiPaginatedResponse from '@shared/decorators/apiPaginatedResponse.decorator';
import InvalidPaginationPageInterceptor from '@shared/interceptors/invalidPaginationPage.interceptor';
import NotFoundInterceptor from '@shared/interceptors/notFound.interceptor';

@Controller('product')
@ApiTags('Product')
export default class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get('list')
    @UseInterceptors(CacheInterceptor, InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get product list 💾' })
    @ApiProductListQueriesDecorator()
    @ApiPaginatedResponse(ProductCardPublic)
    private getProducts(
        @QueryDecorator(QueriesProductList) queries: QueriesProductListI,
    ): Promise<PaginationResult<ProductCardPublicI>> {
        return this.productService.getProductList(queries);
    }

    @Get(':productId')
    @UseInterceptors(SessionInitInterceptor, HistoryProductInterceptor, CacheInterceptor, NotFoundInterceptor)
    @ApiOperation({ summary: 'get product full data by ID 💾 🧷' })
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
