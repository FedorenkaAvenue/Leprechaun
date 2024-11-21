import { FC, ReactNode, useMemo, useState } from 'react';

import { DashboardModel } from '../model/Dashboard';
import { ProductPreviewModel } from '@entities/product/models/Product';

interface Props extends DashboardModel {
    isLoading: boolean
    renderProductCard: (product: ProductPreviewModel) => ReactNode;
}

const Dashboard: FC<Props> = ({ title, list, isLoading, renderProductCard }) => {
    if (!list?.length && !isLoading) return null;

    const [isOpen, setOpen] = useState<boolean>(false);
    const visibleList = useMemo(
        () => isOpen ? list : list?.slice(0, 5),
        [isOpen, isLoading, list]
    );

    return (
        <div>
            <h4 className='text-2xl mb-3'>{title}</h4>
            <ul className='grid grid-cols-5 gap-2'>
                {visibleList?.map(i => <li key={i.id}>{renderProductCard(i)}</li>)}
            </ul>
            {
                !isOpen && !isLoading
                && (
                    <div className='flex justify-end'>
                        <div onClick={() => setOpen(true)}>show more</div>
                    </div>
                )
            }
        </div>
    );
};

export default Dashboard;
