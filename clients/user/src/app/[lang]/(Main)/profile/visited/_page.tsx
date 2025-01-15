'use client';

import { FC } from 'react';

import { useProductHistory } from '@entities/history/model/hooks';
import HistoryProductCard from '@widgets/history/ui/HistoryProductCard';
import Grid from '@shared/ui/Grid';
import { useI18n } from '@shared/lib/i18n_client';

const VisitedClient: FC = () => {
    const { data } = useProductHistory();
    const { dictionary } = useI18n();

    if (data.length === 0) {
        return <div>{dictionary?.history.emptyProductList}</div>
    }

    return (
        <Grid>
            {data.map(i => (
                <li key={i.id}><HistoryProductCard product={i} /></li>
            ))}
        </Grid>
    )
}

export default VisitedClient;
