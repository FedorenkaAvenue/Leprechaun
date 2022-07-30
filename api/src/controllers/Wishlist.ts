import { Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import WishlistService from '@services/Wishlist';
import { Session } from '@decorators/Session';
import { ISession } from '@interfaces/Session';
import { ProductPublic } from '@dto/Product/constructor';
import { TWishListPublic } from '@interfaces/Wishlist';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export class WishlistPublicController {
    constructor(
        private readonly wishlistService: WishlistService
    ) {}

    @Get()
    @ApiOperation({ summary: 'get wishlist' })
    @ApiResponse({ type: ProductPublic, isArray: true })
    getWishlist(
        @Session() { id }: ISession
    ): Promise<TWishListPublic> {
        return this.wishlistService.getWishlist(id);
    }
    
    @Post(':productId')
    @ApiOperation({ summary: 'add product to wishlist' })
    @ApiResponse({ type: ProductPublic, isArray: true })
    addItem(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Session() { id }: ISession
    ): Promise<TWishListPublic> {
        return this.wishlistService.addItem(productId, id);
    }

    @Delete(':productId')
    @ApiOperation({ summary: 'remove product from wishlist' })
    @ApiResponse({ type: ProductPublic, isArray: true })
    @ApiNotFoundResponse({ description: 'product not found' })
    deleteItem(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Session() { id }: ISession
    ): Promise<TWishListPublic> {
        return this.wishlistService.removeItem(productId, id);
    }
}
