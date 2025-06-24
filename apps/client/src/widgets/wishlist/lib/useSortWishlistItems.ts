'use client'

import { useMemo, useState } from 'react';

import { WishlistItemsSort } from '@entities/wishlist/model/enums';
import { WishlistPublic } from '@gen/wishlist';

interface Result {
    sort: WishlistItemsSort
    setSort: (sort: WishlistItemsSort) => void
    sortedItems: WishlistPublic['items']
}

function sorting(items: WishlistPublic['items'], sort: WishlistItemsSort): WishlistPublic['items'] {
    switch (sort) {
        case WishlistItemsSort.PRICE_UP:
            return items.sort((a, b) => a.product.price.current - b.product.price.current);
        case WishlistItemsSort.PRICE_DOWN:
            return items.sort((a, b) => b.product.price.current - a.product.price.current);
        default: // WishlistItemsSort.LASTEST
            return items.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}

export default function useSortWishlistItems(wishlistItems: WishlistPublic['items']): Result {
    const [sort, setSort] = useState(WishlistItemsSort.LASTEST);

    const sortedItems = useMemo(() => sorting(wishlistItems, sort), [wishlistItems, sort]);

    return { sort, setSort, sortedItems };
}
