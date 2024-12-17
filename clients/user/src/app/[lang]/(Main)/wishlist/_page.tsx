'use client';

import { useWishList } from "@entities/wishlist/api/hook";
import WishlistProductCard from "@widgets/wishlist/ui/WishlistProductCard";

const WishList = () => {
    const { data } = useWishList();

    return (
        <ul className="grid grid-cols-5 gap-2">
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
