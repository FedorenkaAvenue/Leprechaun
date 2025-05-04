import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addToCart, changeOrderItemAmount, removeOrderItem } from '../api';
import { OrderItemAddDTO, OderItemChangeAmountDTO } from '../api/dto';
import { CART_QUERY } from '@entities/order/constants/queryKeys';
import { OrderItemModel } from '@entities/order/model/interfaces';
import { useCart } from '@entities/order/model/hooks';

export function useAddOrderItems() {
    const qClient = useQueryClient();

    return useMutation({
        mutationFn: (items: OrderItemAddDTO[]) => addToCart(items),
        onSuccess: data => {
            qClient.setQueryData([CART_QUERY], data);
        }
    })
}

export function useChangeOrderItemAmount(orderItemId: OrderItemModel['id']) {
    const client = useQueryClient();
    const { setUpdating } = useCart();

    return useMutation({
        mutationFn: (amount: OderItemChangeAmountDTO['amount']) => changeOrderItemAmount(orderItemId, { amount }),
        onMutate: () => setUpdating(true),
        onSuccess: data => {
            client.setQueryData([CART_QUERY], data);
        },
        onSettled: () => setUpdating(false),
    })
}

export function useRemoveOrderItem(itemId: OrderItemModel['id']) {
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
