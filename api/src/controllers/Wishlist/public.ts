import {
    Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Session, UseGuards,
    UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import { ApiCookieAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import WishlistPublicService from '@services/Wishlist/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import AuthSessionGuard from '@guards/Auth';
import Queries from '@decorators/Query';
import { CreateWishlistDTO, UpdateWishlistDTO, WishlistPublic } from '@dto/Wishlist/public';
import SessionInitInterceptor from '@interceptors/SessionInit';
import { QueriesCommonI } from '@interfaces/Queries';
import { WishlistPublicI } from '@interfaces/Wishlist';
import NotFoundInterceptor from '@interceptors/UndefinedResult';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly wishlistPublicService: WishlistPublicService) { }

    @Get()
    @ApiOperation({ summary: 'get all wishlists' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistPublic, isArray: true })
    private getWishlists(
        @Session() { id }: Record<string, any>,
        @Queries() queries: QueriesCommonI,
    ): Promise<WishlistPublicI[]> {
        return this.wishlistPublicService.getWishlists(id, queries);
    }

    @Get(':wishlistiD')
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get wishlist by ID (for sharing wishlist)' })
    @ApiOkResponse({ type: WishlistPublic })
    @ApiNotFoundResponse({ description: 'wishlist not found' })
    private getWishlist(
        @Param('wishlistiD', ParseUUIDPipe) wishlistID: string,
        @Queries() queries: QueriesCommonI,
    ): Promise<WishlistPublicI | null> {
        return this.wishlistPublicService.getWishlist(wishlistID, queries);
    }

    @Post()
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: 'create new wishlist 🧷' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistPublic })
    private createWishlist(
        @Body(new ValidationPipe({ transform: true })) wishlist: CreateWishlistDTO,
        @Session() { id }: Record<string, any>,
        @Queries() queries: QueriesCommonI,
    ): Promise<WishlistPublicI> {
        return this.wishlistPublicService.createWishlist(wishlist, id, queries);
    }

    @Patch(':wishlistID')
    @UseGuards(AuthSessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist is not found', NotFoundException))
    @ApiOperation({ summary: 'update wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist is not found' })
    private updateWishlist(
        @Param('wishlistID', ParseUUIDPipe) wishlistId: string,
        @Body(new ValidationPipe({ transform: true })) updates: UpdateWishlistDTO,
        @Session() { id }: Record<string, any>,
    ): Promise<UpdateResult> {
        return this.wishlistPublicService.updateWishlist(wishlistId, updates, id);
    }

    @Delete(':wishlistID')
    @UseGuards(AuthSessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist is not found', NotFoundException))
    @ApiOperation({ summary: 'delete wishlist' })
    @ApiCookieAuth()
    @ApiNotFoundResponse({ description: 'wishlist is not found' })
    private removeWishlist(
        @Param('wishlistID', ParseUUIDPipe) wishlistId: string,
        @Session() { id }: Record<string, any>,
    ): Promise<DeleteResult> {
        return this.wishlistPublicService.removeWishlist(wishlistId, id);
    }
}
