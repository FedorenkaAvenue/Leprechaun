import { useCallback, useMemo } from "react";

import { WishlistModel } from "@entities/wishlist/model/interfaces";
import { OrderItemAddDTO } from "@features/order/api/dto";
import { useAddOrderItems } from "@features/order/model/hook";
import { useCart } from "@entities/order/model/hooks";

interface Result {
    addWishlistItemsToCart: () => void;
    isDisableToAdd: boolean | undefined;
    isLoading: boolean
}

export default function useAddWishlistItemsToCart(wishlist: WishlistModel): Result {
    const { mutate, isPending: addOrderItemsIsPending } = useAddOrderItems();
    const { data: cart, isFetching: cartIsFetching } = useCart();

    const orderItems = useMemo(() => wishlist?.items?.map<OrderItemAddDTO>(({ product: { id } }) => ({
        product: id, amount: 1,
    })), [wishlist]);
    const isDisableToAdd = useMemo(() => wishlist?.items?.every(
        ({ product }) => cart?.items.find(({ product: { id } }) => id === product.id)
    ), [wishlist, cart]);

    const addWishlistItemsToCart = useCallback(() => {
        orderItems && mutate(orderItems);
    }, [orderItems]);

    return {
        addWishlistItemsToCart,
        isDisableToAdd,
        isLoading: cartIsFetching || addOrderItemsIsPending,
    };
}
