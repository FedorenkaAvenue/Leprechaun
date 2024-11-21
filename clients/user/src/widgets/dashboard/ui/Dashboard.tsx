import { FC } from 'react';

import { DashboardContent } from '@entities/dashboard/model/DashboardContent';
import DashboardEntity from '@entities/dashboard/ui/Dashboard';
import useContentTypeData from '../lib/useContentTypeData';
import { ProductCardPreview } from '@entities/product/ui/productCards';
import WishlistAddProduct from '@features/wishlist/ui/WishlistAddProduct';

interface Props {
    contentType: DashboardContent
}

const Dashboard: FC<Props> = ({ contentType }) => {
    const { data, isLoading } = useContentTypeData(contentType);

    return (
        <DashboardEntity
            list={data}
            title='lol'
            isLoading={isLoading}
            renderProductCard={product => (
                <ProductCardPreview
                    product={product}
                    renderOptions={({ id }) => <WishlistAddProduct productId={id} />}
                />
            )}
        />
    );
};

export default Dashboard;
