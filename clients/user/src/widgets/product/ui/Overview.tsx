import { FC } from 'react';

import { ProductOverviewModel } from '@entities/product/models/Product';

interface Props {
    product: ProductOverviewModel
}

const ProductOverview: FC<Props> = ({ product }) => {
    return (
        <div>
            {product.title}
        </div>
    );
};

export default ProductOverview;
