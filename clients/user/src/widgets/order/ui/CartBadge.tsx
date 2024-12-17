'use client';

import { ShoppingCartIcon } from 'lucide-react';

import { useCart } from '@entities/order/api/hooks';
import BadgeWithCount from '@shared/ui/BadgeWithCount';
import AppLink from '@shared/ui/AppLink';

const CartBadge = () => {
    const { data } = useCart();

    return (
        <AppLink href='/cart'>
            <BadgeWithCount count={data?.list.length}>
                <ShoppingCartIcon width='30' height='30' />
            </BadgeWithCount>
        </AppLink>
    );
};

export default CartBadge;
