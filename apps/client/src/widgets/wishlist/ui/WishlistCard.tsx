import { FC } from 'react';

import Wishlist from '@entities/wishlist/ui/Wishlist';
import WishlistShare from '@features/wishlist/ui/WishlistShare';
import WishlistOptions from '@features/wishlist/ui/WishlistOptions';
import { WishlistPublic } from '@gen/wishlist';

interface Props {
    wishlist: WishlistPublic
}

const WishlistCard: FC<Props> = ({ wishlist }) => {
    return (
        <Wishlist
            wishlist={wishlist}
            renderOption={w => (
                <div className='flex gap-2'>
                    <WishlistShare wishlistId={w.id} />
                    <WishlistOptions wishlist={w} />
                </div>
            )}
        />
    );
};

export default WishlistCard;
