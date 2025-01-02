'use client';

import { FC, Suspense } from 'react';

import { useCart } from '@entities/order/model/hooks';
import CartWidget from '@widgets/order/ui/Cart';

const Cart: FC = () => {
    const { data } = useCart();

    return (
        <Suspense fallback='...loading'>
            <CartWidget data={data} />
        </Suspense>
    );
};

export default Cart;
