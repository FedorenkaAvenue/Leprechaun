import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { ProductPreviewModel } from '@entities/product/model/interfaces';
import { PRODUCT_HISTORY_QUERY } from '@entities/history/constants/queryKeys';
import { ProductHistoryModel } from '@entities/history/model/interfaces';
import { clearProductHistory } from '../api';

type Result = (product: ProductPreviewModel) => void;

export function useUpdateProductHistory(): Result {
    const client = useQueryClient();

    return useCallback((product: ProductPreviewModel) => {
        const products = client.getQueryData<ProductHistoryModel>([PRODUCT_HISTORY_QUERY]) as ProductHistoryModel;

        client.setQueryData([PRODUCT_HISTORY_QUERY], [product, ...products.filter(({ id }) => id !== product.id)]);
    }, []);
}

export function useClearProductHistory() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: clearProductHistory,
        onMutate: () => {
            const productHistory = client.getQueryData<ProductPreviewModel[]>([PRODUCT_HISTORY_QUERY]);

            client.setQueryData([PRODUCT_HISTORY_QUERY], []);

            return productHistory;
        },
        onError: (err, _, prevData) => {
            client.setQueryData([PRODUCT_HISTORY_QUERY], prevData);
        }
    })
}
