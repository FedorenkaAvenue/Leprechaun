'use client';

import { useWishList } from "@entities/wishlist/api/hook";
import WishlistCard from "@widgets/wishlist/ui/Card";

const WishList = () => {
    const { data } = useWishList();

    return (
        <ul className="grid grid-cols-5 gap-2">
            {
                data?.map(i => (
                    <li key={i.id}>
                        <WishlistCard {...i} />
                    </li>
                ))
            }
        </ul>
    );
};

export default WishList;
