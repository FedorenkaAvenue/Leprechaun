import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post,UploadedFiles,
    UseInterceptors, Query, ValidationPipe, Session
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation,
    ApiQuery, ApiServiceUnavailableResponse, ApiTags, ApiUnsupportedMediaTypeResponse
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateProductDTO, ProductPreviewDTO, PublicProductDTO } from '@dto/Product';
import { ProductEntity } from '@entities/Product';
import { ProductService } from '@services/Product';
import { AffectedInterceptor, NotFoundInterceptor, EmptyResultInterceptor } from '@interceptors/responce';
import { ISearchReqQueries } from '@interfaces/Queries';
import { PaginationDTO, PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponse } from '@decorators/Swagger';
import { CommonDashboardsDTO, UserDashboardsDTO } from '@dto/Dashboard';
import { IProductPreview, IPublicProduct } from '@interfaces/Product';
import { QueryGETListDTO } from '@dto/Queries';
import { Cookies } from '@decorators/Cookies';
import { ICookies } from '@interfaces/Cookies';
import { UndefinedPipe } from '@pipes/Undefined';
import { QueryArrayPipe } from '@pipes/QueryArray';

@Controller('product')
@ApiTags('Product (client)')
export class ProductPublicController {
    constructor(private readonly productService: ProductService) {}

    @Get('list')
    @UseInterceptors(EmptyResultInterceptor)
    @ApiQuery({ name: 'page', required: false, description: 'page number', type: 'number' })
    @ApiOperation({ summary: 'get all public products' })
    @ApiPaginatedResponse(PublicProductDTO)
    getProducts(
        @Query() queries: ISearchReqQueries,
        @Cookies() { portion, sort }: ICookies
    ): Promise<PaginationResultDTO<IPublicProduct>> {
        return this.productService.getPublicProducts(queries, { portion, sort });
    }

    @Get('category/:categoryUrl')
	@UseInterceptors(EmptyResultInterceptor)
	@ApiOperation({ summary: 'get public products by category URL' })
    @ApiQuery({ name: 'page', required: false, description: 'page number', type: 'number' })
    @ApiNotFoundResponse({ description: 'category not found' })
	@ApiPaginatedResponse(PublicProductDTO)
	getCategoryProducts(
		@Query() queries: ISearchReqQueries,
        @Cookies() { portion, sort }: ICookies,
		@Param('categoryUrl') categoryUrl: string
	): Promise<PaginationResultDTO<IPublicProduct>> {
		return this.productService.getCategoryPublicProducts(categoryUrl, queries, { portion, sort });
	}

    @Get('dashboard/common')
    @ApiOperation({ summary: 'get common dashboards' })
    @ApiOkResponse({ type: CommonDashboardsDTO })
    getCommonDashboards(): Promise<CommonDashboardsDTO> {
        return this.productService.getCommonDashboards();
    }

    @Get('dashboard/user')
    @ApiOperation({ summary: 'get individual user dashboards' })
    @ApiOkResponse({ type: UserDashboardsDTO })
    getMostPopularProducts(
        @Session() session
    ): Promise<UserDashboardsDTO> {
        console.log(session);
        
        return this.productService.getUserDashboards();
    }

    @Get('/preview/list')
    @ApiOperation({ summary: 'get product preview list by IDs' })
    @ApiQuery({ name: 'ids', required: true, description: 'array of product IDs', type: 'string' })
    @ApiOkResponse({ type: ProductPreviewDTO, isArray: true })
    @ApiBadRequestResponse({ description: 'ID\'s array is empty' })
    getProductPreviewList(
        @Query('ids', UndefinedPipe, QueryArrayPipe) ids: QueryGETListDTO['queryList']
    ) { 
        return this.productService.getProductPreviewList(ids);
    }

    @Get('/preview/:productId')
    @ApiOperation({ summary: 'get product preview by ID' })
    @ApiOkResponse({ type: ProductPreviewDTO })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProductPreview(
        @Param('productId', ParseUUIDPipe) productId: string
    ): Promise<IProductPreview> {
        return this.productService.getProductPreview(productId);
    }

    @Get(':productId')
    @ApiOperation({ summary: 'get public product by ID' })
    @ApiOkResponse({ type: PublicProductDTO })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(
        @Param('productId', ParseUUIDPipe) productId: string
    ): Promise<IPublicProduct> {
        return this.productService.getPublicProduct(productId);
    }
}

@Controller('adm/product')
@ApiTags('Product (admin)')
export class ProductAdminController {
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

    @Get(':productId')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get product by ID' })
    @ApiOkResponse({ type: PublicProductDTO })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(
        @Param('productId', ParseUUIDPipe) productId: string
    ): Promise<IPublicProduct> {
        return this.productService.getAdminProduct(productId);
    }

    // ! DONT TOUCH
    // ! preloading DTO schemas
    @ApiUnsupportedMediaTypeResponse({ type: PaginationDTO, description: 'never mind. it\'s a bug for feature' })
    @ApiServiceUnavailableResponse({ type: ProductEntity, description: 'never mind. it\'s a bug for feature' })
    // ! 
    @Delete(':productId')
    @UseInterceptors(AffectedInterceptor)
    @ApiOperation({ summary: 'delete product by ID' })
    @ApiOkResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    deleteProduct(
        @Param('productId', ParseUUIDPipe) productId: string
    ): Promise<DeleteResult> {
        return this.productService.deleteProduct(productId);
    }
}
