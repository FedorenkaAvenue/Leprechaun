import {
    Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, Session, UseGuards, UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import {
    ApiBody, ApiCookieAuth, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { WishlistItemMoveDTO, WishlistItemPublic } from './wishlistItem.dto';
import { WishlistItemPublicI } from './wishlistItem.interface';
import WishlistItemService from './wishlistItem.service';
import SessionGuard from '@core/session/session.guard';
import { SessionInitInterceptor } from '@core/session/session.interceptor';
import { QueriesCommonI } from '@core/queries/queries.interface';
import QueryDecorator from '@core/queries/query.decorator';
import AffectedResultInterceptor from '@shared/interceptors/affectedResult.interceptor';

@Controller('wishlist/item')
@ApiTags('Wishlist item')
export default class WishlistItemController {
    constructor(private readonly wishlistPublicService: WishlistItemService) { }

    @Patch()
    @UseGuards(SessionGuard)
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
        @QueryDecorator() queries: QueriesCommonI,
    ): Promise<WishlistItemPublicI> {
        return this.wishlistPublicService.addWishlistItem(productId, id, queries);
    }

    @Delete(':wishlistItemID')
    @UseGuards(SessionGuard)
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
