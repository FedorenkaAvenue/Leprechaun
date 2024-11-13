'use client';

import { useWishList } from "@entities/wishlist/api/hook";
import WishlistProductCard from "@widgets/product/ui/WishlistCard";

const WishList = () => {
    const { data } = useWishList();

    return (
        <ul>
            {
                data?.map(i => (
                    <li key={i.id}>
                        <WishlistProductCard {...i} />
                    </li>
                ))
            }
        </ul>
    );
};

export default WishList;
