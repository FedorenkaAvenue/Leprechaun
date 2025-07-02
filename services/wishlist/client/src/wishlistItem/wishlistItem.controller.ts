import { Observable } from "rxjs";
import { Controller } from "@nestjs/common";
import {
    WishlistItemCUPublic,
    WishlistItemMoveParams,
    WishlistItemPublic,
    WishlistItemSearchParams,
    WishlistItemServiceControllerMethods,
    WishlistItemServiceController,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/wishlist";

import WishlistItemService from "./wishlistItem.service";

@Controller()
@WishlistItemServiceControllerMethods()
export default class WishlistItemController implements WishlistItemServiceController {
    constructor(private readonly wishlistItemService: WishlistItemService) { }

    public deleteWishlistItem({ id, user }: WishlistItemSearchParams): Observable<void> {
        return this.wishlistItemService.deleteWishlistItem(id, user);
    }

    public addWishlistItemPublic({ user, product, queries }: WishlistItemCUPublic): Observable<WishlistItemPublic> {
        return this.wishlistItemService.addWishlistItemPublic(product, user, queries);
    }

    public moveWishlistItem({ wishlistId, itemId, user }: WishlistItemMoveParams): Observable<void> {
        return this.wishlistItemService.moveWishlistItem(wishlistId, itemId, user);
    }
}
