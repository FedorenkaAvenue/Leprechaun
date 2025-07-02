import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { Product } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

import WishlistItemService from "./wishlistItem.service";

@Controller()
export default class WishlistItemListener {
    constructor(private readonly wishlistItemService: WishlistItemService) { }

    @EventPattern('product.deleted')
    private productDeleteListener(@Payload() request: Product): void {
        this.wishlistItemService.deleteItemByProductId(request.id);
    }
}
