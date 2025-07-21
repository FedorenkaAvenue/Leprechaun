import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import {
    ProductListPublic, ProductPublic, ProductQueryParams,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/product';

import { ApiProductListQueriesDecorator } from '@common/product/product.decorator';
import ApiPaginatedResponseDecorator from '@decorators/apiPaginatedResponse.decorator';
import QueryDecorator from '@common/queries/query.decorator';
import { ProductCardPublicSchema, ProductPublicSchema } from './product.schema';
import ProductService from '@common/product/product.service';
import { ProductQuerisDTO } from '@common/product/product.dto';
import SessionInitInterceptor from '@public/shared/interceptors/sessionInit.interceptor';
import Credentials from '@public/shared/decorators/credentials.decorator';
import { QueryCommonParams } from '@fedorenkaavenue/leprechaun_lib_entities/server/common';
import { User } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';

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

    @Get(':productId')
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: 'get product full data by ID 💾 🧷' })
    @ApiOkResponse({ type: ProductPublicSchema })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private getProduct(
        @Param('productId') productId: string,
        @Credentials('userId') user: User['id'],
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<ProductPublic> {
        return this.productService.getProductPublic(productId, user, queries);
    }
}
