import { useSuspenseQuery } from "@tanstack/react-query";

import { SUBSCRIBTION_PRODUCT_STATUS } from "../constants/queryKeys";
import { getProductStatusSubscriptions } from "../api";

export function useProductStatusSubscriptions() {
    return useSuspenseQuery({
        queryKey: [SUBSCRIBTION_PRODUCT_STATUS],
        queryFn: getProductStatusSubscriptions,
    });
}
