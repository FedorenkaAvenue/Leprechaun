import { FC } from 'react';

import { Button } from '@shared/ui/Button';
import useAddWishlistItemsToCart from '../lib/useAddWishlistItemsToCart';
import { WishlistModel } from '@entities/wishlist/model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';

interface Props {
    wishlistId: WishlistModel['id']
}

const WishlistAddToCart: FC<Props> = ({ wishlistId }) => {
    const { dictionary } = useI18n();
    const { addWishlistItemsToCart, isDisableToAdd, isLoading } = useAddWishlistItemsToCart(wishlistId);

    return (
        <Button onClick={() => addWishlistItemsToCart()} disabled={isDisableToAdd}>
            {isLoading ? '..loading' : dictionary?.wishList.buyAllItems}
        </Button>
    );
};

export default WishlistAddToCart;
