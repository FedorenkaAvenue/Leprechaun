import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post,UploadedFiles,
    UseInterceptors, Query, Req, ValidationPipe, ParseIntPipe
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation,
    ApiParam, ApiQuery, ApiServiceUnavailableResponse, ApiTags, ApiUnsupportedMediaTypeResponse
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { CreateProductDTO } from '@dto/Product';
import { ProductBaseEntity, ProductEntity, ProductWIthPropertiesEntity } from '@entities/Product';
import { ProductService } from '@services/Product';
import { AffectedInterceptor, NotFoundInterceptor, EmptyResultInterceptor } from '@interceptors/responce';
import { ISearchReqQueries } from '@interfaces/Queries';
import { PaginationDTO, PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponse } from '@decorators/Swagger';
import { DashboardParamPipe } from '@pipes/DashboardParam';
import { DASHBOARD_LIST } from '@interfaces/Product';

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
    @UseInterceptors(EmptyResultInterceptor)
    @ApiQuery({ name: 'page', required: false, description: 'page number', type: 'number' })
    @ApiOperation({ summary: 'get all products' })
    @ApiPaginatedResponse(ProductEntity)
    getAllProducts(
        @Query() queries: ISearchReqQueries,
        @Req() { cookies }: Request
    ): Promise<PaginationResultDTO<ProductWIthPropertiesEntity>> {
        return this.productService.getAllProducts(queries, cookies);
    }

    @Get('dashboard/new/:page?')
    @ApiOperation({ summary: 'get most latest/newest product (for dashboard)' })
    @ApiParam({ name: 'page', description: 'page number (1 - 5)', type: 'number' })
    @ApiOkResponse({ type: ProductEntity, isArray: true })
    @ApiBadRequestResponse({ description: 'page path is not a number' })
    @ApiNotAcceptableResponse({ description: 'invalid page number range. valid range is 1-5' })
    getMostNewestProducts(
        @Param('page', new ParseIntPipe, new DashboardParamPipe) page: number
    ): Promise<ProductBaseEntity[]> {
        return this.productService.getDashboardProducts(DASHBOARD_LIST.NEW, page);
    }

    @Get('dashboard/popular/:page?')
    @ApiOperation({ summary: 'get most popular products (for dashboard)' })
    @ApiParam({ name: 'page', description: 'page number (1 - 5)', type: 'number' })
    @ApiOkResponse({ type: ProductEntity, isArray: true })
    @ApiBadRequestResponse({ description: 'page path is not a number' })
    @ApiNotAcceptableResponse({ description: 'invalid page number range. valid range is 1-5' })
    getMostPopularProducts(
        @Param('page', new ParseIntPipe, new DashboardParamPipe) page: number
    ): Promise<ProductBaseEntity[]> {
        return this.productService.getDashboardProducts(DASHBOARD_LIST.POPULAR, page);
    }

    @Get('category/:categoryUrl')
	@UseInterceptors(EmptyResultInterceptor)
	@ApiOperation({ summary: 'get products by category url' })
    @ApiQuery({ name: 'page', required: false, description: 'page number', type: 'number' })
    @ApiNotFoundResponse({ description: 'category not found' })
	@ApiPaginatedResponse(ProductWIthPropertiesEntity)
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
