import { useMemo, useState } from "react";

import { WishlistModel } from "@entities/wishlist/model/interfaces";
import { WishlistItemsSort } from '@entities/wishlist/model/enums';

interface Result {
    sort: WishlistItemsSort
    setSort: (sort: WishlistItemsSort) => void
    sortedItems: WishlistModel['items']
}

function sorting(items: WishlistModel['items'], sort: WishlistItemsSort): WishlistModel['items'] {
    switch (sort) {
        case WishlistItemsSort.PRICE_UP:
            return items.sort((a, b) => a.product.price.current - b.product.price.current);
        case WishlistItemsSort.PRICE_DOWN:
            return items.sort((a, b) => b.product.price.current - a.product.price.current);
        default: // WishlistItemsSort.LASTEST
            return items.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
    }
}

export default function useSortWishlistItems(wishlistItems: WishlistModel['items']): Result {
    const [sort, setSort] = useState(WishlistItemsSort.LASTEST);

    const sortedItems = useMemo(() => sorting(wishlistItems, sort), [wishlistItems, sort]);

    return { sort, setSort, sortedItems };
}
