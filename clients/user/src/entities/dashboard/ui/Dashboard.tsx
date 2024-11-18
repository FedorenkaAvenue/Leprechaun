import { FC } from 'react';

import { ProductPreviewModel } from '@entities/product/models/Product';
import { ProductCardPreview } from '@entities/product/ui/productCards';

interface Props {
    title: string
    list: ProductPreviewModel[] | undefined
    isLoading: boolean
}

const Dashboard: FC<Props> = ({ title, list }) => {
    if (!list?.length) return null;

    return (
        <div>
            <h4 className='text-2xl mb-3'>{title}</h4>
            <ul className='grid grid-cols-5 gap-2'>
                {
                    list?.map(i => (
                        <ProductCardPreview product={i} />
                    ))
                }
            </ul>
        </div>
    );
};

export default Dashboard;
