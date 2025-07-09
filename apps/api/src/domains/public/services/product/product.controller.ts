import { Controller, Get, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { ProductListPublic, ProductQueryParams } from '@fedorenkaavenue/leprechaun_lib_entities/server/product';

import { ApiProductListQueriesDecorator } from '@common/product/product.decorator';
import ApiPaginatedResponseDecorator from '@decorators/apiPaginatedResponse.decorator';
import QueryDecorator from '@common/queries/query.decorator';
import { ProductCardPublicSchema } from './product.schema';
import ProductService from '@common/product/product.service';
import { ProductQuerisDTO } from '@common/product/product.dto';

@Controller('product')
@ApiTags('Product 🧑‍💻')
export default class ProductPublicController {
    constructor(private readonly productService: ProductService) { }

    @Get('list')
    @ApiOperation({ summary: 'get product list 💾' })
    @ApiProductListQueriesDecorator()
    @ApiPaginatedResponseDecorator(ProductCardPublicSchema)
    private getProducts(
        @QueryDecorator(ProductQuerisDTO) queries: ProductQueryParams,
    ): Promise<ProductListPublic> {
        return this.productService.getProductPublicList(queries);
    }

    // @Get(':productId')
    // @UseInterceptors(SessionInitInterceptor, ProductHistoryInterceptor, CacheInterceptor, NotFoundInterceptor)
    // @ApiOperation({ summary: 'get product full data by ID 💾 🧷' })
    // @ApiOkResponse({ type: ProductPublic })
    // @ApiBadRequestResponse({ description: 'invalid product ID' })
    // @ApiNotFoundResponse({ description: 'product not found' })
    // private getProduct(
    //     @Param('productId', ParseUUIDPipe) productId: string,
    //     @QueryDecorator(QueriesProductList) queries: QueriesProductListI,
    // ): Promise<ProductPublicI | null> {
    //     return this.productService.getProduct(productId, queries);
    // }
}
