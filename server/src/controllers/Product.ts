import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post,UploadedFiles,
    UseInterceptors, Query, Req, ValidationPipe
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse,
    ApiOperation, ApiQuery, ApiTags
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { CreateProductDTO } from '@dto/Product';
import { ProductBaseEntity, ProductEntity } from '@entities/Product';
import { ProductService } from '@services/Product';
import { AffectedInterceptor, NotFoundInterceptor } from '@interceptors/DB';
import { PaginationEmptyInterceptor } from '@interceptors/search';
import { ISearchReqQueries } from '@interfaces/Queries';
import { SearchResultDTO } from '@dto/SearchResult';

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @ApiOperation({ summary: 'create new product' })
	@ApiOkResponse({ type: ProductBaseEntity })
    createProduct(
        @Body(new ValidationPipe({ transform: true })) product: CreateProductDTO,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<void> {
        return this.productService.createProduct(product, images);
    }

    @Get('list')
    @UseInterceptors(PaginationEmptyInterceptor)
    @ApiQuery({ name: 'page', required: false, description: 'page number' })
    @ApiOperation({ summary: 'get all products' })
    @ApiOkResponse({ type: ProductEntity, isArray: true })
    @ApiNotAcceptableResponse({ description: 'pagination page is empty' })
    getAllProducts(
        @Query() queries: ISearchReqQueries,
        @Req() { cookies }: Request
    ): Promise<SearchResultDTO> {
        return this.productService.getAllProducts(queries, cookies);
    }

    @Get('category/:categoryId')
	@UseInterceptors(PaginationEmptyInterceptor)
	@ApiOperation({ summary: 'get products by category ID' })
	@ApiQuery({ name: 'page', required: false, description: 'page number' })
	@ApiOkResponse({ type: ProductBaseEntity, isArray: true })
	@ApiNotFoundResponse({ description: 'category not found' })
	@ApiNotAcceptableResponse({ description: 'pagination page is empty' })
	getCategoryProducts(
		@Query() queries: ISearchReqQueries,
        @Req() { cookies }: Request,
		@Param('categoryId') categoryUrl: string
	): Promise<SearchResultDTO> {
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

    @Get('/search/:exp')
    // @UseInterceptors(PaginationEmptyInterceptor)
    @ApiOperation({ summary: 'get products by search string' })
    @ApiOkResponse({ type: ProductEntity, isArray: true })
    searchByString(@Param('exp') searchExp: string) {
        return this.productService.searchByString(searchExp);
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
