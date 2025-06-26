import {
    Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, Session, UseInterceptors,
} from '@nestjs/common';
import {
    ApiBody, ApiCookieAuth, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';

import WishlistPublicService from './wishlist.service';
import { WishlistItemMoveParams, WishlistItemPublic, WishlistPublic } from '@gen/wishlist';
import {
    WishlistCreateSchema, WishlistItemMoveSchema, WishlistItemPublicSchema, WishlistPublicSchema, WishlistUpdateSchema,
} from './wishlist.schema';
import { QueryCommonParams } from '@gen/common';
import QueryDecorator from '@common/queries/query.decorator';
import SessionInitInterceptor from '@interceptors/sessionInit.interceptor';
import { Empty } from '@gen/google/protobuf/empty';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly wishlistPublicService: WishlistPublicService) { }

    @Get()
    @ApiOperation({ summary: 'get all wishlists' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistPublicSchema, isArray: true })
    private getWishlists(
        @Session() session: string,
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<WishlistPublic[]> {
        return this.wishlistPublicService.getWishlists(session, queries);
    }

    @Get(':wishlistiD')
    @ApiOperation({ summary: 'get wishlist by ID (for sharing wishlist)' })
    @ApiOkResponse({ type: WishlistPublicSchema })
    @ApiNotFoundResponse({ description: 'wishlist not found' })
    private getWishlist(
        @Param('wishlistiD', ParseUUIDPipe) wishlistID: string,
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<WishlistPublic> {
        return this.wishlistPublicService.getWishlist(wishlistID, queries);
    }

    @Post()
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: 'create new wishlist 🧷' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistPublicSchema })
    private createWishlist(
        //@ts-ignore
        @Req() { session }: string,
        @Body() wishlist: WishlistCreateSchema,
    ): Promise<WishlistPublic> {
        return this.wishlistPublicService.createWishlist(wishlist, session);
    }

    @Patch('item')
    @ApiOperation({ summary: 'move wishlist item to another wishlist' })
    @ApiCookieAuth()
    @ApiBody({ type: WishlistItemMoveSchema })
    @ApiNotAcceptableResponse({ description: 'wishlist item or wishlist is not exists' })
    private moveWishlistItemToAnotherWishlist(
        @Body() updates: WishlistItemMoveParams,
        // @Session() session: string, // yes, bug. everyone can delete any wishlist item
    ): Promise<Empty> {
        return this.wishlistPublicService.moveWishlistItems(updates);
    }

    @Patch(':wishlistID')
    @ApiOperation({ summary: 'update wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist is not found' })
    private updateWishlist(
        @Param('wishlistID', ParseUUIDPipe) wishlistId: string,
        @Body() updates: WishlistUpdateSchema,
        @Session() session: string,
    ): Promise<Empty> {
        return this.wishlistPublicService.updateWishlist(wishlistId, session, updates);
    }

    @Delete(':wishlistID')
    @ApiOperation({ summary: 'delete wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist is not found' })
    private removeWishlist(
        @Param('wishlistID', ParseUUIDPipe) wishlistId: string,
        @Session() session: string,
    ): Promise<Empty> {
        return this.wishlistPublicService.deleteWishlist(wishlistId, session);
    }

    @Post('item/:productID')
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: 'add product to default wishlist 🧷' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistItemPublicSchema })
    @ApiNotAcceptableResponse({ description: 'product is already added to wishlist' })
    private addWishlistItem(
        @Param('productID', ParseUUIDPipe) productId: string,
        @Session() session: string,
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<WishlistItemPublic> {
        return this.wishlistPublicService.addWishlistItem(session, productId, queries);
    }

    @Delete('item/:wishlistItemID')
    @ApiOperation({ summary: 'remove wishlist item from wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist item not found' })
    private deleteWishlistItem(
        @Param('wishlistItemID', ParseUUIDPipe) wishlistItemID: string,
        // @Session() session: string, // yes, bug. everyone can delete any wishlist item
    ): Promise<Empty> {
        return this.wishlistPublicService.deleteWishlistItem(wishlistItemID);
    }
}
