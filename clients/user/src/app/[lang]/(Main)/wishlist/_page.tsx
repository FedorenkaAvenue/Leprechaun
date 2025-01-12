'use client';

import { Suspense } from "react";

import { useWishlists } from "@entities/wishlist/model/hooks";
import { useI18n } from "@shared/lib/i18n_client";
import WishlistCard from "@widgets/wishlist/ui/WishlistCard";
import WishlistCreate from "@widgets/wishlist/ui/WIshlistCreate";

const WishList = () => {
    const { data } = useWishlists();
    const { dictionary } = useI18n();

    const sortedWishlists = data?.sort(
        (a, b) => new Date(b.items_updated_at).valueOf() - new Date(a.items_updated_at).valueOf()
    );

    return (
        <div>
            <div className='flex justify-between mb-6'>
                <h1>{dictionary?.wishList.wishlists}</h1>
                <WishlistCreate />
            </div>
            <Suspense fallback='...loading'>
                {
                    data.length > 0
                        ? (
                            <ul>
                                {
                                    sortedWishlists?.map(i => (
                                        <li key={i.id} className='mb-3'>
                                            <WishlistCard wishlist={i} />
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                        : <div>{dictionary?.wishList.emptyList}</div>
                }
            </Suspense>
        </div>
    );
};

export default WishList;
