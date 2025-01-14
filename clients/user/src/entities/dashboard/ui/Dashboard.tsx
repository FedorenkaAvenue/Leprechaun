'use client'

import { FC, ReactNode, useMemo, useState } from 'react';

import { DashboardModel } from '../model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';
import { ProductPreviewModel } from '@entities/product/model/interfaces';
import { Skeleton } from '@primitives/ui/skeleton';
import { ProductCardPreviewSkeleton } from '@entities/product/ui/ProductCards';

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
        <div>
            <h3 className='text-2xl mb-3'>{title}</h3>
            <ul className='flex gap-2'>
                {visibleList?.map(i => <li key={i.id}>{renderProductCard(i)}</li>)}
            </ul>
            {
                !isOpen && !isLoading && list?.length as number > MAX_DASHBOARD_ITEM
                && (
                    <div className='flex justify-end'>
                        <div onClick={() => setOpen(true)}>{dictionary?.common.showMore}</div>
                    </div>
                )
            }
        </div>
    );
};

export const DashboardSkeleton: FC = () => (
    <div className='flex flex-col gap-4 mb-5'>
        <Skeleton className='h-8 w-32' />
        <div className='flex gap-2'>
            {[...new Array(5)].map((_, i) => <ProductCardPreviewSkeleton key={i} />)}
        </div>
    </div>
);

export default Dashboard;
