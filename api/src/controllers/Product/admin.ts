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
    Query,
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
import { ProductService } from '@services/Product';
import { ISearchReqQueries } from '@interfaces/Queries';
import { PaginationResultDTO } from '@dto/Pagination';
import { ApiPaginatedResponse } from '@decorators/Swagger';
import { IProduct, IPublicProduct } from '@interfaces/Product';
import { Cookies } from '@decorators/Cookies';
import { ICookies } from '@interfaces/Cookies';
import InvalidPaginationPageInterceptor from '@interceptors/InvalidPaginationPage';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { ProductPublic } from '@dto/Product/constructor';
import { Pagination } from '@dto/Pagination/constructor';

@Controller('adm/product')
@ApiTags('Product 🤵🏿‍♂️')
export default class ProductAdminController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @ApiOperation({ summary: 'create new product' })
    @ApiOkResponse({ description: 'success' })
    createProduct(
        @Body(new ValidationPipe({ transform: true })) product: CreateProductDTO,
        @UploadedFiles() images: Array<Express.Multer.File>,
    ): Promise<void> {
        return this.productService.createProduct(product, images);
    }

    @Get('list')
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get product list' })
    @ApiPaginatedResponse(ProductEntity)
    getproducts(
        @Query() queries: ISearchReqQueries,
        @Cookies() { portion }: ICookies,
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
        @Param('categoryUrl') categoryUrl: string,
    ): Promise<PaginationResultDTO<IProduct>> {
        return this.productService.getCategoryAdminProducts(categoryUrl, queries, { portion });
    }

    @Get(':productId')
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get product by ID' })
    @ApiOkResponse({ type: ProductPublic })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<IPublicProduct> {
        return this.productService.getAdminProduct(productId);
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
