import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UploadedFiles,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiServiceUnavailableResponse,
    ApiTags,
    ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateProductDTO } from '@dto/Product';
import { ProductEntity } from '@entities/Product';
import ProductPrivateService from '@services/Product/private';
import { PaginationResult } from '@dto/Pagination/constructor';
import { ApiPaginatedResponseDecorator as ApiPaginatedResponse } from '@decorators/OpenAPI';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { Pagination } from '@dto/Pagination/constructor';
import Query from '@decorators/Query';
import { QueriesProductList } from '@dto/Queries/constructor';

@Controller('adm/product')
@ApiTags('Product 🤵🏿‍♂️')
export default class ProductPrivateController {
    constructor(private readonly productService: ProductPrivateService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @ApiOperation({ summary: 'create new product' })
    @ApiOkResponse({ description: 'success' })
    private createProduct(
        @Body(new ValidationPipe({ transform: true })) product: CreateProductDTO,
        @UploadedFiles() images: Express.Multer.File[],
    ): Promise<ProductEntity> {
        return this.productService.createProduct(product, images);
    }

    @Get('list')
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get product list' })
    @ApiPaginatedResponse(ProductEntity)
    private getproducts(@Query(QueriesProductList) queries: QueriesProductList): Promise<PaginationResult<ProductEntity>> {
        return this.productService.getProductList(queries);
    }

    @Get('category/:categoryURL')
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get products by category URL' })
    @ApiNotFoundResponse({ description: 'category not found' })
    @ApiPaginatedResponse(ProductEntity)
    private getCategoryProducts(
        @Param('categoryURL') categoryURL: string,
        @Query(QueriesProductList) queries: QueriesProductList,
    ): Promise<PaginationResult<ProductEntity>> {
        return this.productService.getCategoryProducts(categoryURL, queries);
    }

    @Get(':productID')
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get product by ID' })
    @ApiOkResponse({ type: ProductEntity })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private getProduct(@Param('productID', ParseUUIDPipe) productID: string): Promise<ProductEntity> {
        return this.productService.getProduct(productID);
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
