import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { FilesInterceptor } from "@nestjs/platform-express";

import { CreateProductDTO } from "./index.dto";
import { ProductEntity } from "./index.entity";
import { ProductService } from "./index.service";

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @ApiOperation({ summary: 'create new product' })
	@ApiOkResponse({ type: ProductEntity })
    createProduct(
        @Body() product: CreateProductDTO,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<ProductEntity> {
        return this.productService.createProduct(product, images);
    }

    @Get(':productId')
    @ApiOperation({ summary: 'get product by id' })
    @ApiOkResponse({ type: ProductEntity })
    @ApiNotFoundResponse({ description: 'product not found' })
    getProduct(@Param('productId') productId: string): Promise<ProductEntity> {
        return this.productService.getProduct(productId);
    }

    @Patch()
    @ApiOperation({ summary: 'update product' })
    @ApiOkResponse({ type: ProductEntity })
    updateProduct(@Body() product: ProductEntity): Promise<ProductEntity> {
        return this.productService.createProduct(product);
    }

    @Delete(':productId')
    @ApiOperation({ summary: 'delete product by id' })
    @ApiOkResponse({ description: 'success' })
    @ApiNotFoundResponse({ description: 'product not found' })
    deleteProduct(@Param('productId') productId: string): Promise<DeleteResult> {
        return this.productService.deleteProduct(productId);
    }
}
