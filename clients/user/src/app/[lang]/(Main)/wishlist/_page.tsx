'use client';

import { useWishList } from "@entities/wishlist/api/hook";
import { useI18n } from "@shared/lib/i18n_client";
import WishlistProductCard from "@widgets/wishlist/ui/WishlistProductCard";

const WishList = () => {
    const { data, isLoading } = useWishList();
    const { dictionary } = useI18n();

    if (!isLoading && !data?.length) {
        return (
            <div>{dictionary?.wishList.emptyList}</div>
        )
    }

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
