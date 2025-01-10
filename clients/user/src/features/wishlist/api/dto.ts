import { z } from "zod";

import { createWishlistSchema } from "../model/schemas";
import { WishlistItemModel, WishlistModel } from "@entities/wishlist/model/interfaces";

export type CreateWishlistDTO = z.infer<typeof createWishlistSchema>;
export type UpdateWishlistDTO = Partial<CreateWishlistDTO>;
export interface WishlistItemChangeWishlistDTO {
    itemId: WishlistItemModel['id']
    wishlistId: WishlistModel['id']
}
