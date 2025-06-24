import { z } from 'zod';

import { createWishlistSchema } from '../model/schemas';
import { WishlistItemPublic, WishlistPublic } from '@gen/wishlist';

export type CreateWishlistDTO = z.infer<typeof createWishlistSchema>;
export type UpdateWishlistDTO = Partial<CreateWishlistDTO>;
export interface WishlistItemChangeWishlistDTO {
    itemId: WishlistItemPublic['id']
    wishlistId: WishlistPublic['id']
}
