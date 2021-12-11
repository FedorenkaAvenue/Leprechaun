import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post,UploadedFiles,
    UseInterceptors, Query, Req, ValidationPipe
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation,
    ApiQuery, ApiServiceUnavailableResponse, ApiTags, ApiUnsupportedMediaTypeResponse
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { CreateProductDTO, ProductPreviewDTO, PublicProductDTO } from '@dto/Product';
import { ProductEntity } from '@entities/Product';
import { ProductService } from '@services/Product';
import { AffectedInterceptor, NotFoundInterceptor, EmptyResultInterceptor } from '@interceptors/responce';
import { ISearchReqQueries } from '@interfaces/Queries';
import { PaginationDTO, PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponse } from '@decorators/Swagger';
import { CommonDashboardsDTO, UserDashboardsDTO } from '@dto/Dashboard';
import { IProductPreview, IPublicProduct } from '@interfaces/Product';

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('list')
    @UseInterceptors(EmptyResultInterceptor)
    @ApiQuery({ name: 'page', required: false, description: 'page number', type: 'number' })
    @ApiOperation({ summary: 'get all public products' })
    @ApiPaginatedResponse(PublicProductDTO)
    getAllProducts(
        @Query() queries: ISearchReqQueries,
        @Req() { cookies }: Request
    ): Promise<PaginationResultDTO<IPublicProduct>> {
        return this.productService.getAllPublicProducts(queries, cookies);
    }

    @Get('category/:categoryUrl')
	@UseInterceptors(EmptyResultInterceptor)
	@ApiOperation({ summary: 'get public products by category url' })
    @ApiQuery({ name: 'page', required: false, description: 'page number', type: 'number' })
    @ApiNotFoundResponse({ description: 'category not found' })
	@ApiPaginatedResponse(PublicProductDTO)
	getCategoryProducts(
		@Query() queries: ISearchReqQueries,
        @Req() { cookies }: Request,
		@Param('categoryUrl') categoryUrl: string
	): Promise<PaginationResultDTO<IPublicProduct>> {
		return this.productService.getCategoryPublicProducts(categoryUrl, queries, cookies);
	}

    @Get('dashboard/common')
    @ApiOperation({ summary: 'get common dashboards' })
    @ApiOkResponse({ type: CommonDashboardsDTO })
    getCommonDashboards(): Promise<CommonDashboardsDTO> {
        return this.productService.getCommonDashboards();
    }

    // @Get('dashboard/user')
    // @ApiOperation({ summary: 'get individual user dashboards' })
    // @ApiOkResponse({ type: UserDashboardsDTO })
    // getMostPopularProducts(): Promise<UserDashboardsDTO> {
    //     return this.productService.getUserDashboards();
    // }

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

    @Get('/preview/:productId')
    @ApiOperation({ summary: 'get product preview by id' })
    @ApiOkResponse({ type: ProductPreviewDTO })
    @ApiBadRequestResponse({ description: 'invalid product id' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProductPreview(@Param('productId', ParseUUIDPipe) productId: string): Promise<IProductPreview> {
        return this.productService.getProductPreview(productId);
    }

    @Get(':productId')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get public product by id' })
    @ApiOkResponse({ type: PublicProductDTO })
    @ApiBadRequestResponse({ description: 'invalid product id' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getPublicProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<IPublicProduct> {
        return this.productService.getPublicProduct(productId);
    }

    // ! DONT TOUCH
    // ! preloading DTO schemas
    @ApiUnsupportedMediaTypeResponse({ type: PaginationDTO, description: 'never mind. it\'s a bug for feature' })
    @ApiServiceUnavailableResponse({ type: ProductEntity, description: 'never mind. it\'s a bug for feature' })
    // ! 
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
