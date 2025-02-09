import { Metadata } from 'next';
import { cache } from 'react';

import { getProduct } from '@entities/product/api';
import { RouteProps } from '@shared/models/router';

type Props = RouteProps<{ id: string }>

const getProductCached = cache(getProduct);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { title } = await getProductCached((await params).id); // dont do with cause api create two product histories

    return { title };
}

export default async function Product({ params }: Props) {
    const { id } = await params;
    const product = await getProductCached(id);

    return (
        <div>
            {product.title}
        </div>
    );
}
