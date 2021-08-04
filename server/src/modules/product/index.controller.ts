import { Body, Controller, Delete, Get, Param, Patch, Put, UseInterceptors } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

import { CreateProductDTO } from "./index.dto";
import { ProductEntity } from "./index.entity";
import { ProductService } from "./index.service";
import { DeletedInterceptor } from "@interceptors/db";

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Put()
    @ApiOperation({ summary: 'create new product' })
	@ApiOkResponse({ type: ProductEntity })
    createProduct(@Body() product: CreateProductDTO): Promise<ProductEntity> {
        return this.productService.createProduct(product);
    }

    @Get(':productId')
    @ApiOperation({ summary: 'get product by id' })
    @ApiOkResponse({ type: ProductEntity })
    getProduct(@Param('productId') productId: string): Promise<ProductEntity> {
        return this.productService.getProduct(productId);
    }

    @Patch()
    @ApiOperation({ summary: 'update product' })
    @ApiOkResponse({ type: ProductEntity })
    updateProduct(@Body() product: CreateProductDTO): Promise<ProductEntity> {
        return this.productService.createProduct(product);
    }

    @Delete(':productId')
    @ApiOperation({ summary: 'delete product by id' })
    @UseInterceptors(DeletedInterceptor)
    @ApiNotFoundResponse({ description: 'product not found' })
    deleteProduct(@Param('productId') productId: string): Promise<DeleteResult> {
        return this.productService.deleteProduct(productId);
    }
}
