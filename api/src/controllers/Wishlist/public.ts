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
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import WishlistPublicService from '@services/Wishlist/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';
import SessionGuard from '@guards/Session';
import Queries from '@decorators/Query';
import { QueriesWishlist } from '@dto/Queries/constructor';
import { SortWishlistE } from '@enums/Query';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly WishlistPublicService: WishlistPublicService) { }

    @Get()
    @ApiOperation({ summary: 'get wishlist' })
    @ApiOkResponse({ type: WishlistItemPublic, isArray: true })
    @ApiQuery({
        name: 'sort',
        required: false,
        description: 'sort number',
        enum: SortWishlistE,
    })
    private getWishlist(
        @Session() { id },
        @Queries(QueriesWishlist) queries: QueriesWishlist,
    ): Promise<WishlistItemPublic[]> {
        return this.WishlistPublicService.getWishlist(id, queries);
    }

    @Post(':productID')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'add product to wishlist' })
    @ApiOkResponse({ type: WishlistItemPublic })
    @ApiBadRequestResponse({ description: 'product is already added to wishlist' })
    @ApiNotFoundResponse({ description: 'product not found' })
    private addItem(
        @Param('productID', ParseUUIDPipe) productID: string,
        @Session() { id },
        @Queries(QueriesWishlist) queries: QueriesWishlist,
    ): Promise<WishlistItemPublic> {
        return this.WishlistPublicService.addItem(productID, id, queries);
    }

    @Delete(':wishlistItemID')
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist item was not found'))
    @ApiOperation({ summary: 'remove wishlist item from wishlist' })
    @ApiNotFoundResponse({ description: 'wishlist item not found' })
    private deleteItem(
        @Param('wishlistItemID', ParseUUIDPipe) wishlistItemID: string,
        @Session() { id },
    ): Promise<DeleteResult> {
        return this.WishlistPublicService.removeItem(id, wishlistItemID);
    }

    @Delete()
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear wishlist' })
    @ApiBadRequestResponse({ description: 'wishlist is already empty' })
    private clearWishlist(@Session() { id }): Promise<DeleteResult> {
        return this.WishlistPublicService.clearWishlist(id);
    }
}
