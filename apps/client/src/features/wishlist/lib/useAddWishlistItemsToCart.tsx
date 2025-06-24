import { useCallback, useMemo } from 'react';

import { OrderItemAddDTO } from '@features/order/api/dto';
import { useAddOrderItems } from '@features/order/model/hook';
import { useCart } from '@entities/order/model/hooks';
import { WishlistPublic } from '@gen/wishlist';
import { ProductStatus } from '@gen/product';

interface Result {
    addWishlistItemsToCart: () => void;
    isDisableToAdd: boolean | undefined;
    isLoading: boolean
}

export default function useAddWishlistItemsToCart(wishlist: WishlistPublic): Result {
    const { mutate, isPending: addOrderItemsIsPending } = useAddOrderItems();
    const { data: cart, isFetching: cartIsFetching } = useCart();

    const availableWishlistItems = useMemo(
        () => wishlist?.items?.filter(({ product: { status } }) => status === ProductStatus.AVAILABLE_STATUS),
        [wishlist],
    );

    // map availableWishlistItems items to OrderItemAddDTO[]
    const orderItems = useMemo(
        () => availableWishlistItems?.map<OrderItemAddDTO>(({ product: { id } }) => ({ product: id, amount: 1 })),
        [availableWishlistItems],
    );

    // check if cart includes available wishlist items
    const isDisableToAdd = useMemo(
        () => availableWishlistItems?.every(
            ({ product }) => cart?.items.find(({ product: { id } }) => id === product.id)
        ),
        [availableWishlistItems, cart],
    );

    const addWishlistItemsToCart = useCallback(() => {
        orderItems && mutate(orderItems);
    }, [orderItems]);

    return {
        addWishlistItemsToCart,
        isDisableToAdd,
        isLoading: cartIsFetching || addOrderItemsIsPending,
    };
}
