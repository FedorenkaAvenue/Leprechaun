'use client';

import { useWishlists } from '@entities/wishlist/model/hooks';
import { useI18n } from '@shared/lib/i18n_client';
import Grid from '@shared/ui/Grid';
import WishlistCard from '@widgets/wishlist/ui/WishlistCard';

const WishList = () => {
    const { data } = useWishlists();
    const { dictionary } = useI18n();

    const sortedWishlists = data?.sort(
        (a, b) => new Date(b.items_updated_at).valueOf() - new Date(a.items_updated_at).valueOf()
    );

    return data.length > 0
        ? (
            <Grid gap='l'>
                {sortedWishlists?.map(i => <li key={i.id}><WishlistCard wishlist={i} /></li>)}
            </Grid>
        )
        : <div>{dictionary?.wishList.emptyList}</div>

};

export default WishList;
