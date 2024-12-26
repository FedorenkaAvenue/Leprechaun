import clientAPI from "@shared/api/api_client";
import { WishlistModel } from "../model/interfaces";

export async function getWishList(): Promise<WishlistModel[]> {
    const res = await clientAPI.get<WishlistModel[]>('/wishlist');

    return res.data;
}
