import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UploadedFiles, UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiServiceUnavailableResponse,
    ApiTags, ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';

import { ProductEntity } from '@entities/Product';
import ProductPrivateService from '@services/Product/private';
import { PaginationResult } from '@dto/Pagination';
import {
    ApiPaginatedResponseDecorator as ApiPaginatedResponse, ApiProductListQueries,
} from '@decorators/OpenAPI';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import NotFoundInterceptor from '@interceptors/UndefinedResult';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { Pagination } from '@dto/Pagination';
import Query from '@decorators/Query';
import { QueriesProductList } from '@dto/Queries';
import { ProductCreateDTO, ProductPreview, ProductUpdateDTO } from '@dto/Product/private';
import { QueriesProductListI } from '@interfaces/Queries';
import { ProductI, ProductPreviewI } from '@interfaces/Product';

@Controller('adm/product')
@ApiTags('Product 🤵🏿‍♂️')
export default class ProductPrivateController {
    constructor(private readonly productService: ProductPrivateService) { }

    @Post()
    @UseInterceptors(FilesInterceptor('images[]'))
    @ApiOperation({ summary: 'create new product' })
    @ApiOkResponse({ description: 'success' })
    private createProduct(
        @Body(new ValidationPipe({ transform: true })) product: ProductCreateDTO,
        @UploadedFiles() images: Express.Multer.File[],
    ): Promise<ProductI> {
        return this.productService.createProduct(product, images);
    }

    @Get('list')
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get product list' })
    @ApiProductListQueries()
    @ApiPaginatedResponse(ProductPreview)
    private getproducts(
        @Query(QueriesProductList) queries: QueriesProductListI,
    ): Promise<PaginationResult<ProductPreviewI>> {
        return this.productService.getProductList(queries);
    }

    @Get(':productID')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get product by ID' })
    @ApiOkResponse({ type: ProductEntity })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private getProduct(@Param('productID', ParseUUIDPipe) productID: string): Promise<ProductI | null> {
        return this.productService.getProduct(productID);
    }

    @Patch(':productID')
    @UseInterceptors(FilesInterceptor('images[]'))
    @ApiOperation({ summary: 'update product' })
    @ApiBody({ type: ProductUpdateDTO })
    private updateProduct(
        @Param('productID', ParseUUIDPipe) productId: string,
        @Body(new ValidationPipe({ transform: true })) productUpdates: ProductUpdateDTO,
        // @UploadedFiles() images: Express.Multer.File[],
    ): Promise<void> {
        return this.productService.updateProduct(productId, productUpdates);
    }

    // ! DONT TOUCH
    // ! preloading DTO schemas
    @ApiUnsupportedMediaTypeResponse({ type: Pagination, description: "never mind. it's a bug for feature" })
    @ApiServiceUnavailableResponse({ type: ProductEntity, description: "never mind. it's a bug for feature" })
    // !
    @Delete(':productID')
    @UseInterceptors(AffectedResultInterceptor('product not found'))
    @ApiOperation({ summary: 'delete product by ID' })
    @ApiOkResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private deleteProduct(@Param('productID', ParseUUIDPipe) productID: string): Promise<DeleteResult> {
        return this.productService.deleteProduct(productID);
    }
}
