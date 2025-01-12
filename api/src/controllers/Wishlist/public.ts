import {
    Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Session, UseGuards,
    UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import { ApiCookieAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import WishlistPublicService from '@services/Wishlist/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import AuthGuard from '@guards/Auth';
import Queries from '@decorators/Query';
import { CreateWishlistDTO, UpdateWishlistDTO, WishlistPublic } from '@dto/Wishlist/public';
import SessionInitInterceptor from '@interceptors/SessionInit';
import { QueriesCommon } from '@dto/Queries';

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
        @Queries() queries: QueriesCommon,
    ): Promise<WishlistPublic[]> {
        return this.wishlistPublicService.getWishlists(id, queries);
    }

    @Post()
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: 'create new wishlist 🧷' })
    @ApiCookieAuth()
    @ApiOkResponse({ type: WishlistPublic })
    private createWishlist(
        @Body(new ValidationPipe({ transform: true })) wishlist: CreateWishlistDTO,
        @Session() { id },
        @Queries() queries: QueriesCommon,
    ): Promise<WishlistPublic> {
        return this.wishlistPublicService.createWishlist(wishlist, id, queries);
    }

    @Patch(':wishlistID')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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
}
