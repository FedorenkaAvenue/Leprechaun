'use client';

import { FC } from 'react';

import { useCart } from '@entities/order/api/hooks';
import CartWidget from '@widgets/order/ui/Cart';

const Cart: FC = () => {
    const { data } = useCart();

    return <CartWidget data={data} />;
};

export default Cart;
