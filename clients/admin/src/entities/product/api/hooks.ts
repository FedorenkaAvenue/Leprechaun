import { useQuery } from "@tanstack/react-query";

import { getProduct } from ".";
import { PRODUCT_QUERY } from "../constants/queryKeys";
import { ProductModel } from "../model/Product";

export function useProduct(id: ProductModel['id'] | undefined) {
    return useQuery({
        queryFn: () => getProduct(id),
        queryKey: [PRODUCT_QUERY, id],
    });
}
