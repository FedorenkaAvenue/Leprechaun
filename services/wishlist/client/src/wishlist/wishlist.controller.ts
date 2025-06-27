import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";

import {
    WishlistCreate,
    WishlistUpdate,
    WishlistDeleteSearchParams,
    WishlistItemCUPublic,
    WishlistItemMoveParams,
    WishlistItemPublic,
    WishlistItemSearchParams,
    WishlistListPublic,
    WishlistListSearchParamsPublic,
    WishlistPublic,
    WishlistPublicSearchParams,
    WishlistServiceController,
    WishlistServiceControllerMethods,
} from "gen/wishlist";
import { WishlistService } from "./wishlist.service";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import { WishlistCreateDTO, WishlistUpdateDTO } from "./wishlist.dto";
import WishlistItemService from "../wishlistItem/wishlistItem.service";

@Controller()
@WishlistServiceControllerMethods()
export default class WishlistController implements WishlistServiceController {
    constructor(
        private readonly wishlistService: WishlistService,
        private readonly wishlistItemService: WishlistItemService,
    ) { }

    public addWishlistItemPublic({ user, product, queries }: WishlistItemCUPublic): Observable<WishlistItemPublic> {
        return this.wishlistService.addWishlistItemPublic(user, product, queries);
    }

    @ValidateDTO(WishlistUpdateDTO)
    public updateWishlistPublic({ user, wishlist, updates }: WishlistUpdate): Observable<void> {
        return this.wishlistService.updateWishlist(wishlist, user, updates);
    }

    public deleteWishlistItem({ id, user }: WishlistItemSearchParams): Observable<void> {
        return this.wishlistItemService.deleteWishlistItem(id, user);
    }

    @ValidateDTO(WishlistCreateDTO)
    public createWishlistPublic(request: WishlistCreate): Observable<WishlistPublic> {
        return this.wishlistService.createWishlist(request);
    }

    public getWishlistPublic({ id, queries }: WishlistPublicSearchParams): Observable<WishlistPublic> {
        return this.wishlistService.getWishlistPublic(id, queries);
    }

    public getWishlistListPublic({ userId, queries }: WishlistListSearchParamsPublic): Observable<WishlistListPublic> {
        return this.wishlistService.getWishlistListPublic(userId, queries).pipe(
            map(res => ({ items: res }))
        );
    }

    public deleteWishlist({ id, user }: WishlistDeleteSearchParams): Observable<void> {
        return this.wishlistService.deleteWishlist(id, user);
    }

    public moveWishlistItem({ wishlistId, itemId, user }: WishlistItemMoveParams): Observable<void> {
        return this.wishlistService.moveWishlitItem(wishlistId, itemId, user);
    }
}
