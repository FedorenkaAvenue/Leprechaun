'use client';

import { useWishList } from "@entities/wishlist/model/hooks";
import { useI18n } from "@shared/lib/i18n_client";
import WishlistCard from "@widgets/wishlist/ui/WishlistCard";
import WishlistCreate from "@widgets/wishlist/ui/WIshlistCreate";

const WishList = () => {
    const { data, isLoading } = useWishList();
    const { dictionary } = useI18n();

    if (!isLoading && !data?.length) {
        return (
            <div>{dictionary?.wishList.emptyList}</div>
        )
    }

    const sortedWishlists = data?.sort(
        (a, b) => new Date(b.items_updated_at).valueOf() - new Date(a.items_updated_at).valueOf()
    );

    return (
        <div>
            <div className='flex justify-between mb-6'>
                <h1>{dictionary?.wishList.wishlists}</h1>
                <WishlistCreate />
            </div>
            <ul className="">
                {
                    sortedWishlists?.map(i => (
                        <li key={i.id}>
                            <WishlistCard wishlist={i} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default WishList;
