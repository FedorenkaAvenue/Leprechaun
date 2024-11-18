import clientAPI from "@shared/lib/clientApi";
import { WishListItemModel } from "../models/WishList";

export async function getWishList() {
    const res = await clientAPI.get<WishListItemModel[]>('/wishlist');

    return res.data;
}
