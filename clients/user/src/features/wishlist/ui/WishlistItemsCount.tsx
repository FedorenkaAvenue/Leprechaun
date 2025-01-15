'use client';

import { FC } from 'react';

import { useWishlists } from '@entities/wishlist/model/hooks';

interface Props {
    className?: string
}

const WishlistItemsCount: FC<Props> = ({ className }) => {
    const { data } = useWishlists();
    const amount = data?.flatMap(({ items }) => items).length;

    return amount
        ? <span className={className}>{data?.flatMap(({ items }) => items).length}</span>
        : null;
};

export default WishlistItemsCount;
