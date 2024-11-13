import { clientAPI } from "@shared/lib/api";
import { WishListItemModel } from "../models/WishList";

export async function getWishList() {
    const res = await clientAPI.get<WishListItemModel[]>('/wishlist');

    return res.data;
}
