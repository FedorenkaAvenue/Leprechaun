'use client';

import { ShoppingCartIcon } from 'lucide-react';

import { useCart } from '@entities/order/model/hooks';
import BadgeWithCount from '@shared/ui/BadgeWithCount';
import AppLink from '@shared/ui/AppLink';
import CartItemsCount from '@features/order/ui/CartItemsCount';

const CartBadge = () => {
    const { data } = useCart();

    return (
        <AppLink href='/cart'>
            <BadgeWithCount count={<CartItemsCount />}>
                <ShoppingCartIcon width='30' height='30' />
            </BadgeWithCount>
        </AppLink>
    );
};

export default CartBadge;
