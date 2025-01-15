'use client';

import { Heart } from 'lucide-react';

import { useWishlists } from '@entities/wishlist/model/hooks';
import BadgeWithCount from '@shared/ui/BadgeWithCount';
import AppLink from '@shared/ui/AppLink';
import WishlistItemsCount from '@features/wishlist/ui/WishlistItemsCount';

const WishListBadge = () => {
    const { data } = useWishlists();

    return (
        <AppLink href='/profile/wishlist'>
            <BadgeWithCount count={<WishlistItemsCount />}>
                <Heart width='30' height='30' />
            </BadgeWithCount>
        </AppLink>
    );
};

export default WishListBadge;
