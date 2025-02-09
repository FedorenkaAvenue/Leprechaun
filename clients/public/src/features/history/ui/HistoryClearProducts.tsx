'use client'

import { FC, useCallback } from 'react';

import { Button } from '@primitives/ui/button';
import { useI18n } from '@shared/lib/i18n_client';
import { useClearProductHistory } from '../model/hooks';
import { useProductHistory } from '@entities/history/model/hooks';

const HistoryClearProducts: FC = () => {
    const { dictionary } = useI18n();
    const { mutate } = useClearProductHistory();
    const { data } = useProductHistory();

    const clear = useCallback(() => {
        if (data.length > 0) mutate();
    }, [data]);

    return (
        <Button onClick={clear}>{dictionary?.history.clearHistory}</Button>
    );
};

export default HistoryClearProducts;
