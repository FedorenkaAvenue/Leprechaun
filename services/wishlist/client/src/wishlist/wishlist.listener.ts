import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { User } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";

import { WishlistService } from "./wishlist.service";

@Controller()
export default class WishlistListener {
    constructor(private readonly wishlistService: WishlistService) { }

    @EventPattern('user.deleted')
    private userDeleteListener(@Payload() request: User): void {
        this.wishlistService.deleteWishlistByUserId(request.id);
    }
}
