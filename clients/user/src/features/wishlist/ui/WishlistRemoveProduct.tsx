import { FC } from 'react';
import { Trash } from 'lucide-react';

import { useRemoveProductToWishlist } from '../api/hooks';
import { WishListItemModel } from '@entities/wishlist/models/WishList';

interface Props {
    itemId: WishListItemModel['id']
}

const WishlistRemoveProduct: FC<Props> = ({ itemId }) => {
    const { mutate } = useRemoveProductToWishlist(itemId);

    return <Trash onClick={() => mutate()} />;
};

export default WishlistRemoveProduct;
