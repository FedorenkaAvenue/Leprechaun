import {
    Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Session, UseGuards,
    UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import {
    ApiCookieAuth, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import WishlistPublicService from '@services/Wishlist/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { WishlistItemPublic } from '@dto/WishlistItem/public';
import SessionGuard from '@guards/Session';
import Queries from '@decorators/Query';
import { QueriesWishlist } from '@dto/Queries';
import { CreateWishlistDTO, UpdateWishlistDTO, WishlistPublic } from '@dto/Wishlist/public';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly wishlistPublicService: WishlistPublicService) { }

    @Get()
    @ApiOperation({ summary: 'get all wishlists' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistPublic, isArray: true })
    private getWishlists(
        @Session() { id },
        @Queries(QueriesWishlist) queries: QueriesWishlist,
    ): Promise<WishlistPublic[]> {
        return this.wishlistPublicService.getWishlists(id, queries);
    }

    @Post()
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'create new wishlist' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistPublic })
    private createWishlist(
        @Body(new ValidationPipe({ transform: true })) wishlist: CreateWishlistDTO,
        @Session() { id },
        @Queries(QueriesWishlist) queries: QueriesWishlist,
    ): Promise<WishlistPublic> {
        return this.wishlistPublicService.createWishlist(wishlist, id, queries);
    }

    @Patch(':wishlistID')
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist is not found', NotFoundException))
    @ApiOperation({ summary: 'update wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist is not found' })
    private updateWishlist(
        @Param('wishlistID', ParseUUIDPipe) wishlistId: string,
        @Body(new ValidationPipe({ transform: true })) updates: UpdateWishlistDTO,
        @Session() { id },
    ): Promise<UpdateResult> {
        return this.wishlistPublicService.updateWishlist(wishlistId, updates, id);
    }

    @Delete(':wishlistID')
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist is not found', NotFoundException))
    @ApiOperation({ summary: 'delete wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist is not found' })
    private removeWishlist(
        @Param('wishlistID', ParseUUIDPipe) wishlistId: string,
        @Session() { id }
    ): Promise<DeleteResult> {
        return this.wishlistPublicService.removeWishlist(wishlistId, id);
    }

    @Post('/item/:productID')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'add product to default wishlist' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistItemPublic })
    @ApiNotAcceptableResponse({ description: 'product is already added to wishlist' })
    private addWishlistItem(
        @Param('productID', ParseUUIDPipe) productId: string,
        @Session() { id },
        @Queries(QueriesWishlist) queries: QueriesWishlist,
    ): Promise<WishlistItemPublic> {
        return this.wishlistPublicService.addWishlistItem(productId, id, queries);
    }

    @Delete('/item/:wishlistItemID')
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist item was not found'))
    @ApiOperation({ summary: 'remove wishlist item from wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist item not found' })
    private deleteItem(
        @Param('wishlistItemID', ParseUUIDPipe) wishlistItemID: string,
        @Session() { id },
    ): Promise<DeleteResult> {
        return this.wishlistPublicService.removeItem(wishlistItemID, id);
    }
}
