import { FC } from 'react';

import ProductOverview from '@widgets/product/ui/ProductOverview';
import { getProduct } from '@entities/product/api';

interface Props {
    params: Promise<{ id: string }>
}

const Product: FC<Props> = async ({ params }) => {
    const { id } = await params;
    const product = await getProduct(id);

    return (
        <div>
            <ProductOverview product={product} />
        </div>
    );
};

export default Product;
