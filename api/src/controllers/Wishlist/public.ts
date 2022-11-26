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

import WishlistPublicService from '@services/Wishlist/public';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import { WishlistItemPublic } from '@dto/WishlistItem/constructor';
import SessionGuard from '@guards/Session';
import Queries from '@decorators/Query';
import { QueriesI } from '@interfaces/Queries';
import { PaginationResult } from '@dto/Pagination/constructor';
import ApiPaginatedResponse from '@decorators/Swagger';

@Controller('wishlist')
@ApiTags('Wishlist 🧑‍💻')
export default class WishlistPublicController {
    constructor(private readonly WishlistPublicService: WishlistPublicService) {}

    @Get()
    @ApiOperation({ summary: 'get wishlist' })
    @ApiPaginatedResponse(WishlistItemPublic)
    getWishlist(@Session() { id }, @Queries() queries: QueriesI): Promise<PaginationResult<WishlistItemPublic>> {
        return this.WishlistPublicService.getWishlist(id, queries);
    }

    @Post(':productId')
    @UseGuards(SessionGuard)
    @ApiOperation({ summary: 'add product to wishlist' })
    @ApiOkResponse({ type: WishlistItemPublic })
    @ApiBadRequestResponse({ description: 'product is already added to wishlist' })
    @ApiNotFoundResponse({ description: 'product not found' })
    addItem(@Param('productId', ParseUUIDPipe) productId: string, @Session() { id }): Promise<WishlistItemPublic> {
        return this.WishlistPublicService.addItem(productId, id);
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
        return this.WishlistPublicService.removeItem(id, wishlistItemId);
    }

    @Delete()
    @UseGuards(SessionGuard)
    @UseInterceptors(AffectedResultInterceptor('wishlist is already empty', BadRequestException))
    @ApiOperation({ summary: 'clear wishlist' })
    @ApiBadRequestResponse({ description: 'wishlist is already empty' })
    clearWishlist(@Session() { id }): Promise<DeleteResult> {
        return this.WishlistPublicService.clearWishlist(id);
    }
}
