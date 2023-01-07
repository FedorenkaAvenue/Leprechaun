import { WishlistSchema } from '@schemas/Wishlist';

export type Model = WishlistSchema[];

export default async function getWishlist(): Promise<Model> {
    const res = await fetch('http://api.leprechaun.loc/wishlist');

    return res.json();
}
