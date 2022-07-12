import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post,UploadedFiles,
    UseInterceptors, Query, ValidationPipe, CacheInterceptor, Patch
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
import { ISearchReqQueries } from '@interfaces/Queries';
import { PaginationDTO, PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponse } from '@decorators/Swagger';
import { CommonDashboardsDTO, UserDashboardsDTO } from '@dto/Dashboard';
import { IProduct, IProductPreview, IPublicProduct } from '@interfaces/Product';
import { QueryGETListDTO } from '@dto/Queries';
import { Cookies } from '@decorators/Cookies';
import { ICookies } from '@interfaces/Cookies';
import { UndefinedPipe } from '@pipes/Undefined';
import { QueryArrayPipe } from '@pipes/QueryArray';
import { ISession } from '@interfaces/Session';
import ConfigService from '@services/Config';
import { Session } from '@decorators/Session';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';
import AffectedResultInterceptor from '@interceptors/AffectedResult';

@Controller('product')
@ApiTags('Product 🧑‍💻')
export class ProductPublicController {
    constructor(
        private readonly productService: ProductService,
        private readonly configService: ConfigService
    ) {}

    @Get('list')
    @UseInterceptors(CacheInterceptor)
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get all public products 💾' })
    @ApiPaginatedResponse(PublicProductDTO)
    getProducts(
        @Query() queries: ISearchReqQueries,
        @Cookies() { portion }: ICookies
    ): Promise<PaginationResultDTO<IPublicProduct>> {
        return this.productService.getPublicProducts(queries, { portion });
    }

    @Get('category/:categoryUrl')
    @UseInterceptors(CacheInterceptor)
	@UseInterceptors(InvalidPaginationPageInterceptor)
	@ApiOperation({ summary: 'get public products by category URL 💾' })
    @ApiNotFoundResponse({ description: 'category not found' })
	@ApiPaginatedResponse(PublicProductDTO)
	getCategoryProducts(
		@Query() queries: ISearchReqQueries,
        @Cookies() { portion }: ICookies,
		@Param('categoryUrl') categoryUrl: string
	): Promise<PaginationResultDTO<IPublicProduct>> {
		return this.productService.getCategoryPublicProducts(categoryUrl, queries, { portion });
	}

    @Get('dashboard/common')
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'get common dashboards 💾' })
    @ApiOkResponse({ type: CommonDashboardsDTO })
    getCommonDashboards(): Promise<CommonDashboardsDTO> {
        return this.productService.getCommonDashboards();
    }

    @Get('dashboard/user')
    @ApiOperation({ summary: 'get individual user dashboards' })
    @ApiOkResponse({ type: UserDashboardsDTO })
    getMostPopularProducts(
        @Session() { history }: ISession
    ): Promise<UserDashboardsDTO> {
        return this.productService.getUserDashboards({ history });
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
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'get product preview by ID 💾' })
    @ApiOkResponse({ type: ProductPreviewDTO })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProductPreview(
        @Param('productId', ParseUUIDPipe) productId: string
    ): Promise<IProductPreview> {
        return this.productService.getProductPreview(productId);
    }

    @Get(':productId')
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'get public product by ID 💾' })
    @ApiOkResponse({ type: PublicProductDTO })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Session() session: ISession
    ): Promise<IPublicProduct> {
        session.history =
            [...new Set([
                productId,
                ...session.history.slice(0, +this.configService.getVal('USER_HISTORY_LENGTH'))
            ])];

        return this.productService.getPublicProduct(productId);
    }
}

@Controller('adm/product')
@ApiTags('Product 🤵🏿‍♂️')
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

    @Get('list')
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get product list' })
    @ApiPaginatedResponse(ProductEntity)
    getproducts(
        @Query() queries: ISearchReqQueries,
        @Cookies() { portion }: ICookies
    ): Promise<PaginationResultDTO<IProduct>> {
        return this.productService.getAdminProducts(queries, { portion });
    }

    @Get('category/:categoryUrl')
	@UseInterceptors(InvalidPaginationPageInterceptor)
	@ApiOperation({ summary: 'get products by category URL' })
    @ApiNotFoundResponse({ description: 'category not found' })
	@ApiPaginatedResponse(ProductEntity)
	getCategoryProducts(
		@Query() queries: ISearchReqQueries,
        @Cookies() { portion }: ICookies,
		@Param('categoryUrl') categoryUrl: string
	): Promise<PaginationResultDTO<IProduct>> {
		return this.productService.getCategoryAdminProducts(categoryUrl, queries, { portion });
	}

    @Get(':productId')
    @UseInterceptors(UndefinedResultInterceptor)
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
    @UseInterceptors(AffectedResultInterceptor)
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
