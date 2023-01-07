'use client';

import { useQuery } from "@tanstack/react-query";

import HeaderIcon from "../HeaderIcon";
import wishlistIcon from '@root/public/icons/favorite.svg';
import getWishlist from "@api/wishlist/get";

const WishListIcon = ({ locale }: any) => {
    const { isLoading, data } = useQuery(['wishlist'], getWishlist);

    return (
        <HeaderIcon
            icon={wishlistIcon}
            link='/wishlist'
            alt='wishlist'
            isLoading={isLoading}
            locale={locale}
            count={data?.length as number}
        />
    );
}

export default WishListIcon;
