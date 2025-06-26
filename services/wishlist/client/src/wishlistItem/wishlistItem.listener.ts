import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import WishlistItemService from "./wishlistItem.service";
import { Product } from "gen/product";

@Controller()
export default class WishlistItemListener {
    constructor(private readonly wishlistItemService: WishlistItemService) { }

    @EventPattern('product.deleted')
    private productDeleteListener(@Payload() request: Product): void {
        this.wishlistItemService.deleteItemByProductId(request.id);
    }
}
