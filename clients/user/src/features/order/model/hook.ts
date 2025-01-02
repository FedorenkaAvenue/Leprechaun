import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addToCart, changeOrderItemAmount, removeOrderItem } from "../api";
import { OrderItemAddDTO, OderItemChangeAmountDTO } from "../api/dto";
import { CART_QUERY } from "@entities/order/constants/queryKeys";
import { OrderItemModel } from "@entities/order/model/interfaces";

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

    return useMutation({
        mutationFn: (amount: OderItemChangeAmountDTO['amount']) => changeOrderItemAmount(orderItemId, { amount }),
        onSuccess: data => {
            client.setQueryData([CART_QUERY], data);
        }
    })
}

export function useRemoveOrderItem(itemId: OrderItemModel['id']) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => removeOrderItem(itemId),
        onSuccess: data => {
            client.setQueryData([CART_QUERY], data);
        }
    })
}
