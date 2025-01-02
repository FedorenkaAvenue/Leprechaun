'use server';

import serverAPI from "@shared/api/serverApi";
import { WishlistModel } from "../model/interfaces";

export async function getWishList(): Promise<WishlistModel[]> {
    return (await serverAPI.get<WishlistModel[]>('/wishlist')).data;
}
