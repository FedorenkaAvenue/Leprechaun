import { UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";

import { ProductCardModel } from "@entities/product/model/interfaces";
import { useWishList } from "@entities/wishlist/model/hooks";
import { WishlistItemModel } from "@entities/wishlist/model/interfaces";
import { WishlistModel } from "@entities/wishlist/model/interfaces";

interface Result {
    isFetching: UseQueryResult['isFetching']
    selected: WishlistItemModel | undefined
    selectedWishlist: WishlistModel | undefined
}

export default function useAddedToWishlist(productId: ProductCardModel['id'], getWishlist: boolean): Result {
    const { data, isFetching } = useWishList();

    const selected = useMemo(
        () => data?.flatMap(({ items }) => items).find(({ product }) => product.id === productId),
        [data],
    );

    const selectedWishlist = useMemo(
        () => getWishlist && selected
            ? data?.find(({ items }) => items.find(({ product: { id } }) => id === productId))
            : undefined
        ,
        [getWishlist, selected],
    );

    return { isFetching, selected, selectedWishlist };
}
