import { Controller, Delete, Param, ParseUUIDPipe, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import WishlistService from '@services/Wishlist';
import { Session } from '@decorators/Session';
import { ISession } from '@interfaces/Session';
import { ProductPublic } from '@dto/Product/constructor';
import { TWishListPublic } from '@interfaces/Wishlist';
import AffectedResultInterceptor from '@interceptors/AffectedResult';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly wishlistService: WishlistService) {}

    @Post(':productId')
    @ApiOperation({ summary: 'add product to wishlist' })
    @ApiResponse({ type: ProductPublic, isArray: true })
    @ApiBadRequestResponse({ description: 'product is already added to wishlist' })
    @ApiNotFoundResponse({ description: 'product not found' })
    addItem(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Session() { id }: ISession,
    ): Promise<TWishListPublic> {
        return this.wishlistService.addItem(productId, id);
    }

    @Delete(':productId')
    @ApiOperation({ summary: 'remove product from wishlist' })
    @ApiResponse({ type: ProductPublic, isArray: true })
    deleteItem(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Session() { id }: ISession,
    ): Promise<TWishListPublic> {
        return this.wishlistService.removeItem(productId, id);
    }

    @Delete()
    @UseInterceptors(AffectedResultInterceptor)
    @ApiOperation({ summary: 'clear wishlist' })
    @ApiNotFoundResponse({ description: 'wishlist is empty' })
    clearWishlist(@Session() { id }: ISession) {
        return this.wishlistService.clearWishlist(id);
    }
}
