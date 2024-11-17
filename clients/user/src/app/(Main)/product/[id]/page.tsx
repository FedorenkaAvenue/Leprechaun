import { FC } from 'react';

import ProductOverview from '@widgets/product/ui/Overview';
import { getProduct } from '@entities/product/api';

interface Props {
    params: Promise<{ id: string }>
}

const Product: FC<Props> = async ({ params }) => {
    const { id } = await params;
    const product = await getProduct(id);

    console.log(product);

    return (
        <div>
            <ProductOverview product={product} />
        </div>
    );
};

export default Product;
