'use client';

import { useWishlists } from '@entities/wishlist/model/hooks';
import { useI18n } from '@shared/lib/i18n_client';
import Grid from '@shared/ui/Grid';
import WishlistCard from '@widgets/wishlist/ui/WishlistCard';
import WishlistCreate from '@widgets/wishlist/ui/WIshlistCreate';

const WishList = () => {
    const { data } = useWishlists();
    const { dictionary } = useI18n();

    const sortedWishlists = data?.sort(
        (a, b) => new Date(b.items_updated_at).valueOf() - new Date(a.items_updated_at).valueOf()
    );

    return (
        <section>
            <div className='flex justify-between mb-5'>
                <h1>{dictionary?.wishList.wishlists}</h1>
                <WishlistCreate />
            </div>
            {
                data.length > 0
                    ? (
                        <Grid direction='column' size='l'>
                            {
                                sortedWishlists?.map(i => (
                                    <li key={i.id}><WishlistCard wishlist={i} /></li>
                                ))
                            }
                        </Grid>
                    )
                    : <div>{dictionary?.wishList.emptyList}</div>
            }
        </section>
    );
};

export default WishList;
