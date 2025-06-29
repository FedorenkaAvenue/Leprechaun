import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addToCart, changeOrderItemAmount, removeOrderItem } from '../api';
import { CART_QUERY } from '@entities/order/constants/queryKeys';
import { useCart } from '@entities/order/model/hooks';
import { OrderItemPublic, OrderItemsPublicCreate_Item, OrderItemUpdatePublic_Data } from '@gen/order';

export function useAddOrderItems() {
    const qClient = useQueryClient();

    return useMutation({
        mutationFn: (items: OrderItemsPublicCreate_Item[]) => addToCart(items),
        onSuccess: data => {
            qClient.setQueryData([CART_QUERY], data);
        }
    })
}

export function useChangeOrderItemAmount(id: OrderItemPublic['id']) {
    const client = useQueryClient();
    const { setUpdating } = useCart();

    return useMutation({
        mutationFn: (amount: OrderItemUpdatePublic_Data['amount']) => changeOrderItemAmount({ amount, id }),
        onMutate: () => setUpdating(true),
        onSuccess: data => {
            client.setQueryData([CART_QUERY], data);
        },
        onSettled: () => setUpdating(false),
    })
}

export function useRemoveOrderItem(itemId: OrderItemPublic['id']) {
    const client = useQueryClient();
    const { setUpdating } = useCart();

    return useMutation({
        mutationFn: () => removeOrderItem(itemId),
        onMutate: () => setUpdating(true),
        onSuccess: data => {
            client.setQueryData([CART_QUERY], data);
        },
        onSettled: () => setUpdating(false),
    })
}
