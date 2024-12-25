import clientAPI from "@shared/lib/api_client";
import { WishlistModel } from "../models/WishList";

export async function getWishList() {
    const res = await clientAPI.get<WishlistModel[]>('/wishlist');

    return res.data;
}
