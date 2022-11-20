import {
    BadRequestException,
    Controller,
    Delete,
    Param,
    ParseUUIDPipe,
    Post,
    Session,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import WishlistService from '@services/Wishlist';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';
import { WishlistItemPublicI } from '@interfaces/WishlistItem';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly wishlistService: WishlistService) {}

    @Post(':productId')
    @ApiOperation({ summary: 'add product to wishlist' })
    @ApiOkResponse({ type: WishlistItemPublic })
    @ApiBadRequestResponse({ description: 'product is already added to wishlist' })
    @ApiNotFoundResponse({ description: 'product not found' })
    addItem(@Param('productId', ParseUUIDPipe) productId: string, @Session() { id }): Promise<WishlistItemPublicI> {
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
    clearWishlist(@Session() { id }) {
        return this.wishlistService.clearWishlist(id);
    }
}
