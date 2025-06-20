import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";

import {
    WishlistListPublic,
    WishlistListSearchParamsPublic,
    WishlistPublic,
    WishlistSearchParams,
    WishlistServiceController,
    WishlistServiceControllerMethods,
} from "gen/wishlist";
import { WishlistService } from "./wishlist.service";

@Controller()
@WishlistServiceControllerMethods()
export default class WishlistController implements WishlistServiceController {
    constructor(private readonly wishlistService: WishlistService) { }

    public getWishlistPublic(request: WishlistSearchParams): Promise<WishlistPublic> | Observable<WishlistPublic> | WishlistPublic {
        throw new Error("Method not implemented.");
    }
    public getWishlistListPublic({ userId, queries }: WishlistListSearchParamsPublic): Observable<WishlistListPublic> {
        return this.wishlistService.getWishlistListPublic(userId, queries).pipe(
            map(res => ({ items: res }))
        );
    }
}
