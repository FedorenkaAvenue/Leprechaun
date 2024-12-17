'use client';

import { Heart } from 'lucide-react';

import { useWishList } from '@entities/wishlist/api/hook';
import BadgeWithCount from '@shared/ui/BadgeWithCount';
import AppLink from '@shared/ui/AppLink';

const WishListBadge = () => {
    const { data } = useWishList();

    return (
        <AppLink href="/wishlist">
            <BadgeWithCount count={data?.length}>
                <Heart width='30' height='30' />
            </BadgeWithCount>
        </AppLink>
    );
};

export default WishListBadge;
