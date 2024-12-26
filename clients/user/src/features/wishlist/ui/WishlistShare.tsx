import { FC } from 'react';

import IconButton from '@shared/ui/IconButton';
import { WishlistModel } from '@entities/wishlist/model/interfaces';
import Share from '@shared/ui/Share';

interface Props {
    wishlistId: WishlistModel['id']
}

const WishlistShare: FC<Props> = ({ wishlistId }) => {
    return (
        <IconButton>
            <Share link={`/wishlist_share/${wishlistId}`} />
        </IconButton>
    );
};

export default WishlistShare;
