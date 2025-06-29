import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";

import {
    WishlistCreate,
    WishlistUpdate,
    WishlistDeleteSearchParams,
    WishlistListPublic,
    WishlistListSearchParamsPublic,
    WishlistPublic,
    WishlistPublicSearchParams,
    WishlistServiceController,
    WishlistServiceControllerMethods,
} from "gen/wishlist";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import { WishlistService } from "./wishlist.service";
import { WishlistCreateDTO, WishlistUpdateDTO } from "./wishlist.dto";

@Controller()
@WishlistServiceControllerMethods()
export default class WishlistController implements WishlistServiceController {
    constructor(private readonly wishlistService: WishlistService) { }

    @ValidateDTO(WishlistUpdateDTO)
    public updateWishlistPublic({ user, wishlist, updates }: WishlistUpdate): Observable<void> {
        return this.wishlistService.updateWishlist(wishlist, user, updates);
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
}
