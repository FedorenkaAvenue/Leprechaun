import {
    ApiBadRequestResponse,
    ApiBody,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiServiceUnavailableResponse,
    ApiTags,
    ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import ProductService from './product.service';
import { ProductCreateDTO, ProductPreview, ProductUpdateDTO } from './product.dto';
import { ProductI, ProductPreviewI } from '@core/product/product.interface';
import { QueriesProductList } from '@core/queries/queries.dto';
import { UserRoleDecorator } from '@core/user/user.decorator';
import { QueriesProductListI } from '@core/queries/queries.interface';
import { UserRoleGuard } from '@core/user/user.guard';
import { AuthJWTAccessGuard } from '@core/auth/auth.guard';
import { UserRole } from '@core/user/user.enum';
import { ProductEntity } from '@core/product/product.entity';
import { CacheClearInterceptor } from '@core/cache/cache.interceptor';
import QueryDecorator from '@core/queries/query.decorator';
import { ApiProductListQueriesDecorator } from '@core/product/product.decorator';
import InvalidPaginationPageInterceptor from '@shared/interceptors/invalidPaginationPage.interceptor';
import { Pagination, PaginationResult } from '@shared/dto/pagination.dto';
import NotFoundInterceptor from '@shared/interceptors/notFound.interceptor';
import ApiPaginatedResponse from '@shared/decorators/apiPaginatedResponse.decorator';

@Controller('product')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Product')
export default class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(FilesInterceptor('images[]'), CacheClearInterceptor)
    @ApiOperation({ summary: 'create new product' })
    @ApiOkResponse({ description: 'success' })
    private createProduct(
        @Body(new ValidationPipe({ transform: true })) product: ProductCreateDTO,
        @UploadedFiles() images: Express.Multer.File[],
    ): Promise<ProductI> {
        return this.productService.createProduct(product, images);
    }

    @Get('list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseInterceptors(InvalidPaginationPageInterceptor)
    @ApiOperation({ summary: 'get product list' })
    @ApiProductListQueriesDecorator()
    @ApiPaginatedResponse(ProductPreview)
    private getproducts(
        @QueryDecorator(QueriesProductList) queries: QueriesProductListI,
    ): Promise<PaginationResult<ProductPreviewI>> {
        return this.productService.getProductList(queries);
    }

    @Get(':productID')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get product by ID' })
    @ApiOkResponse({ type: ProductEntity })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private getProduct(@Param('productID', ParseUUIDPipe) productID: string): Promise<ProductI | null> {
        return this.productService.getProduct(productID);
    }

    @Patch(':productID')
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(FilesInterceptor('images[]'), CacheClearInterceptor)
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
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(CacheClearInterceptor)
    @ApiOperation({ summary: 'delete product by ID' })
    @ApiOkResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private deleteProduct(@Param('productID', ParseUUIDPipe) productID: string): Promise<void> {
        return this.productService.deleteProduct(productID);
    }
}
