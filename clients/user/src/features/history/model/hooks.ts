import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { ProductPreviewModel } from "@entities/product/model/interfaces";
import { PRODUCT_HISTORY_QUERY } from "@entities/history/constants/queryKeys";
import { ProductHistoryModel } from "@entities/history/model/interfaces";

type Result = (product: ProductPreviewModel) => void;

export function useUpdateProductHistory(): Result {
    const client = useQueryClient();

    return useCallback((product: ProductPreviewModel) => {
        const products = client.getQueryData<ProductHistoryModel>([PRODUCT_HISTORY_QUERY]) as ProductHistoryModel;

        client.setQueryData([PRODUCT_HISTORY_QUERY], [product, ...products.filter(({ id }) => id !== product.id)]);
    }, []);
}
