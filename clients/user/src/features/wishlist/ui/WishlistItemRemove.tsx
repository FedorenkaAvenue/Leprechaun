import { FC } from 'react';
import { Trash } from 'lucide-react';

import { useRemoveProductFromWishlist } from '../model/hooks';
import { WishlistModel } from '@entities/wishlist/model/interfaces';
import IconButton from '@shared/ui/IconButton';

interface Props {
    itemId: WishlistModel['id']
}

const WishlistItemRemove: FC<Props> = ({ itemId }) => {
    const { mutate } = useRemoveProductFromWishlist(itemId);

    return <IconButton onClick={() => mutate()}><Trash /></IconButton>;
};

export default WishlistItemRemove;
