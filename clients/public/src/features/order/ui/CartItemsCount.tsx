'use client';

import { FC } from 'react';

import { useCart } from '@entities/order/model/hooks';

interface Props {
    className?: string
}

const CartItemsCount: FC<Props> = ({ className }) => {
    const { data } = useCart();
    const amount = data?.items.length;

    return amount
        ? <span className={className}>{data?.items.length}</span>
        : null;
};

export default CartItemsCount;
