'use client';

import { FC, Suspense } from 'react';

import { useCart } from '@entities/order/model/hooks';
import { useI18n } from '@shared/lib/i18n_client';
import CartItem from '@widgets/order/ui/CartItem';
import { Card } from '@primitives/ui/card';

const Cart: FC = () => {
    const { data } = useCart();
    const { dictionary } = useI18n();

    if (typeof data === 'object' && !data) {
        return (
            <div>{dictionary?.cart.emptyCart}</div>
        )
    }

    return (
        <div>
            <h1 className='mb-6'>{dictionary?.cart.cart}</h1>
            <Suspense fallback='...loading'>
                <div className='flex justify-between gap-4'>
                    <ul className='flex flex-col gap-4 flex-grow'>
                        {data?.items.map(i => (
                            <li key={i.id}>
                                <CartItem {...i} />
                            </li>
                        ))}
                    </ul>
                    <Card>
                        <div>{dictionary?.cart.summaryProductAmount}: {data?.summary.productsAmount}</div>
                        <div>{dictionary?.cart.summaryPrice}: {data?.summary.price}</div>
                    </Card>
                </div>
            </Suspense>
        </div>
    );
};

export default Cart;
