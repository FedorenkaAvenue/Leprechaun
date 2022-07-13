import { Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import WishlistService from '@services/Wishlist';
import { Session } from '@decorators/Session';
import { ISession } from '@interfaces/Session';
import { IProductPreview } from '@interfaces/Product';
import { ProductPreviewDTO } from '@dto/Product';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export class WishlistPublicController {
    constructor(
        private readonly wishlistService: WishlistService
    ) {}

    @Get()
    @ApiOperation({ summary: 'get wishlist' })
    @ApiResponse({ type: ProductPreviewDTO, isArray: true })
    getWishlist(
        @Session() { id }: ISession
    ): Promise<IProductPreview[]> {
        return this.wishlistService.getWishlist(id);
    }
    
    @Post(':productId')
    @ApiOperation({ summary: 'add product to wishlist' })
    @ApiResponse({ type: ProductPreviewDTO, isArray: true })
    @ApiNotAcceptableResponse({ description: 'product already exists' })
    addItem(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Session() { id }: ISession
    ): Promise<IProductPreview[]> {
        return this.wishlistService.addItem(productId, id);
    }

    @Delete(':productId')
    @ApiOperation({ summary: 'remove product from wishlist' })
    @ApiResponse({ type: ProductPreviewDTO, isArray: true })
    @ApiNotFoundResponse({ description: 'product not found' })
    deleteItem(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Session() { id }: ISession
    ): Promise<IProductPreview[]> {
        return this.wishlistService.removeItem(productId, id);
    }
}
