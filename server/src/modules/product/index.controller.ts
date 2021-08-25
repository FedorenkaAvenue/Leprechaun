import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post,UploadedFiles, UseInterceptors, Query, Req, ParseIntPipe
} from "@nestjs/common";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteResult, UpdateResult } from "typeorm";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";

import { CreateProductDTO, UpdateProductDTO } from "./index.dto";
import { ProductBaseEntity, ProductEntity } from "./index.entity";
import { ProductService } from "./index.service";
import { AffectedInterceptor, NotFoundInterceptor } from "@interceptors/DB";
import { PaginationOptionsDTO, SearchResult } from "@dto/search";
import { PaginationEmptyInterceptor } from "@interceptors/search";

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @ApiOperation({ summary: 'create new product' })
	@ApiOkResponse({ type: ProductBaseEntity })
    createProduct(
        @Body() product: CreateProductDTO,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<void> {
        return this.productService.createProduct(product, images);
    }

    @Get('list')
    @UseInterceptors(PaginationEmptyInterceptor)
    @ApiOperation({ summary: 'get all products' })
    @ApiOkResponse({ type: ProductBaseEntity, isArray: true })
    getAllProducts(
        @Req() { cookies: { pageLimit } }: Request,
        @Query('page', ParseIntPipe) page
    ): Promise<SearchResult> {
        return this.productService.getAllProducts(new PaginationOptionsDTO(page, pageLimit));
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
