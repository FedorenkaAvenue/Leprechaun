import { FC } from 'react';

import { ProductOverviewModel } from '@entities/product/model/interfaces';

interface Props {
    product: ProductOverviewModel
}

const ProductOverview: FC<Props> = ({ product }) => {
    return (
        <div>
            loh
            {product.title}
        </div>
    );
};

export default ProductOverview;
