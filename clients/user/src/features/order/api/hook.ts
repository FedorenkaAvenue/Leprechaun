import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addToCart } from ".";
import { AddOrderItemDTO } from "../models/DTO";
import { CART_QUERY } from "@entities/order/constants/queryKeys";

export function useAddOrderItem() {
    const qClient = useQueryClient();

    return useMutation({
        mutationFn: (item: AddOrderItemDTO) => addToCart(item),
        onSuccess: (data) => {
            qClient.setQueryData([CART_QUERY], data);
        }
    })
}
