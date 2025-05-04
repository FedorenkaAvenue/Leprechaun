import { FC } from 'react';

import { DashboardContent } from '@entities/dashboard/model/enums';
import DashboardEntity from '@entities/dashboard/ui/Dashboard';
import useContentTypeData from '../lib/useContentTypeData';
import { ProductCardPreview } from '@entities/product/ui/ProductCards';
import WishlistItemAdd from '../../wishlist/ui/WishlistItemAdd';

interface Props {
    contentType: DashboardContent
}

const Dashboard: FC<Props> = ({ contentType }) => {
    const { data, isLoading } = useContentTypeData(contentType);

    return (
        <DashboardEntity
            list={data?.list}
            title={data?.title}
            isLoading={isLoading}
            renderProductCard={product => (
                <ProductCardPreview
                    product={product}
                    renderBottomOptions={({ id }) => <WishlistItemAdd productId={id} />}
                />
            )}
        />
    );
};

export default Dashboard;
