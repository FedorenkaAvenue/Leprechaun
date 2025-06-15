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

import { UserRoleGuard } from '@common/user/user.guard';
import { AuthJWTAccessGuard } from '@guards/auth.guard';
import { UserRoleDecorator } from '@common/user/user.decorator';
import { UserRole } from '@gen/user';
import ApiPaginatedResponseDecorator from '@decorators/apiPaginatedResponse.decorator'
import { ProductCreateSchema, ProductPreviewSchema, ProductSchema, ProductUpdateSchema } from './product.schema';
import { ApiProductListQueriesDecorator } from '@common/product/product.decorator';
import QueryDecorator from '@common/queries/query.decorator';
import ProductService from '@common/product/product.service';
import { ProductQuerisDTO } from '@common/product/product.dto';
import { Product, ProductPreview, ProductPrivateList } from '@gen/product';
import { Empty } from '@gen/google/protobuf/empty';
import { PaginationSchema } from '@schemas/pagination.schema';

@Controller('product')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Product 👨🏿‍💼')
export default class ProductPrivateController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(FilesInterceptor('images[]'))
    @ApiOperation({ summary: 'create new product' })
    @ApiOkResponse({ description: 'success' })
    private createProduct(
        @Body(new ValidationPipe({ transform: true })) product: ProductCreateSchema,
        @UploadedFiles() images: Express.Multer.File[],
    ): Promise<ProductPreview> {
        return this.productService.createProduct(product, images);
    }

    @Get('list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get product list' })
    @ApiProductListQueriesDecorator()
    @ApiPaginatedResponseDecorator(ProductPreviewSchema)
    private getproducts(@QueryDecorator(ProductQuerisDTO) queries: any): Promise<ProductPrivateList> {
        return this.productService.getProductPrivateList(queries);
    }

    @Get(':productID')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get product by ID' })
    @ApiOkResponse({ type: ProductSchema })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private getProduct(@Param('productID', ParseUUIDPipe) productID: string): Promise<Product> {
        return this.productService.getProduct(productID);
    }

    @Patch(':productID')
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(FilesInterceptor('images[]'))
    @ApiOperation({ summary: 'update product' })
    @ApiBody({ type: ProductUpdateSchema })
    private updateProduct(
        @Param('productID', ParseUUIDPipe) productId: string,
        @Body(new ValidationPipe({ transform: true })) productUpdates: ProductUpdateSchema,
        // @UploadedFiles() images: Express.Multer.File[],
    ): Promise<Empty> {
        return this.productService.updateProduct(productId, productUpdates);
    }

    // ! DONT TOUCH
    // ! preloading DTO schemas
    @ApiUnsupportedMediaTypeResponse({ type: PaginationSchema, description: "never mind. it's a bug for feature" })
    @ApiServiceUnavailableResponse({ type: ProductSchema, description: "never mind. it's a bug for feature" })
    // !
    @Delete(':productID')
    @UserRoleDecorator(UserRole.ADMIN)
    @ApiOperation({ summary: 'delete product by ID' })
    @ApiOkResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'invalid product ID' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private deleteProduct(@Param('productID', ParseUUIDPipe) productID: string): Promise<Empty> {
        return this.productService.deleteProduct(productID);
    }
}
