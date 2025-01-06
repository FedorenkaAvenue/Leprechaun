import { Metadata } from 'next';

import ProductOverview from '@widgets/product/ui/ProductOverview';
import { getProduct } from '@entities/product/api';
import { RouteProps } from '@shared/models/router';

type Props = RouteProps<{ id: string }>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { title } = await getProduct((await params).id);

    return { title };
}

export default async function Product({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);

    return (
        <div>
            <ProductOverview product={product} />
        </div>
    );
}
