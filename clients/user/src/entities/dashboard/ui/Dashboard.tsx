'use client'

import { FC, ReactNode, useMemo, useState } from 'react';

import { DashboardModel } from '../model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';
import { ProductPreviewModel } from '@entities/product/model/interfaces';
import { Skeleton } from '@primitives/ui/skeleton';
import { ProductCardPreviewSkeleton } from '@entities/product/ui/ProductCards';
import Grid from '@shared/ui/Grid';

interface Props extends DashboardModel {
    isLoading: boolean
    renderProductCard: (product: ProductPreviewModel) => ReactNode;
}

const MAX_DASHBOARD_ITEM = 5;

const Dashboard: FC<Props> = ({ title, list, isLoading, renderProductCard }) => {
    if (!list?.length && !isLoading) return null;

    const { dictionary } = useI18n();
    const [isOpen, setOpen] = useState<boolean>(false);
    const visibleList = useMemo(
        () => isOpen ? list : list?.slice(0, MAX_DASHBOARD_ITEM),
        [isOpen, isLoading, list]
    );

    return (
        <article>
            <h2 className='text-2xl mb-3'>{title}</h2>
            <Grid type='column'>
                {visibleList?.map(i => <li key={i.id}>{renderProductCard(i)}</li>)}
            </Grid>
            {
                !isOpen && !isLoading && list?.length as number > MAX_DASHBOARD_ITEM
                && (
                    <div className='flex justify-end'>
                        <div onClick={() => setOpen(true)}>{dictionary?.common.showMore}</div>
                    </div>
                )
            }
        </article>
    );
};

export const DashboardSkeleton: FC = () => (
    <div className='flex flex-col gap-4'>
        <Skeleton className='h-8 w-32' />
        <Grid type='column'>
            {[...new Array(5)].map((_, i) => <ProductCardPreviewSkeleton key={i} />)}
        </Grid>
    </div>
);

export default Dashboard;
