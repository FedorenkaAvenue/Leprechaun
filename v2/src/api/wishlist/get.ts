import { WishlistSchema } from '@schemas/Wishlist';
import { appRequest } from '..';

export type Model = WishlistSchema[];

export default async function getWishlist(): Promise<Model> {
    return await appRequest<Model>('wishlist');
}
