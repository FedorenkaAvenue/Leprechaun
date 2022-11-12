import { BadRequestException, Controller, Delete, Param, ParseUUIDPipe, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import WishlistService from '@services/Wishlist';
import { Session } from '@decorators/Session';
import { SessionI } from '@interfaces/Session';
import { ProductPublic } from '@dto/Product/constructor';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { WishlistItemPublicI } from '@src/interfaces/WishlistItem';

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
        @Session() { id }: SessionI,
    ): Promise<WishlistItemPublicI> {
        return this.wishlistService.addItem(productId, id);
    }

    @Delete(':wishlistItemId')
    @UseInterceptors(AffectedResultInterceptor('wishlist item was not found'))
    @ApiOperation({ summary: 'remove wishlist item from wishlist' })
    @ApiNotFoundResponse({ description: 'wishlist item not found' })
    deleteItem(@Param('wishlistItemId', ParseUUIDPipe) wishlistItemId: string): Promise<DeleteResult> {
        return this.wishlistService.removeItem(wishlistItemId);
    }

    @Delete()
    @UseInterceptors(AffectedResultInterceptor('wishlist is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear wishlist' })
    @ApiBadRequestResponse({ description: 'wishlist is already empty' })
    clearWishlist(@Session() { id }: SessionI) {
        return this.wishlistService.clearWishlist(id);
    }
}
