import { FC } from 'react';
import { Trash } from 'lucide-react';

import { useRemoveProductFromWishlist } from '../api/hooks';
import { WishlistModel } from '@entities/wishlist/models/WishList';

interface Props {
    itemId: WishlistModel['id']
}

const WishlistRemoveProduct: FC<Props> = ({ itemId }) => {
    const { mutate } = useRemoveProductFromWishlist(itemId);

    return <Trash onClick={() => mutate()} />;
};

export default WishlistRemoveProduct;
