'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

import { useWishList } from '@entities/wishlist/api/hook';
import BadgeWithCount from '@shared/ui/BadgeWithCount';

const WishListBadge = () => {
    const { data } = useWishList();

    return (
        <Link href="/wishlist">
            <BadgeWithCount count={data?.length}>
                <Heart width='30' height='30' />
            </BadgeWithCount>
        </Link>
    );
};

export default WishListBadge;
