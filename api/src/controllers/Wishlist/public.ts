import {
    BadRequestException,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Session,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import WishlistService from '@services/Wishlist';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';
import { WishlistItemPublicI } from '@interfaces/WishlistItem';
import { SessionGuard } from '@guards/Session';
import { WishListIPublicI } from '@interfaces/Wishlist';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly wishlistService: WishlistService) {}

    @Get()
    @ApiOperation({ summary: 'get wishlist' })
    @ApiOkResponse({ type: WishlistItemPublic, isArray: true })
    getWishlist(@Session() { id }): Promise<WishListIPublicI> {
        return this.wishlistService.getWishlistPublic(id);
    }

    @Post(':productId')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'add product to wishlist' })
    @ApiOkResponse({ type: WishlistItemPublic })
    @ApiBadRequestResponse({ description: 'product is already added to wishlist' })
    @ApiNotFoundResponse({ description: 'product not found' })
    addItem(@Param('productId', ParseUUIDPipe) productId: string, @Session() { id }): Promise<WishlistItemPublicI> {
        return this.wishlistService.addItem(productId, id);
    }

    @Delete(':wishlistItemId')
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist item was not found'))
    @ApiOperation({ summary: 'remove wishlist item from wishlist' })
    @ApiNotFoundResponse({ description: 'wishlist item not found' })
    deleteItem(
        @Param('wishlistItemId', ParseUUIDPipe) wishlistItemId: string,
        @Session() { id },
    ): Promise<DeleteResult> {
        return this.wishlistService.removeItem(id, wishlistItemId);
    }

    @Delete()
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear wishlist' })
    @ApiBadRequestResponse({ description: 'wishlist is already empty' })
    clearWishlist(@Session() { id }) {
        return this.wishlistService.clearWishlist(id);
    }
}
