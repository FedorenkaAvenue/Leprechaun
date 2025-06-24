import { FC, Suspense } from 'react';
import dynamic from 'next/dynamic';

import IconButton from '@shared/ui/IconButton';
import { WishlistPublic } from '@gen/wishlist';

const Share = dynamic(() => import('@shared/ui/Share'), { ssr: false });

interface Props {
    wishlistId: WishlistPublic['id']
}

const WishlistShare: FC<Props> = ({ wishlistId }) => {
    return (
        <IconButton>
            <Suspense fallback='...loading'>
                <Share link={`profile/wishlist/share/${wishlistId}`} />
            </Suspense>
        </IconButton>
    );
};

export default WishlistShare;
