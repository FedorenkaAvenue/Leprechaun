import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post,UploadedFiles,
    UseInterceptors, Query, Req, ValidationPipe
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse,
    ApiOperation, ApiQuery, ApiServiceUnavailableResponse, ApiTags, ApiUnsupportedMediaTypeResponse
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { CreateProductDTO } from '@dto/Product';
import { ProductEntity, ProductWIthPropertiesEntity } from '@entities/Product';
import { ProductService } from '@services/Product';
import { AffectedInterceptor, NotFoundInterceptor } from '@interceptors/DB';
import { PaginationEmptyInterceptor } from '@interceptors/search';
import { ISearchReqQueries } from '@interfaces/Queries';
import { PaginationDTO, PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponse } from '@decorators/Swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @ApiOperation({ summary: 'create new product' })
	@ApiOkResponse({ description: 'success' })
    createProduct(
        @Body(new ValidationPipe({ transform: true })) product: CreateProductDTO,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<void> {
        return this.productService.createProduct(product, images);
    }

    @Get('list')
    @UseInterceptors(PaginationEmptyInterceptor)
    @ApiQuery({ name: 'page', required: false, description: 'page number', type: 'number' })
    @ApiOperation({ summary: 'get all products' })
    @ApiPaginatedResponse(ProductEntity)
    @ApiNotAcceptableResponse({ description: 'pagination page doesn\'t exist' })
    getAllProducts(
        @Query() queries: ISearchReqQueries,
        @Req() { cookies }: Request
    ): Promise<PaginationResultDTO<ProductWIthPropertiesEntity>> {
        return this.productService.getAllProducts(queries, cookies);
    }

    @Get('list/new')
    @ApiOperation({ summary: 'get most latest/newest product (for dashboard)' })
    @ApiOkResponse({ type: ProductEntity, isArray: true })
    getMostNewestProducts(): Promise<ProductEntity[]> {
        return this.productService.getMostNewestProducts();
    }

    @Get('list/popular')
    @ApiOperation({ summary: 'get most popular products (for dashboard)' })
    @ApiOkResponse({ type: ProductEntity, isArray: true })
    getMostPopularProducts(): Promise<ProductEntity[]> {
        return this.productService.getMostPopularProducts();
    }

    @Get('category/:categoryUrl')
	@UseInterceptors(PaginationEmptyInterceptor)
	@ApiOperation({ summary: 'get products by category url' })
    @ApiQuery({ name: 'page', required: false, description: 'page number', type: 'number' })
	@ApiPaginatedResponse(ProductWIthPropertiesEntity)
	@ApiNotFoundResponse({ description: 'category not found' })
	@ApiNotAcceptableResponse({ description: 'pagination page is empty' })
	getCategoryProducts(
		@Query() queries: ISearchReqQueries,
        @Req() { cookies }: Request,
		@Param('categoryUrl') categoryUrl: string
	): Promise<PaginationResultDTO<ProductWIthPropertiesEntity>> {
		return this.productService.getCategoryProducts(categoryUrl, queries, cookies);
	}

    @Get(':productId')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get product by id' })
    @ApiOkResponse({ type: ProductEntity })
    @ApiBadRequestResponse({ description: 'invalid product id' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<ProductEntity> {
        return this.productService.getProduct(productId);
    }

    // @Patch()
    // @UseInterceptors(FilesInterceptor('staticImages'))
    // @UseInterceptors(AffectedInterceptor)
    // @ApiOperation({ summary: 'update product' })
    // updateProduct(
    //     @Body() product: UpdateProductDTO,
    //     @UploadedFiles() staticImages: Array<Express.Multer.File>
    // ): Promise<UpdateResult> {
    //     return this.productService.updateProduct(product, staticImages);
    // }

    // ! DONT TOUCH
    // ! preloading DTO schemas
    @ApiUnsupportedMediaTypeResponse({ type: PaginationDTO, description: 'never mind. it\'s a bug for feature' })
    @ApiServiceUnavailableResponse({ type: ProductWIthPropertiesEntity, description: 'never mind. it\'s a bug for feature' })

    @Delete(':productId')
    @UseInterceptors(AffectedInterceptor)
    @ApiOperation({ summary: 'delete product by id' })
    @ApiOkResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'invalid product id' })
    @ApiNotFoundResponse({ description: 'product not found' })
    deleteProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<DeleteResult> {
        return this.productService.deleteProduct(productId);
    }
}
