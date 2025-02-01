import {
    Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, Session, UseGuards, UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import {
    ApiBody, ApiCookieAuth, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import WishlistPublicService from '@services/Wishlist/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { WishlistItemMoveDTO, WishlistItemPublic } from '@dto/WishlistItem/public';
import AuthSessionGuard from '@guards/Auth';
import Queries from '@decorators/Query';
import { SessionInitInterceptor } from '@interceptors/Session';
import { QueriesCommonI } from '@interfaces/Queries';
import { WishlistItemPublicI } from '@interfaces/WishlistItem';

@Controller('wishlist/item')
@ApiTags('Wishlist item🧑‍💻')
export default class WishlistItemPublicController {
    constructor(private readonly wishlistPublicService: WishlistPublicService) { }

    @Patch()
    @UseGuards(AuthSessionGuard)
    @ApiOperation({ summary: 'move wishlist item to another wishlist' })
    @ApiCookieAuth()
    @ApiBody({ type: WishlistItemMoveDTO })
    @ApiNotAcceptableResponse({ description: 'wishlist item or wishlist is not exists' })
    private moveWishlistItemToAnotherWishlist(
        @Body(new ValidationPipe({ transform: true })) updates: WishlistItemMoveDTO,
    ): Promise<void> {
        return this.wishlistPublicService.moveWishlistItems(updates);
    }

    @Post(':productID')
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: 'add product to default wishlist 🧷' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistItemPublic })
    @ApiNotAcceptableResponse({ description: 'product is already added to wishlist' })
    private addWishlistItem(
        @Param('productID', ParseUUIDPipe) productId: string,
        @Session() { id }: Record<string, any>,
        @Queries() queries: QueriesCommonI,
    ): Promise<WishlistItemPublicI> {
        return this.wishlistPublicService.addWishlistItem(productId, id, queries);
    }

    @Delete(':wishlistItemID')
    @UseGuards(AuthSessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist item was not found'))
    @ApiOperation({ summary: 'remove wishlist item from wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist item not found' })
    private deleteWishlistItem(
        @Param('wishlistItemID', ParseUUIDPipe) wishlistItemID: string,
        @Session() { id }: Record<string, any>,
    ): Promise<DeleteResult> {
        return this.wishlistPublicService.removeWishlistItem(wishlistItemID, id);
    }
}
