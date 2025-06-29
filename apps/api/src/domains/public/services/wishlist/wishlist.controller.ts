import {
    Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors,
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
import { Empty } from '@gen/google/protobuf/empty';
import SessionInitInterceptor from '@public/shared/interceptors/sessionInit.interceptor';
import CredentialsGuard from '@public/shared/guards/Credentials.guard';
import Credentials from '@public/shared/decorators/credentials.decorator';
import { User } from '@gen/user';
import { UnknownUserResponce } from '@public/shared/guards/UnknownUserResponce.guard';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly wishlistPublicService: WishlistPublicService) { }

    @Get()
    @UseGuards(UnknownUserResponce([]))
    @ApiOperation({ summary: 'get all wishlists' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistPublicSchema, isArray: true })
    private getWishlists(
        @Credentials('userId') user: User['id'],
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<WishlistPublic[]> {
        return this.wishlistPublicService.getWishlists(user, queries);
    }

    @Get(':wishlistiD')
    @ApiOperation({ summary: 'get wishlist by ID (for sharing wishlist)' })
    @ApiOkResponse({ type: WishlistPublicSchema })
    @ApiNotFoundResponse({ description: 'wishlist not found' })
    private getWishlist(
        @Param('wishlistiD') wishlistID: string,
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
        @Credentials('userId') user: User['id'],
        @Body() wishlist: WishlistCreateSchema,
    ): Promise<WishlistPublic> {
        return this.wishlistPublicService.createWishlist(wishlist, user);
    }

    @Patch('item')
    @UseGuards(CredentialsGuard)
    @ApiOperation({ summary: 'move wishlist item to another wishlist' })
    @ApiCookieAuth()
    @ApiBody({ type: WishlistItemMoveSchema })
    @ApiNotAcceptableResponse({ description: 'wishlist item or wishlist is not exists' })
    private moveWishlistItemToAnotherWishlist(
        @Credentials('userId') user: User['id'],
        @Body() updates: WishlistItemMoveParams,
    ): Promise<Empty> {
        return this.wishlistPublicService.moveWishlistItems({ ...updates, user });
    }

    @Patch(':wishlistID')
    @UseGuards(CredentialsGuard)
    @ApiOperation({ summary: 'update wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist is not found' })
    private updateWishlist(
        @Param('wishlistID') wishlistId: string,
        @Credentials('userId') user: User['id'],
        @Body() updates: WishlistUpdateSchema,
    ): Promise<Empty> {
        return this.wishlistPublicService.updateWishlist(wishlistId, user, updates);
    }

    @Delete(':wishlistID')
    @UseGuards(CredentialsGuard)
    @ApiOperation({ summary: 'delete wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist is not found' })
    private removeWishlist(
        @Param('wishlistID') wishlistId: string,
        @Credentials('userId') user: User['id'],
    ): Promise<Empty> {
        return this.wishlistPublicService.deleteWishlist(wishlistId, user);
    }

    @Post('item/:productID')
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: 'add product to default wishlist 🧷' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistItemPublicSchema })
    @ApiNotAcceptableResponse({ description: 'product is already added to wishlist' })
    private addWishlistItem(
        @Param('productID') productId: string,
        @Credentials('userId') user: User['id'],
        @QueryDecorator() queries: QueryCommonParams,
    ): Promise<WishlistItemPublic> {
        return this.wishlistPublicService.addWishlistItem(user, productId, queries);
    }

    @Delete('item/:wishlistItemID')
    @UseGuards(CredentialsGuard)
    @ApiOperation({ summary: 'remove wishlist item from wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist item not found' })
    private deleteWishlistItem(
        @Credentials('userId') user: User['id'],
        @Param('wishlistItemID') wishlistItemID: string,
    ): Promise<Empty> {
        return this.wishlistPublicService.deleteWishlistItem(wishlistItemID, user);
    }
}
