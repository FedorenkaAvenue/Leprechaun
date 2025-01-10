'use client';

import { FC, Suspense } from 'react';

import { useWishlists } from '@entities/wishlist/model/hooks';
import { WishlistModel } from '@entities/wishlist/model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';
import WishlistShare from '@features/wishlist/ui/WishlistShare';
import WishlistProductCard from '@widgets/wishlist/ui/WishlistProductCard';
import WishlistOptions from '@features/wishlist/ui/WishlistOptions';
import WishlistAddToCart from '@features/wishlist/ui/WishlistAddToCart';
import WishlistSortList from '@widgets/wishlist/ui/WishlistSortList';
import useSortWishlistItems from '@widgets/wishlist/lib/useSortWishlistItems';

interface Props {
    wishlistId: string
}

const Wishlist: FC<Props> = ({ wishlistId }) => {
    const { dictionary } = useI18n();
    const { data } = useWishlists();
    const currentWishlist = data?.find(({ id }) => id === wishlistId) as WishlistModel;
    const { sort, setSort, sortedItems } = useSortWishlistItems(currentWishlist.items);

    return (
        <div className='flex flex-col gap-2'>
            <Suspense fallback='...loading'>
                <>
                    <div className='flex justify-between'>
                        <h1>{currentWishlist?.title || dictionary?.wishList.myList}</h1>
                        <div>
                            <WishlistShare wishlistId={currentWishlist.id} />
                            <WishlistOptions wishlist={currentWishlist} />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        {currentWishlist.items.length > 0 && <WishlistAddToCart wishlistId={currentWishlist.id} />}
                        <WishlistSortList value={sort} handleChange={setSort} />
                    </div>
                    <ul className='flex'>
                        {sortedItems.map(i => (
                            <li key={i.id}>
                                <WishlistProductCard {...i} />
                            </li>
                        ))}
                    </ul>
                </>
            </Suspense>
        </div>
    );
};

export default Wishlist;
