import { Metadata } from 'next';
import { cache } from 'react';

import { getProduct } from '@entities/product/api';
import { RouteProps } from '@shared/models/router';
import ProductNavigation from '@widgets/product/ui/ProductNavigation';
import ProductLabel from '@entities/product/ui/ProductLabel';
import Price from '@shared/ui/Price';
import WishlistItemAdd from '@widgets/wishlist/ui/WishlistItemAdd';
import CartAddItem from '@features/order/ui/CartAddItem';
import { Card } from '@primitives/ui/card';

type Props = RouteProps<{ id: string }>

const getProductCached = cache(getProduct);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { title } = await getProductCached((await params).id);

    return { title };
}

export default async function Product({ params }: Props) {
    const { id } = await params;
    const product = await getProductCached(id);

    return (
        <div>
            <ProductNavigation product={product} />
            <Card className='grid grid-cols-2 gap-1' size='tiny'>
                <div className='relative'>
                    {
                        product.labels
                        && (
                            <ul className='absolute top-0 left-0'>
                                {product.labels.map((label, i) => (
                                    <li key={i}>
                                        <ProductLabel {...label} />
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                    <div>images</div>
                </div>
                <div className='grid gap-4'>
                    <h1>{product.title}</h1>
                    <div className='flex justify-between items-center'>
                        <Price price={product.price} />
                        <WishlistItemAdd productId={product.id} />
                    </div>
                    <CartAddItem productId={product.id} type='button' />
                </div>
            </Card>
        </div>
    );
}
