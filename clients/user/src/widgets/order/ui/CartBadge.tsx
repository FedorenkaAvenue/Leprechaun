'use client';

import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

import { useCart } from '@entities/order/api/hooks';
import BadgeWithCount from '@shared/ui/BadgeWithCount';

const CartBadge = () => {
    const { data } = useCart();

    return (
        <Link href='/cart'>
            <BadgeWithCount count={data?.list.length}>
                <ShoppingCartIcon width='30' height='30' />
            </BadgeWithCount>
        </Link>
    );
};

export default CartBadge;
