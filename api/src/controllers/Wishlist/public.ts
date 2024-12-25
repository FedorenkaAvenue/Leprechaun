import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Session,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import WishlistPublicService from '@services/Wishlist/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { WishlistItemPublic } from '@dto/WishlistItem/public';
import SessionGuard from '@guards/Session';
import Queries from '@decorators/Query';
import { QueriesWishlist } from '@dto/Queries/constructor';
import { WishlistPublic } from '@dto/Wishlist/public';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly wishlistPublicService: WishlistPublicService) { }

    @Get()
    @ApiOperation({ summary: 'get all wishlists' })
    @ApiOkResponse({ type: WishlistPublic, isArray: true })
    private getWishlists(
        @Session() { id },
        @Queries(QueriesWishlist) queries: QueriesWishlist,
    ): Promise<WishlistPublic[]> {
        return this.wishlistPublicService.getWishlists(id, queries);
    }

    @Post('/item/:productID')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'add product to default wishlist' })
    @ApiOkResponse({ type: WishlistItemPublic })
    @ApiNotFoundResponse({ description: 'product or wishlist not found' })
    // @ApiNotAcceptableResponse({ description: 'product is already added to wishlist or wishlist doesn\'t exist' })
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
    @ApiNotFoundResponse({ description: 'wishlist item not found' })
    private deleteItem(
        @Param('wishlistItemID', ParseUUIDPipe) wishlistItemID: string,
        @Session() { id },
    ): Promise<DeleteResult> {
        return this.wishlistPublicService.removeItem(wishlistItemID, id);
    }

    // @Delete()
    // @UseGuards(SessionGuard)
    // @UseInterceptors(AffectedResultInterceptor('wishlist is already empty', BadRequestException))
    // @ApiOperation({ summary: 'clear wishlist' })
    // @ApiBadRequestResponse({ description: 'wishlist is already empty' })
    // private clearWishlist(@Session() { id }): Promise<DeleteResult> {
    //     return this.wishlistPublicService.clearWishlist(id);
    // }
}
