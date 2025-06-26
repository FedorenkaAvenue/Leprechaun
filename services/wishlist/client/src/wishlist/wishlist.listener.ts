import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { WishlistService } from "./wishlist.service";
import { User } from "gen/user";

@Controller()
export default class WishlistListener {
    constructor(private readonly wishlistService: WishlistService) { }

    @EventPattern('user.deleted')
    private userDeleteListener(@Payload() request: User): void {
        this.wishlistService.deleteWishlistByUserId(request.id);
    }
}
