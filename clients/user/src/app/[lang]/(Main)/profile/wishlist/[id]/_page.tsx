'use client';

import { FC } from 'react';

import { useWishlist } from '@entities/wishlist/model/hooks';
import { useI18n } from '@shared/lib/i18n_client';
import WishlistShare from '@features/wishlist/ui/WishlistShare';
import WishlistProductCard from '@widgets/wishlist/ui/WishlistProductCard';
import WishlistOptions from '@features/wishlist/ui/WishlistOptions';
import WishlistAddToCart from '@features/wishlist/ui/WishlistAddToCart';
import WishlistSortList from '@widgets/wishlist/ui/WishlistSortList';
import useSortWishlistItems from '@widgets/wishlist/lib/useSortWishlistItems';
import Grid from '@shared/ui/Grid';

interface Props {
    wishlistId: string
}

const Wishlist: FC<Props> = ({ wishlistId }) => {
    const { dictionary } = useI18n();
    const wishlist = useWishlist(wishlistId);
    const { sort, setSort, sortedItems } = useSortWishlistItems(wishlist.items);

    return (
        <section className='flex flex-col gap-4'>
            <div className='flex justify-between'>
                <h1>{wishlist?.title || dictionary?.wishList.myList}</h1>
                <div className='flex gap-2'>
                    <WishlistShare wishlistId={wishlist.id} />
                    <WishlistOptions wishlist={wishlist} />
                </div>
            </div>
            {
                wishlist.items.length > 0 && (
                    <div className='flex justify-between'>
                        <WishlistAddToCart wishlist={wishlist} />
                        <WishlistSortList value={sort} handleChange={setSort} />
                    </div>
                )
            }
            <Grid type='column'>
                {sortedItems.map(i => <li key={i.id}><WishlistProductCard item={i} /></li>)}
            </Grid>
        </section>
    );
};

export default Wishlist;
