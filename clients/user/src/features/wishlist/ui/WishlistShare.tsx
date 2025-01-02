import { FC, Suspense } from 'react';
import dynamic from 'next/dynamic';

import IconButton from '@shared/ui/IconButton';
import { WishlistModel } from '@entities/wishlist/model/interfaces';

const Share = dynamic(() => import('@shared/ui/Share'), { ssr: false });

interface Props {
    wishlistId: WishlistModel['id']
}

const WishlistShare: FC<Props> = ({ wishlistId }) => {
    return (
        <IconButton>
            <Suspense fallback="...loading">
                <Share link={`/wishlist_share/${wishlistId}`} />
            </Suspense>
        </IconButton>
    );
};

export default WishlistShare;
