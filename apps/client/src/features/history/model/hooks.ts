import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { PRODUCT_HISTORY_QUERY } from '@entities/history/constants/queryKeys';
import { clearProductHistory } from '../api';
import { ProductPreviewPublic } from '@gen/product';
import { HistoryPublic } from '@gen/history';

type Result = (product: ProductPreviewPublic) => void;

export function useUpdateProductHistory(): Result {
    const client = useQueryClient();

    return useCallback((product: ProductPreviewPublic) => {
        const products = client.getQueryData<HistoryPublic[]>([PRODUCT_HISTORY_QUERY]) as HistoryPublic[];

        client.setQueryData([PRODUCT_HISTORY_QUERY], [product, ...products.filter(({ id }) => id !== product.id)]);
    }, []);
}

export function useClearProductHistory() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: clearProductHistory,
        onMutate: () => {
            const productHistory = client.getQueryData<ProductPreviewPublic[]>([PRODUCT_HISTORY_QUERY]);

            client.setQueryData([PRODUCT_HISTORY_QUERY], []);

            return productHistory;
        },
        onError: (err, _, prevData) => {
            client.setQueryData([PRODUCT_HISTORY_QUERY], prevData);
        }
    })
}
