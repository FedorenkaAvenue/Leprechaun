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
import { PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponseDecorator as ApiPaginatedResponse } from '@decorators/OpenAPI';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { Pagination } from '@dto/Pagination/constructor';
import { QueriesProductT } from '@interfaces/Queries';
import Query from '@decorators/Query';

@Controller('adm/product')
@ApiTags('Product 🤵🏿‍♂️')
export default class ProductPrivateController {
    constructor(private readonly productService: ProductPrivateService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @ApiOperation({ summary: 'create new product' })
    @ApiOkResponse({ description: 'success' })
    createProduct(
        @Body(new ValidationPipe({ transform: true })) product: CreateProductDTO,
        @UploadedFiles() images: Express.Multer.File[],
    ): Promise<void> {
        return this.productService.createProduct(product, images);
    }

    @Get('list')
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get product list' })
    @ApiPaginatedResponse(ProductEntity)
    getproducts(@Query() queries: QueriesProductT): Promise<PaginationResultDTO<ProductEntity>> {
        return this.productService.getProductList(queries);
    }

    @Get('category/:categoryUrl')
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get products by category URL' })
    @ApiNotFoundResponse({ description: 'category not found' })
    @ApiPaginatedResponse(ProductEntity)
    getCategoryProducts(
        @Param('categoryUrl') categoryUrl: string,
        @Query() queries: QueriesProductT,
    ): Promise<PaginationResultDTO<ProductEntity>> {
        return this.productService.getCategoryProducts(categoryUrl, queries);
    }

    @Get(':productId')
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get product by ID' })
    @ApiOkResponse({ type: ProductEntity })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<ProductEntity> {
        return this.productService.getProduct(productId);
    }

    // ! DONT TOUCH
    // ! preloading DTO schemas
    @ApiUnsupportedMediaTypeResponse({ type: Pagination, description: "never mind. it's a bug for feature" })
    @ApiServiceUnavailableResponse({ type: ProductEntity, description: "never mind. it's a bug for feature" })
    // !
    @Delete(':productId')
    @UseInterceptors(AffectedResultInterceptor('product not found'))
    @ApiOperation({ summary: 'delete product by ID' })
    @ApiOkResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    deleteProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<DeleteResult> {
        return this.productService.deleteProduct(productId);
    }
}
