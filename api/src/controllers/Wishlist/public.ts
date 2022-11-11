import { BadRequestException, Controller, Delete, Param, ParseUUIDPipe, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import WishlistService from '@services/Wishlist';
import { Session } from '@decorators/Session';
import { SessionI } from '@interfaces/Session';
import { ProductPublic } from '@dto/Product/constructor';
import { WishListTPublicT } from '@interfaces/Wishlist';
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
        @Session() { id }: SessionI,
    ): Promise<WishListTPublicT> {
        return this.wishlistService.addItem(productId, id);
    }

    @Delete(':productId')
    @ApiOperation({ summary: 'remove product from wishlist' })
    @ApiResponse({ type: ProductPublic, isArray: true })
    deleteItem(
        @Param('productId', ParseUUIDPipe) productId: string,
        @Session() { id }: SessionI,
    ): Promise<WishListTPublicT> {
        return this.wishlistService.removeItem(productId, id);
    }

    @Delete()
    @UseInterceptors(AffectedResultInterceptor('wishlist is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear wishlist' })
    @ApiBadRequestResponse({ description: 'wishlist is already empty' })
    clearWishlist(@Session() { id }: SessionI) {
        return this.wishlistService.clearWishlist(id);
    }
}
